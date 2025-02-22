import pandas as pd
import numpy as np
import ast
import os
import gc
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import psutil

def load_data():
    parsed_file = "data/movies_parsed.csv"
    if os.path.exists(parsed_file):
        return pd.read_csv(parsed_file)
    else:
        movies_df = pd.read_csv('data/movies_metadata.csv', low_memory=False)
        keywords_df = pd.read_csv('data/keywords.csv')
        credits_df = pd.read_csv('data/credits.csv')
        parsed_df = clean_and_parse(movies_df, keywords_df, credits_df)
        parsed_df.to_csv(parsed_file, index=False)
        return parsed_df

def clean_and_parse(movies_df: pd.DataFrame, keywords_df: pd.DataFrame, credits_df: pd.DataFrame):
    movies_df = movies_df[movies_df['id'].apply(lambda x: str(x).isdigit())]
    movies_df['id'] = movies_df['id'].astype(int)
    movies_df.loc[:, 'overview'] = movies_df['overview'].fillna('')

    movies_df = movies_df.merge(keywords_df, on='id', how='left')
    movies_df = movies_df.merge(credits_df, on='id', how='left')

    movies_df.loc[:, 'genres'] = movies_df['genres'].apply(parse_features)
    movies_df.loc[:, 'keywords'] = movies_df['keywords'].apply(parse_features)
    movies_df.loc[:, 'cast'] = movies_df['cast'].apply(parse_cast)
    movies_df.loc[:, 'director'] = movies_df['crew'].apply(get_director)

    movies_df.loc[:, 'genres'] = movies_df['genres'].apply(clean_data)
    movies_df.loc[:, 'keywords'] = movies_df['keywords'].apply(clean_data)
    movies_df.loc[:, 'cast'] = movies_df['cast'].apply(clean_data)
    movies_df.loc[:, 'director'] = movies_df['director'].apply(clean_data)

    movies_df['soup'] = movies_df.apply(create_soup, axis=1)
    movies_df['soup'] = movies_df['soup'].fillna('')

    del keywords_df
    del credits_df
    gc.collect()

    return movies_df

def parse_features(x):
    try:
        lst = ast.literal_eval(x)
    except (ValueError, SyntaxError):
        return []
    return [item['name'] for item in lst]

def parse_cast(x):
    try:
        lst = ast.literal_eval(x)
    except (ValueError, SyntaxError):
        return []
    return [item['name'] for item in lst][:3]

def get_director(x):
    try:
        lst = ast.literal_eval(x)
    except (ValueError, SyntaxError):
        return ""
    for item in lst:
        if item.get('job') == 'Director':
            return item.get('name', "")
    return ""

def clean_data(x):
    if isinstance(x, list):
        return [str.lower(i.replace(" ", "")) for i in x]
    elif isinstance(x, str):
        return str.lower(x.replace(" ", ""))
    else:
        return ""

def create_soup(x):
    keywords = ' '.join(x['keywords'])
    genres = ' '.join(x['genres'])
    cast = ' '.join(x['cast'])
    director = x['director']
    overview = x['overview']
    return f"{keywords} {genres} {cast} {director} {overview}".strip()

def get_recommendations(title, cosine_sim):
    if title not in indices:
        return f"Movie '{title}' not found in the dataset."
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    movie_indices = [i[0] for i in sim_scores]
    return movies_df['title'].iloc[movie_indices]

# Main execution
if __name__ == "__main__":
    print(f"Available RAM before: {psutil.virtual_memory().available / (1024 ** 3):.2f} GB")
    movies_df = load_data()
    print("Count: " + str(movies_df.shape[0]))
    movies_df['soup'] = movies_df['soup'].fillna('')
    print("Count: " + str(movies_df.shape[0]))
    print(f"Available RAM after: {psutil.virtual_memory().available / (1024 ** 3):.2f} GB")

    # Limit movies number to avoid crashes
    # movies_df = movies_df[:500]
    # print(movies_df.memory_usage(deep=True))

    count = CountVectorizer(stop_words='english', max_features=500)
    count_matrix = count.fit_transform(movies_df['soup'])

    print(f"Shape: {count_matrix.shape}")  # (rows, vocab_size)
    print(f"Memory usage: {count_matrix.data.nbytes / (1024**2):.2f} MB")

    # Work in batches?
    use_batches = True
    if use_batches:
        # Define batch size (e.g., process 1000 rows at a time)
        batch_size = 1000
        num_rows = count_matrix.shape[0]
        cosine_sim = np.zeros((num_rows, num_rows), dtype=np.float16)  # Pre-allocate matrix

        # Compute cosine similarity in batches
        for start in range(0, num_rows, batch_size):
            end = min(start + batch_size, num_rows)
            cosine_sim[start:end, :] = cosine_similarity(count_matrix[start:end], count_matrix)

        print("Cosine similarity computation completed in batches!")
    else:
        cosine_sim = cosine_similarity(count_matrix, count_matrix)

    movies_df = movies_df.reset_index(drop=True)
    indices = pd.Series(movies_df.index, index=movies_df['title']).drop_duplicates()

    movie_to_search = "Toy Story"
    recommendations = get_recommendations(movie_to_search, cosine_sim)

    print(f"Recommendations for '{movie_to_search}':")
    print(recommendations)
