import { afterEach, expect, spyOn, test } from "bun:test"
import * as fs from "fs"
import { mkdirSync, mkdtempSync, rmSync } from "fs"
import { tmpdir } from "os"
import path from "path"
import { Flock } from "@opencode/util/flock"
import { createStorage } from "../../src/context/storage"

afterEach(() => {
  spyOn(fs, "watch").mockRestore()
})

test("createStorage degrades gracefully when fs.watch throws (e.g. ENOSPC)", async () => {
  const dir = mkdtempSync(path.join(tmpdir(), "storage-test-"))
  // fs.watch throws synchronously when inotify_add_watch fails (e.g. the watch
  // limit is exhausted). Simulate that scoped to this test only.
  spyOn(fs, "watch").mockImplementation(() => {
    throw Object.assign(new Error("ENOSPC: no space left on device, watch '/some/dir'"), { code: "ENOSPC" })
  })

  try {
    let result: ReturnType<typeof createStorage> | undefined
    expect(() => {
      result = createStorage(dir, "next")
    }).not.toThrow()

    // storage should still be usable even though the live-reload watcher failed to attach
    const [store, update] = result!.storage.store("kv", { initial: { count: 0 } })
    expect(store.count).toBe(0)
    await update((draft) => {
      draft.count = 1
    })
    expect(store.count).toBe(1)
    expect(() => result!.close()).not.toThrow()
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test("storage.flush waits for writes that are waiting for their lock", async () => {
  const dir = mkdtempSync(path.join(tmpdir(), "storage-test-"))
  const result = createStorage(dir, "next")
  const file = path.join(dir, "next", "tui", "kv.json")
  let releaseLock = async () => {}
  let updatePromise: Promise<void> | undefined
  let flushPromise: Promise<void> | undefined

  try {
    const lock = await Flock.acquire(file, { dir: path.join(dir, "next", "locks") })
    let held = true
    releaseLock = async () => {
      if (!held) return
      held = false
      await lock.release()
    }

    const [store, update] = result.storage.store("kv", { initial: { count: 0 } })
    updatePromise = update((draft) => {
      draft.count = 1
    })

    let flushed = false
    flushPromise = result.storage.flush().then(() => {
      flushed = true
    })
    await Bun.sleep(20)
    expect(flushed).toBe(false)

    await releaseLock()
    await Promise.all([updatePromise, flushPromise])
    expect(store.count).toBe(1)
    expect(flushed).toBe(true)
  } finally {
    try {
      await releaseLock()
    } finally {
      result.close()
      await updatePromise?.catch(() => undefined)
      await flushPromise?.catch(() => undefined)
      rmSync(dir, { recursive: true, force: true })
    }
  }
})

test("storage.flush reports failures from pending writes", async () => {
  const dir = mkdtempSync(path.join(tmpdir(), "storage-test-"))
  const result = createStorage(dir, "next")
  const file = path.join(dir, "next", "tui", "kv.json")
  mkdirSync(file, { recursive: true })

  try {
    const [, update] = result.storage.store("kv", { initial: { count: 0 } })
    const write = update((draft) => {
      draft.count = 1
    })
    const flush = result.storage.flush()

    await expect(write).rejects.toBeInstanceOf(Error)
    await expect(flush).rejects.toBeInstanceOf(Error)
  } finally {
    result.close()
    rmSync(dir, { recursive: true, force: true })
  }
})
