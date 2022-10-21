import { Worker, isMainThread } from "node:worker_threads";
import path, { dirname } from "node:path";
import compressFile from "./processfile.js";
async function ProcessFile(filename, dir, sizes, multithreaded = true) {
  if (multithreaded) {
    console.log("------------Multi-threaded Process --------------------");
    /* MULTITHREADED WORK -> n threads for n sizes*/
    let files = await Promise.all(
      sizes.map((size) => runinParallel(filename, dir, size))
    );
    return files;
  } else {
    /*SINGLE THREADED-> n task size for n sizes*/
    console.log("-------------SINGLE THREADED--------------");
    //
    //console.time("singlethreaded")
    let result = await Promise.all(
      sizes.map((size) => compressFile(filename, dir, size, ("task" + size),true))
    );
    return result   
  }
}

function runinParallel(filename, dir, size) {
  return new Promise(function (resolve, reject) {
    const worker = new Worker("./worker.js", {
      workerData: {
        filename,
        dir: path.join("./" + dir),
        size: size,
      },
    });
    // handle messages from worker_threads

    worker.on("message", (msg) => {
      resolve(msg);
    });
    worker.on("error", (err) => {
      reject(err);
    });
  });
}
export default ProcessFile;


ProcessFile('sampleFHD.mp4',"compressed",[1080,720,480])
