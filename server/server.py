from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from data_models import User

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/create-user")
def create_user(emp_code:str, password: str, name: str, department: str, designation: str, db: Session = Depends(get_db)):
    user = User(
        name=name,
        department=department,
        designation=designation
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@app.get("/api/get-room-details")
async def get_room_details(room_id: int, date: str, db: Session = Depends(get_db)):
    
