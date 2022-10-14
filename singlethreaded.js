import compressFile from "./processfile.js"
let sizes = [1080,720, 480]
let file = process.argv[2] // process arguments
//
//console.time("singlethreaded")
for (let size of sizes) {
	await compressFile(file, "compressed", size, "task" + size)
}
//console.timeEnd("singlethreaded")
