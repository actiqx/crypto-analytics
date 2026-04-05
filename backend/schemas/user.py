from pydantic import BaseModel, EmailStr
from typing import Optional
import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "viewer"

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    role: Optional[str] = None

class User(UserBase):
    id: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True
