import sqlite3
from datetime import datetime

class ToDoManager():

    def __init__(self):
        print("Starting ToDoManager...")

    def __enter__(self):
        self.con = sqlite3.connect("to-do.db")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.con.commit();
        self.con.close()

    def createTable(self):
        cur = self.con.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS todo(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT, 
                completed BOOLEAN, 
                created_at TEXT
            )
        """
        )


    def createNewItem(self, title):
        cur = self.con.cursor()
        now = datetime.now()
        res = cur.execute("INSERT INTO todo (title, completed, created_at) values(?, False, ?);", (title, now.strftime("%Y-%m-%d %H:%M:%S")))
        self.con.commit()
        print(f"{res.fetchone()}")
    
    def printAll(self):
        cur = self.con.cursor()
        res = cur.execute("SELECT * from todo;")
        print(f"{res.fetchall()}")


# ---

with ToDoManager() as todoManager:
    todoManager.printAll()
    todoManager.createNewItem("Do Groceries")
    todoManager.printAll()


