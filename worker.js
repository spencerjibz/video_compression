// this is the worker thread for
import { workerData, threadId, parentPort } from "node:worker_threads";
import CompressFile from "./processfile.js";

let { filename, dir, size ,hwaccel} = workerData;

//await CompressFile(filename, dir, size, threadId)

export default async function Compress({ filename, dir, size,hwaccel}) {
  let result = await CompressFile(filename, dir, size, "thread:" + threadId,hwaccel);
  parentPort.postMessage({ result });
}

Compress({ filename, dir, size ,hwaccel});
