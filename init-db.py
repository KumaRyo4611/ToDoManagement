import sqlite3
conn = sqlite3.connect('testDB.sqlite3')
c = conn.cursor()
# c.execute("create table tasks(id integer, task text, limitdate text, detail text, category text, remarks text, finished integer)")
# c.execute("insert into tasks values (?, ?, ?, ?, ?, ?, ?)", (1, 'タスクA', '2019-08-31', 'タスクAを完了させる', '仕事', 'もうすぐ完了', 0))
c.execute("SELECT * FROM tasks")
print(c.fetchall())