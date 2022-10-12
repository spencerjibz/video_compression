import ffmpeg from "fluent-ffmpeg"
import path from "path"

const isWindows = process.platform.includes("win")
async function Process(filename, dir, size, threadId = "single") {
	console.time(`${threadId}`)
	//process  the compression and size formating;
	if (isWindows) {
		ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe")
	}

	ffmpeg({ source: filename, logger: console })
		.fps(30)

		// h264
		//.videoCodec("libx264")
		//.audioCodec("libmp3lame")
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
