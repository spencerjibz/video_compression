import { Worker, isMainThread } from "node:worker_threads"
import path, { dirname } from "node:path" 
import compressFile from "./processfile.js"
 async function Process(filename:string,dir:string,sizes:Array<number>,multithreaded:boolean) {
 if (multithreaded) {
    /* MULTITHREADED WORK -> n threads for n sizes*/
for (let i = 0; i < sizes.length; i++) {
	const worker = new Worker("./worker.js", {
		workerData: {    
			filename,
			dir: path.join("./"+dir),
			size: sizes[i],
		},
	})
	// handle messages from worker_threads

	worker.on("message", (msg) => {
		 console.log(msg)
	})
	worker.on("error", (err) => {
		throw err
	})
}


 }
  else { 
     /*SINGLE THREADED-> n task size for n sizes*/

//
//console.time("singlethreaded")
for (let size of sizes) {
	await compressFile(filename, dir, size, "task" + size)
}
  }
}