from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import DATABASE_URL
from .database import engine, Base
from .routers import auth as auth_routes
from .routers import chat as chat_routes
from .models import User, Room

app = FastAPI(title="Real-Time Chat MVP")

origins = ["*"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Create tables on startup (for MVP testing)
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    # Ensure a default room exists
    from sqlalchemy.orm import Session
    from .database import SessionLocal
    from .models import Room as RoomModel
    db: Session = SessionLocal()
    try:
        if not db.query(RoomModel).filter(RoomModel.name == "General").first():
            db.add(RoomModel(name="General"))
            db.commit()
    finally:
        db.close()

app.include_router(auth_routes.router, prefix="/auth")
app.include_router(chat_routes.router)

# Health check
@app.get("/health")
def health():
    return {"status": "ok", "db_url": DATABASE_URL}
