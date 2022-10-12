import compressFile from "./processfile.js"
let sizes = [720, 480]

//
//console.time("singlethreaded")
for (let size of sizes) {
	await compressFile("./sample4k.mp4", "compressed", size, "task" + size)
}
//console.timeEnd("singlethreaded")
