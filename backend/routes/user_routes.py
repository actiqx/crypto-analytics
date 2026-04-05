from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from schemas import user as user_schema
from services import user_service
from typing import List

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.get("", response_model=List[user_schema.User])
def get_users(db: Session = Depends(get_db)):
    return user_service.get_users(db)

@router.post("", response_model=user_schema.User, status_code=status.HTTP_201_CREATED)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    db_user = user_service.create_user(db, user)
    if not db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return db_user

@router.patch("/{user_id}", response_model=user_schema.User)
def update_user(user_id: int, user_update: user_schema.UserUpdate, db: Session = Depends(get_db)):
    db_user = user_service.update_user(db, user_id, user_update)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    success = user_service.delete_user(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}
