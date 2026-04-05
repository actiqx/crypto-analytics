from pydantic import BaseModel
from typing import Optional

class AssetBase(BaseModel):
    id: str
    rank: int
    symbol: str
    name: str
    supply: Optional[float] = None
    maxSupply: Optional[float] = None
    marketCapUsd: Optional[float] = None
    volumeUsd24Hr: Optional[float] = None
    priceUsd: Optional[float] = None
    changePercent24Hr: Optional[float] = None
    vwap24Hr: Optional[float] = None

class AssetCreate(AssetBase):
    pass

class Asset(AssetBase):
    class Config:
        from_attributes = True
