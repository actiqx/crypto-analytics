from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from database import get_db
from schemas import asset as asset_schema
from services import asset_service
from typing import List

router = APIRouter(prefix="/api/assets", tags=["Assets"])

@router.post("/sync")
def sync_data(background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Trigger a background sync with CoinCap."""
    background_tasks.add_task(asset_service.fetch_and_store_assets, db)
    return {"message": "Sync started"}

@router.get("", response_model=List[asset_schema.Asset])
def get_assets(limit: int = 50, db: Session = Depends(get_db)):
    """Get current top assets from local DB."""
    return asset_service.get_assets(db, limit)

@router.delete("/{asset_id}")
def delete_asset(asset_id: str, db: Session = Depends(get_db)):
    success = asset_service.delete_asset(db, asset_id)
    if not success:
        raise HTTPException(status_code=404, detail="Asset not found")
    return {"message": "Asset deleted"}

@router.get("/{asset_id}/history")
def get_asset_history(asset_id: str, interval: str = "h1"):
    """Fetch history directly from CoinCap for charting purposes."""
    return asset_service.get_asset_history(asset_id, interval)
