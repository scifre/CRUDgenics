from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import SessionLocal
from data_models import User
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class LoginRequest(BaseModel):
    emp_id: str
    password: str

class ReserveRoomRequest(BaseModel):
    room_id: int
    emp_id: str
    date: str
    start_time: str
    end_time: str

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

@app.post("/api/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    emp_id = payload.emp_id
    password = payload.password
    print(f"Login attempt for emp_id: {emp_id}")
    sql = text("SELECT * FROM users WHERE emp_id = :emp_id")
    user_query = db.execute(sql, {"emp_id": emp_id})
    user = user_query.fetchone()

    # use the row mapping to access columns safely
    if user and user._mapping.get("password") == password:
        return {"status": "success", "message": "Login successful", "user": dict(user._mapping)}
    else:
        return {"status": "error", "message": "Invalid credentials"}

@app.get("/api/get-room-details")
async def get_room_details(room_id: int, date: str, db: Session = Depends(get_db)):
    print(f"Fetching details for room {room_id} on date {date}")
    sql = text("SELECT * FROM reservations WHERE room_no = :room_no AND reservation_date = :date")
    room_query = db.execute(sql, {"room_no": room_id, "date": date})
    room_details = room_query.fetchall()
    # Row objects expose a ._mapping for a dict-like interface
    details = [dict(row._mapping) for row in room_details]
    return {"room_id": room_id, "date": date, "details": details}

@app.post("/api/reserve-room")
async def reserve_room(request: ReserveRoomRequest, db: Session = Depends(get_db)):
    room_id = request.room_id
    emp_id = request.emp_id
    date = request.date
    start_time = request.start_time
    end_time = request.end_time

    print(f"Reserving room {room_id} for emp_id {emp_id} on {date} from {start_time} to {end_time}")

    sql = text("""
        INSERT INTO reservations (room_no, reserved_by, reservation_date, reserved_from, reserved_to, reserved_on)
        VALUES (:room_no, :emp_id, :reservation_date, :start_time, :end_time, NOW())
    """)
    db.execute(sql, {
        "room_no": room_id,
        "emp_id": emp_id,
        "reservation_date": date,
        "start_time": start_time,
        "end_time": end_time
    })
    db.commit()

    return {"status": "success", "message": "Room reserved successfully"}
