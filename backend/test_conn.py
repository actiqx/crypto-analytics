import os
from sqlalchemy import create_engine
from dotenv import load_dotenv
import sqlalchemy

load_dotenv()

db_url = os.getenv("DATABASE_URL")
print(f"Testing connection to: {db_url.split('@')[-1]}")

try:
    engine = create_engine(db_url)
    with engine.connect() as conn:
        print("Successfully connected to the database!")
        # Try to check if we can see tables
        result = conn.execute(sqlalchemy.text("SELECT 1"))
        print(f"Query test (SELECT 1): {result.fetchone()}")
except Exception as e:
    print(f"Connection failed: {e}")
