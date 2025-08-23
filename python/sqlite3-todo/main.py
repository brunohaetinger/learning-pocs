import sqlite3

con = sqlite3.connect("to-do.db")
cur = con.cursor()

cur.execute("CREATE TABLE todo(title, complete, created_at)")

res = cur.execute("SELECT name from sqlite_master ")
res.fetchone()

