### Video compression nodejs
Simple tutorial  of video compression with [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg).

### Requirments
- Nodejs versions with worker_threads & esmodule support
- ffmpeg ;

### Features
- h264 compression with a crf of 28,
- Both single thread(singlethreaded.js) and multi-thread workloads(index.js&)
- Resizing to any resolution (provides an array of resolutions)
- Conversion to mp4

### In the works
- Hardware acceleration (GPU)

### usage
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


