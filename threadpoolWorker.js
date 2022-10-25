// this is used by the piscina module

import CompressFile from "./processfile.js"
export default async function Compress({ filename, dir, size,hwaccel}) {
  let result = await CompressFile(filename, dir, size, "thread:" + size,hwaccel);
  //parentPort.postMessage({ result });
  return result;
}