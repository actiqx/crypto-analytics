import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Build the connection URL
# Default is the local postgres user if nothing is set
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:postgres@localhost:5432/analytics"
)

# If you want to fall back to SQLite if Postgres is not available,
# you could add a logic here, but for now we are switching to Postgres fully.
SQLALCHEMY_DATABASE_URL = DATABASE_URL

# PostgreSQL doesn't need the check_same_thread common in SQLite
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
