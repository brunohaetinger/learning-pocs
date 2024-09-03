import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_community.tools import YouTubeSearchTool
from langchain_community.document_loaders import YoutubeLoader
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder, PromptTemplate
from langchain.prompts.chat import SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain.chains import LLMChain
import ast  # Import the Abstract Syntax Trees library
from langchain_core.messages import HumanMessage
# Load environment variables
load_dotenv()

# Function to search for YouTube videos
def yt_search(query, num_results=3):
    youtube_search_tool = YouTubeSearchTool(num_results=num_results)
    result = youtube_search_tool.run(query)

    # Convert the string representation of the list back to an actual list
    urls = ast.literal_eval(result)
    
    return urls

# Function to get the transcript of a YouTube video
def yt_transcript(video_url):
    loader = YoutubeLoader.from_youtube_url(video_url)
    return loader.load()

# Function to generate a summary using LLM
def generate_summary(transcripts):
    # Combine transcripts into a single string
    # Combine the page_content from each Document in each nested list
    combined_transcripts = ""
    try:
        combined_transcripts = "\n\n".join(doc.page_content for video in transcripts for doc in video)
    except AttributeError as e:
        print(f"Error processing transcripts: {e}")

    # Prompt template for the summary
    prompt = ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate(prompt=PromptTemplate.from_template(
            "You are an assistant that summarizes YouTube video transcripts."
        )),
        HumanMessagePromptTemplate(prompt=PromptTemplate.from_template(
            "Using the following transcripts, generate a summary with the main topics, takeaways, and lessons:\n{transcripts}"
        )),
        MessagesPlaceholder(variable_name="transcripts")
    ])

    # Initialize LLM
    llm = ChatOpenAI(model='gpt-4o-mini', temperature=0)

    # Create LLM Chain
    chain = prompt | llm

    # Create a HumanMessage with combined transcripts
    combined_transcripts_message = HumanMessage(content=combined_transcripts)

    # Pass it to the chain.invoke method
    response = chain.invoke({'transcripts': [combined_transcripts_message]})


    return response

# Main function
def main():
    topic = input("Enter a topic to search for: ")

    # Step 1: Search for top 3 YouTube video links
    video_urls = yt_search(topic)

    # Step 2: Retrieve transcripts for each video
    transcripts = [yt_transcript(url) for url in video_urls]

    # Step 3: Generate a summary using the LLM
    summary = generate_summary(transcripts)

    # Print the summary
    print("\nSummary of the videos:")
    print(summary)
    # Assuming `response` is the object returned by the LLM and it has a `content` attribute
    text_response = summary.content  # Adjust this based on your actual response structure

    # Step 2: Define the path to the Markdown file
    file_path = 'response_output.md'

    # Step 3: Write the content to the Markdown file
    with open(file_path, 'w') as file:
        file.write(text_response)

if __name__ == "__main__":
    main()
