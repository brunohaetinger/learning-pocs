
from langchain_community.document_loaders import YoutubeLoader

yt_url = "https://www.youtube.com/watch?v=p2GlRToY5HI&pp=ygUUZGlzdHJpYnV0ZWQgbW9ub2xpdGg%3D" 
loader = YoutubeLoader.from_youtube_url(
    yt_url, add_video_info=False
)

print(loader.load())
