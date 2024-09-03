from langchain_community.tools import YouTubeSearchTool

# Initialize the YouTube search tool
youtube_search_tool = YouTubeSearchTool(num_results=3)

# Define your search query
query = "distributed monolith"

# Call the tool with the query to retrieve top YouTube results
results = youtube_search_tool.run(query)

# Print the results
print("Top YouTube Results:")
print(results)
