from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_community.tools import YouTubeSearchTool
from langchain_community.tools.google_trends import GoogleTrendsQueryRun
from langchain_community.utilities.google_trends import GoogleTrendsAPIWrapper


load_dotenv()

# Tools
youtube_tool = YouTubeSearchTool()
# google_trends = GoogleTrendsQueryRun(api_wrapper=GoogleTrendsAPIWrapper)
print(youtube_tool.run("distributed monolith"))
# Prompt

# LLM
# llm = ChatOpenAI(model='gpt-4o-mini', temperature=0)

# Merge Tools + Prompt + LLM -> Agent

# Executor