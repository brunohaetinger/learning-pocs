import pandas as pd
import numpy as np
import ast
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# -------------------------------
# Step 1: Load the Datasets
# -------------------------------
# Load movies metadata. Use low_memory=False to avoid dtype warnings.
movies_df = pd.read_csv('data/movies_metadata.csv', low_memory=False)

# Load keywords and credits
keywords_df = pd.read_csv('data/keywords.csv')
credits_df = pd.read_csv('data/credits.csv')

# -------------------------------
# Step 2: Clean the Movies Metadata
# -------------------------------
# The movies_metadata 'id' column contains some non-numeric values.
# Remove rows where 'id' is not numeric and convert the rest to integers.
movies_df = movies_df[movies_df['id'].apply(lambda x: str(x).isdigit())]
movies_df['id'] = movies_df['id'].astype(int)

# Optionally, you can drop rows with missing overviews:
movies_df['overview'] = movies_df['overview'].fillna('')

# -------------------------------
# Step 3: Merge Datasets
# -------------------------------
# Merge movies_df with keywords_df and credits_df on the 'id' column.
movies_df = movies_df.merge(keywords_df, on='id', how='left')
movies_df = movies_df.merge(credits_df, on='id', how='left')

# -------------------------------
# Step 4: Convert Stringified Lists to Python Lists
# -------------------------------
def parse_features(x):
    """
    Convert a stringified list of dictionaries into a list of names.
    """
    try:
        lst = ast.literal_eval(x)
    except (ValueError, SyntaxError):
        return []
    return [item['name'] for item in lst]

# Convert genres and keywords columns
movies_df['genres'] = movies_df['genres'].apply(parse_features)
movies_df['keywords'] = movies_df['keywords'].apply(parse_features)

# -------------------------------
# Step 5: Process the Cast and Crew
# -------------------------------
def parse_cast(x):
    """
    Extract the first three cast members (if available).
    """
    try:
        lst = ast.literal_eval(x)
    except (ValueError, SyntaxError):
        return []
    # Return the names of the top 3 cast members
    return [item['name'] for item in lst][:3]

def get_director(x):
    """
    Extract the director's name from the crew list.
    """
    try:
        lst = ast.literal_eval(x)
    except (ValueError, SyntaxError):
        return ""
    for item in lst:
        if item.get('job') == 'Director':
            return item.get('name', "")
    return ""

# Process cast and crew columns
movies_df['cast'] = movies_df['cast'].apply(parse_cast)
movies_df['director'] = movies_df['crew'].apply(get_director)

# -------------------------------
# Step 6: Clean the Data
# -------------------------------
def clean_data(x):
    """
    Lowercase and remove spaces from strings (or elements of lists).
    """
    if isinstance(x, list):
        return [str.lower(i.replace(" ", "")) for i in x]
    elif isinstance(x, str):
        return str.lower(x.replace(" ", ""))
    else:
        return ""

movies_df['genres'] = movies_df['genres'].apply(clean_data)
movies_df['keywords'] = movies_df['keywords'].apply(clean_data)
movies_df['cast'] = movies_df['cast'].apply(clean_data)
movies_df['director'] = movies_df['director'].apply(clean_data)

# -------------------------------
# Step 7: Create a 'Soup' of Features
# -------------------------------
# The "soup" is a string that contains all relevant features which we later vectorize.
def create_soup(x):
    return ' '.join(x['keywords']) + ' ' + ' '.join(x['genres']) + ' ' + ' '.join(x['cast']) + ' ' + x['director'] + ' ' + x['overview']

movies_df['soup'] = movies_df.apply(create_soup, axis=1)

# -------------------------------
# Step 8: Create the Count Matrix and Compute Cosine Similarity
# -------------------------------
# Vectorize the text in the 'soup' column.
count = CountVectorizer(stop_words='english')
count_matrix = count.fit_transform(movies_df['soup'])

# Compute the cosine similarity matrix
cosine_sim = cosine_similarity(count_matrix, count_matrix)

# -------------------------------
# Step 9: Build a Reverse Mapping from Movie Titles to DataFrame Indices
# -------------------------------
# Reset the index so that it aligns with our similarity matrix.
movies_df = movies_df.reset_index(drop=True)
indices = pd.Series(movies_df.index, index=movies_df['title']).drop_duplicates()

# -------------------------------
# Step 10: Create the Recommendation Function
# -------------------------------
def get_recommendations(title, cosine_sim=cosine_sim):
    """
    Given a movie title, return the top 10 most similar movies.
    """
    if title not in indices:
        return f"Movie '{title}' not found in the dataset."

    idx = indices[title]
    
    # Get the pairwise similarity scores for this movie
    sim_scores = list(enumerate(cosine_sim[idx]))
    
    # Sort movies based on similarity score (descending order)
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Skip the first movie as it is the movie itself, then take the next 10.
    sim_scores = sim_scores[1:11]
    
    # Get the movie indices
    movie_indices = [i[0] for i in sim_scores]
    
    # Return the top 10 most similar movies
    return movies_df['title'].iloc[movie_indices]

# -------------------------------
# Step 11: Test the Recommendation System
# -------------------------------
# Replace "The Godfather" with any movie title from the dataset.
movie_to_search = "The Godfather"
recommendations = get_recommendations(movie_to_search)

print(f"Recommendations for '{movie_to_search}':")
print(recommendations.to_list())
