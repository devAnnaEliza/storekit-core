import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.health import router as health_router
from app.routes.db import router as db_router
from app.routes.products import router as products_router
from app.routes.orders import router as orders_router

from app.db.database import Base, engine
import app.models

app = FastAPI(
    title="StoreKit Core API",
    version="0.1.0",
)

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(health_router)
app.include_router(db_router)
app.include_router(products_router)
app.include_router(orders_router)


@app.get("/")
def root():
    return {"message": "StoreKit Core API online"}