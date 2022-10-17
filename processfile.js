import ffmpeg from "fluent-ffmpeg"
import path from "path"

const isWindows = process.platform.includes("win")
async function Process(filename, dir, size, threadId = "single",hardwareAccel=false) {
	console.time(`${threadId}`)
	let [name, ext] = filename?.split(".")
	//process  the compression and size formating;
	if (isWindows) {
		ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe")
	}
	 //console.log('file',filename)
	 /*  HARWARE ACCELERATION
	 * using cuda
	 * recompile ffmpeg with hardwareAccel support (https://docs.nvidia.com/video-technologies/video-codec-sdk/ffmpeg-with-nvidia-gpu/)
	 */
 if (hardwareAccel) {
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

		.save(`./${dir}/${name}${size}P.${ext}`)
	}
	else { 
		 ffmpeg({ source: filename, logger: console })
		.fps(30)

		// h264
		.videoCodec("libx264")
		.audioCodec("libmp3lame")
		.addOptions(["-crf 28"])
		.size(`?x${size}`) //, HD, FHD, SD dimensions
		.on("end", (result) => {
			console.log(result)
			console.timeEnd(`${threadId}`)
		})
		.on("error", (err) => {
			console.log(err)
		})

		.save(`./${dir}/${name}${size}P.${ext}`)

		//console.log(file)
	}
	//*/
}

export default Process
// sudo  ffmpeg -y -vsync 0 -hwaccel cuda -hwaccel_output_format cuda -i ../video/sampleFHD.mp4 -vf scale_npp=1280:720   output.mp4