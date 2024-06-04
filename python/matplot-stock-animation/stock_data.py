import yfinance as yf
import pandas as pd


def stock_to_csv(ticker, start_year, end_year):
    # Download historical stock price data
    df = yf.download(ticker, start=f'{start_year}-01-01', end=f'{end_year}-12-31')

    # Keep only the 'Close' column
    df = df[['Close']]

    # Save the data to a CSV file
    df.to_csv(f'{ticker}_stock_prices_{start_year}_{end_year}.csv')