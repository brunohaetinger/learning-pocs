from dotenv import load_dotenv
from fastapi import FastAPI
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langserve import add_routes
import os

load_dotenv()

# Ensure the OpenAI API key is set
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY is not set in the environment variables")

model = ChatOpenAI(model="gpt-4")
parser = StrOutputParser()

language = "portuguese"
text = "hello, world!"

system_template = "Translate the following into {language}:"
prompt_template = ChatPromptTemplate.from_messages([
    ("system", system_template),("user", "{text}")
])

chain = prompt_template | model | parser

print(chain.invoke({"text": "hi, my friend", "language": language}))
# app = FastAPI(
#   title="LangChain Server",
#   version="1.0",
#   description="A simple API server using LangChain's Runnable interfaces",
# )

# add_routes(
#     app,
#     chain,
#     path="/chain",
# )

# if __name__ == "__main__":
#     import uvicorn

#     uvicorn.run(app, host="localhost", port=8000)