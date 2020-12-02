import responder
import sqlite3
import json

import initdb

api = responder.API()

@api.route("/getAll")
def get_all(req, resp):
    conn = sqlite3.connect('/testDB.sqlite3')
    c = conn.cursor()
    c.execute("SELECT * FROM tasks")
    data = c.fetchall()
    conn.commit()
    conn.close()
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.media = data
    print(data)

@api.route("/addData")
def add_data(req, resp):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    conn = sqlite3.connect('/testDB.sqlite3')
    c = conn.cursor()
    c.execute("insert into tasks values (?, ?, ?, ?, ?, ?, ?)", (2, 'タスクB', '2019-09-04', 'タスクBを完了させる', 'プライベート', '', 0))
    conn.commit()
    conn.close()

@api.route("/deleteData/{id}")
def delete_data(req, resp, *, id):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    conn = sqlite3.connect('/testDB.sqlite3')
    c = conn.cursor()
    c.execute('DELETE FROM tasks WHERE id = ?', id)
    conn.commit()
    conn.close()

if __name__ == '__main__':
    initdb.init()
    api.run(address="0.0.0.0")