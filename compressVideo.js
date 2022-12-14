import { Worker, isMainThread } from "node:worker_threads"
import path, { dirname } from "node:path"
import compressFile from "./processfile.js"
let file = process.argv[2]
async function ProcessFile(filename, dir, sizes, multithreaded = true,hwaccel = false) {
	if (multithreaded) {
		console.log("------------Multi-threaded Process --------------------")
		/* MULTITHREADED WORK -> n threads for n sizes*/
		let files = await Promise.all(
			sizes.map((size) => runinParallel(filename, dir, size,hwaccel))
		)
		return files
	} else {
		/*SINGLE THREADED-> n task size for n sizes*/
		console.log("-------------SINGLE THREADED--------------")
		//
		//console.time("singlethreaded")
		let result = await Promise.all(
			sizes.map((size) =>
				compressFile(filename, dir, size, "task" + size,true)
			)
		);
        return result;
	}
}

function runinParallel(filename, dir, size,hwaccel) {
	return new Promise(function (resolve, reject) {
		const worker = new Worker("./worker.js", {
			workerData: {
				filename,
				dir: path.join("./" + dir),
				size,
                hwaccel
			},
		})
		// handle messages from worker_threads

		worker.on("message", (msg) => {
			resolve(msg)
		})
		worker.on("error", (err) => {
			reject(err)
		})
	})
}
export default ProcessFile


let errors =[];
let result;
 try {

  result = await ProcessFile(file,"compressed",[1080,720,480],true,true)
 }
 catch(err) {
	errors.push(err)
 }

 finally {
 console.log(errors,result)

 }
