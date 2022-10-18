### Video compression nodejs
Simple tutorial  of video compression with [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg).

### Requirments
- Nodejs versions with worker_threads & esmodule support
- ffmpeg ;
- ***Optional:*** Hardware acceleration requirements (Nvidia GPU with nvenc support Or  Apple Silicon devices)

### Features
- h264 compression with a crf of 28,
- Both single thread(singlethreaded.js) and multi-thread workloads(index.js&)
- Resizing to any resolution (when provided  an array of resolutions)
- Conversion to mp4
- Hardware accelerated video compression with cuda support(using h264_nevc) && videotool box for Mac

### usage
 **Note:**
 - Before testing, create a folder named compressed in the root directory.
 - For GPU acceleration, follow  the instructions [here](https://docs.nvidia.com/video-technologies/video-codec-sdk/ffmpeg-with-nvidia-gpu/) to add hardware acceleration support to ffmpeg. (Nividia only).
<Br>


1. single threaded <Br>
```bash
 node singlethreaded.js [InputFilenamewithExt]

 ```
 2. Multithreaded workload. <Br>


```bash
 node  index.js [InputFilenamewithExt]

```

3. Clean up the example out files
```sh
  ./cleanup.sh 
```
4. Compare  video file sizes of original and compressed;
```bash
 ./checkVideoSize.sh
```


#### End
thanks
