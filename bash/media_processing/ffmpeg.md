# ffmpeg

Suite of libraries for handling video, audio and other multimedia files.


- Get an image from a frame of `features.mp4` video
> ffmpeg -ss 00:00:10 -i features.mp4 -frames:v 1 output.png 


- Crop video in half of it's width
> ffmpeg -i features.mp4 -vf "crop=in_w/2:in_h:0:0" output.mp4 
