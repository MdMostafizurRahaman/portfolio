from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from typing import List, Optional
import os
import uvicorn
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import database service
from database import db_service

# Initialize FastAPI app
app = FastAPI(title="Portfolio API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Project(BaseModel):
    title: str
    description: str
    technologies: List[str]
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None

class Experience(BaseModel):
    title: str
    company: str
    location: str
    start_date: str
    end_date: Optional[str] = None
    current: bool = False
    description: List[str]

class Skill(BaseModel):
    name: str
    level: int  # 1-100
    category: str

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

# API Routes
@app.get("/")
async def root():
    """Root endpoint for health check"""
    return {"status": "ok", "message": "FastAPI server is running"}

@app.get("/api/projects")
async def get_projects():
    """Get all projects"""
    projects = db_service.get_projects()
    return projects

@app.get("/api/experiences")
async def get_experiences():
    """Get all experiences"""
    experiences = db_service.get_experiences()
    return experiences

@app.get("/api/skills")
async def get_skills():
    """Get all skills"""
    skills = db_service.get_skills()
    return skills

@app.post("/api/contact")
async def submit_contact(message: ContactMessage):
    """Submit a contact message"""
    success = db_service.save_contact_message(message.dict())
    if success:
        return {"status": "success", "message": "Message sent successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to send message")

@app.post("/api/seed")
async def seed_database():
    """Seed the database with initial data"""
    success = db_service.seed_database()
    if success:
        return {"status": "success", "message": "Database seeded successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to seed database")

# We'll mount static files after the client is built
# For now we'll just use API routes

# Main entry point for running the server directly
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)