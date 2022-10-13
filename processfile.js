import ffmpeg from "fluent-ffmpeg"
import path from "path"

const isWindows = process.platform.includes("win")
async function Process(filename, dir, size, threadId = "single") {
	console.time(`${threadId}`)
	//process  the compression and size formating;
	if (isWindows) {
		ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe")
	}
	 //console.log('file',filename)

	ffmpeg({ source: filename, })
		.addInputOptions(["-hwaccel cuda","-r 30"])

		//h264
		.withVideoCodec("h264_nvenc")
	
	
		.addOptions(["-crf 28"])

		.size(`?x${size}`) //, HD, FHD, SD dimensions
		.on("end", () => {
			console.timeEnd(`${threadId}`)
		})
		.on("error", (err) => {
			console.log(err)
		})

		.save(`./${dir}/${Date.now()}_${size}P_${path.join(filename)}`)

	//*/
}

export default Process
// sudo  ffmpeg -y -vsync 0 -hwaccel cuda -hwaccel_output_format cuda -i ../video/sampleFHD.mp4 -vf scale_npp=1280:720   output.mp4