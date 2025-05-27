from langchain_openai import ChatOpenAI
from browser_use import Agent
import asyncio
from dotenv import load_dotenv
load_dotenv()

async def main():
    agent = Agent(
        task="on the webiste statusinvest.com.br, search for the stock itsa4 and make a report showing the pros and cons from the company indicators, balance sheets, profits, etc.",
        llm=ChatOpenAI(model="gpt-4o-mini"),
    )
    await agent.run()

asyncio.run(main())