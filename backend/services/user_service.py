from sqlalchemy.orm import Session
from sqlalchemy.sql import func
import models
from schemas import user as user_schema
from typing import List, Optional

def get_users(db: Session):
    users = db.query(models.User).order_by(models.User.created_at.desc()).all()
    # Add initial dummy user if empty for robust first-run experience
    if not users:
        new_user = models.User(email="admin@example.com", full_name="System Admin", role="admin")
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        users = [new_user]
    return users

def create_user(db: Session, user: user_schema.UserCreate):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        return None  # Indicates email already registered
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def update_user(db: Session, user_id: int, user_update: user_schema.UserUpdate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        return None
    
    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False
