// this is the worker thread for
import { workerData, threadId } from "node:worker_threads"
import CompressFile from "./processfile.js"

let { filename, dir, size } = workerData

await CompressFile(filename, dir, size, threadId)
