#!/usr/bin/env bun

import { spawnSync } from "node:child_process"
import path from "node:path"

const dir = path.resolve(import.meta.dirname, "..")
const result = spawnSync(process.execPath, ["run", "script/build.ts", ...process.argv.slice(2)], {
  cwd: dir,
  env: {
    ...process.env,
    FORGECODE_BINARY_NAME: "forgecode",
    FORGECODE_PACKAGE_SCOPE: "@forgecode",
    FORGECODE_REPOSITORY: "cellxgod/ForgeCode",
  },
  stdio: "inherit",
})

if (result.error) throw result.error
process.exit(result.status ?? 1)
