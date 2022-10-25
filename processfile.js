import ffmpeg from "fluent-ffmpeg"
import path from "path"
import os from "os"
import ffmpegPath from "@ffmpeg-installer/ffmpeg"
const isWindows = os.platform() === "win32"
const isMac = os.platform().includes("darwin")
//console.log(os.platform(), isMac)
function Process(
	filename,
	dir,
	size,
	threadId = "single",
	hardwareAccel = false
) {
	console.time(`${threadId}`)

	let [name, ext] = filename?.split(".")

	let finalname = `${name}${size}P.${ext}`
	//process  the compression and size formating;
	// set path with @ffmpeg-installer/ffmpeg;
	 ffmpeg.setFfmpegPath(ffmpegPath.path)
	if (isWindows) {
		//console.log('GOT HERE',isWindows)
		//ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe")
	}
	//console.log('file',filename)
	/*  HARWARE ACCELERATION
	 * using cuda
	 * recompile ffmpeg with hardwareAccel support (https://docs.nvidia.com/video-technologies/video-codec-sdk/ffmpeg-with-nvidia-gpu/)
	 */

	if (hardwareAccel) {
		// add option for maco support with h264_videotoolbox
		console.log('---------------hardware acceleration enabled --------')

		return isMac
			? new Promise((resolve, reject) => {
					ffmpeg({ source: filename })
						//.addInputOptions(["-hwaccel cuda", "-r 30"])

						//h264
						.withVideoCodec("h264_videotoolbox")

						//.addOptions(["-crf 28"])

						.size(`?x${size}`) //, HD, FHD, SD dimensions
						/*.on("progress", (progress) =>
							console.log(progress.percent)
						)
						*/
						.on("end", () => {
							console.timeEnd(`${threadId}`)
							resolve(finalname)
						})
						.on("error", (err) => {
							reject(err)
						})

						.save(`./${dir}/${name}${size}P.${ext}`)
			  })
			: new Promise((resolve, reject) => {
					ffmpeg({ source: filename })
						.addInputOptions(["-hwaccel cuda", "-r 30"])

						//h264
						.withVideoCodec("h264_nvenc")

						.addOptions(["-crf 28"])

						.size(`?x${size}`) //, HD, FHD, SD dimensions
						//.on("progress", (progress) => console.log(progress.percent))
						.on("end", () => {
							console.timeEnd(`${threadId}`)
							resolve(finalname)
						})
						.on("error", (err) => {
							reject(err)
						})

						.save(`./${dir}/${name}${size}P.${ext}`)
			  })
	} else {
		return new Promise((resolve, reject) => {
			ffmpeg({ source: filename })
				.fps(30)

				// h264
				.videoCodec("libx264")
				.audioCodec("libmp3lame")
				.addOptions(["-crf 28"])
				.size(`?x${size}`) //, HD, FHD, SD dimensions
				//.on("progress", (progress) => console.log(progress.percent))
				.on("end", () => {
					console.timeEnd(`${threadId}`)
					resolve(finalname)
				})
				.on("error", (err) => {
					reject(err)
				})

				.save(`./${dir}/${name}${size}P.${ext}`)
		})
		//console.log(file)
	}
	//*/
}

export default Process
// sudo  ffmpeg -y -vsync 0 -hwaccel cuda -hwaccel_output_format cuda -i ../video/sampleFHD.mp4 -vf scale_npp=1280:720   output.mp4
/*
.fps(30)

		// h264
		.videoCodec("libx264")
		.audioCodec("libmp3lame")
		.addOptions(["-crf 28"])
*/
