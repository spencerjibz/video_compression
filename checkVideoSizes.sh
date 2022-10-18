 #/bash
 echo parentdir &&  ls -lah *.mp4 
 echo ----------------------------------------------------------------
 echo compressed files
 cd compressed || echo no such folder

 ls  -lah *.mp4 || echo "no videos here" 
 cd ../

