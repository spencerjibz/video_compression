//
import { Worker, isMainThread } from "node:worker_threads";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Piscina from "piscina";
const __filename = fileURLToPath(import.meta.url);

// use the filename pass from arguments
let file = process.argv[2];
// get
// this is the main that can spawn other worker threads;
console.log(file);
// create a threadpool
let pool = new Piscina();
const options = { filename: "./threadpoolWorker.js" };
let sizes = [1080,720,480];

/*
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
	*/
let result = await Promise.allSettled(
  sizes.map((size) =>
    pool.run({ filename: file, size, dir: "compressed" ,hwaccel:true}, options)
  )
);

console.log(result);
