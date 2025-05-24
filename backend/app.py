from Flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# CORS
CORS(app, resources={r"/api/*": {"origins": os.getenv("CORS_ORIGIN", "http://localhost:3000")}})

DATABSE = 'math_tasks.db'

def get_db_connection():
    conn =  sqlite3.connect(DATABSE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    conn.execute("
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        tags TEXT NOT NULL,
        difficult TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )")
    
# З бази буде витягуватися відгуки пацієнтів, задачі,