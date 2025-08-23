import sqlite3

con = sqlite3.connect("to-do.db")
cur = con.cursor()

cur.execute("CREATE TABLE to-do(title, complete, created_at)")
