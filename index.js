//
import { Worker, isMainThread } from "node:worker_threads"
import path, { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)

// use the filename pass from arguments
let file = process.argv[2]
// get
// this is the main that can spawn other worker threads;
 console.log(file)
let sizes = [1080, 720, 480]
for (let i = 0; i < sizes.length; i++) {
	const worker = new Worker("./worker.js", {
		workerData: {    
			filename: file,
			dir: path.join("./compressed"),
			size: sizes[i],
		},
	})
	// handle messages from worker_threads

	worker.on("message", (msg) => {
		str += `,${msg}`
	})
	worker.on("error", (err) => {
		throw err
	})
}

