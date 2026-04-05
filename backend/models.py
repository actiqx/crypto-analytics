from sqlalchemy import Column, String, Float, Integer, DateTime
from sqlalchemy.sql import func
from database import Base

# SQLAlchemy Models
class Asset(Base):
    __tablename__ = "assets"

    id = Column(String, primary_key=True, index=True)
    rank = Column(Integer)
    symbol = Column(String, index=True)
    name = Column(String)
    supply = Column(Float, nullable=True)
    maxSupply = Column(Float, nullable=True)
    marketCapUsd = Column(Float, nullable=True)
    volumeUsd24Hr = Column(Float, nullable=True)
    priceUsd = Column(Float, nullable=True)
    changePercent24Hr = Column(Float, nullable=True)
    vwap24Hr = Column(Float, nullable=True)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    role = Column(String, default="viewer")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
