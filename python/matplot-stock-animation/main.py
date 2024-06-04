from csv_animation import csv_to_animation
from stock_data import stock_to_csv

stock_to_csv("AAPL", 2019, 2021)
csv_to_animation("AAPL_stock_prices_2019_2021.csv")