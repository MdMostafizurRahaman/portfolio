from pymongo import MongoClient
from dotenv import load_dotenv
import os
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Get MongoDB connection string from environment variable or use a default for local development
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")

class DatabaseService:
    """Service class to handle MongoDB operations"""
    
    def __init__(self):
        """Initialize the database connection"""
        try:
            self.client = MongoClient(MONGODB_URI)
            self.db = self.client["portfolio_db"]
            logger.info("Connected to MongoDB successfully")
        except Exception as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            raise
    
    def get_projects(self):
        """Get all projects from the database"""
        try:
            return list(self.db.projects.find({}, {"_id": 0}))
        except Exception as e:
            logger.error(f"Error retrieving projects: {e}")
            return []
    
    def get_experiences(self):
        """Get all experiences from the database"""
        try:
            return list(self.db.experiences.find({}, {"_id": 0}))
        except Exception as e:
            logger.error(f"Error retrieving experiences: {e}")
            return []
    
    def get_skills(self):
        """Get all skills from the database"""
        try:
            return list(self.db.skills.find({}, {"_id": 0}))
        except Exception as e:
            logger.error(f"Error retrieving skills: {e}")
            return []
    
    def save_contact_message(self, message_data):
        """Save a contact message to the database"""
        try:
            result = self.db.contact_messages.insert_one(message_data)
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error saving contact message: {e}")
            return False
    
    def seed_database(self):
        """Seed the database with initial data"""
        try:
            # Sample projects data
            projects = [
                {
                    "title": "Policy Tracker",
                    "description": "A comprehensive tracker for monitoring company policies and updates. Features document management, version control, and notification systems.",
                    "technologies": ["React", "Node.js", "MongoDB", "Express"],
                    "image_url": "/assets/projects/policy-tracker.jpg",
                    "github_url": "https://github.com/MdMostafizurRahaman/policy-tracker",
                    "live_url": "https://policy-tracker-demo.com"
                },
                {
                    "title": "Portfolio Website",
                    "description": "A dynamic, colorful portfolio website showcasing skills, projects and professional experience with responsive design and dark mode.",
                    "technologies": ["React", "JavaScript", "Tailwind CSS", "FastAPI", "MongoDB"],
                    "image_url": "/assets/projects/portfolio.jpg",
                    "github_url": "https://github.com/MdMostafizurRahaman/portfolio",
                    "live_url": "https://mostafizur-portfolio.com"
                },
                {
                    "title": "E-commerce Platform",
                    "description": "Full-featured e-commerce platform with product catalog, cart functionality, user authentication, and payment processing.",
                    "technologies": ["React", "Redux", "Node.js", "Express", "MongoDB"],
                    "image_url": "/assets/projects/ecommerce.jpg",
                    "github_url": "https://github.com/MdMostafizurRahaman/ecommerce",
                    "live_url": "https://ecommerce-demo.com"
                }
            ]

            # Sample experiences data
            experiences = [
                {
                    "title": "Front-End Developer Intern",
                    "company": "Ithra, Aramco",
                    "location": "Dhahran, Saudi Arabia",
                    "start_date": "January 2025",
                    "end_date": None,
                    "current": True,
                    "description": [
                        "Working on developing and maintaining the Policy Tracker application",
                        "Implementing responsive UI designs using React and Tailwind CSS",
                        "Collaborating with backend developers to integrate RESTful APIs",
                        "Participating in code reviews and implementing feedback"
                    ]
                },
                {
                    "title": "Web Development Intern",
                    "company": "Tech Innovations Inc.",
                    "location": "Dhaka, Bangladesh",
                    "start_date": "June 2024",
                    "end_date": "December 2024",
                    "current": False,
                    "description": [
                        "Developed and maintained company website using React and Node.js",
                        "Implemented responsive designs and ensured cross-browser compatibility",
                        "Collaborated with the design team to create user-friendly interfaces",
                        "Participated in Agile development process with weekly sprints"
                    ]
                },
                {
                    "title": "Research Assistant",
                    "company": "University Research Lab",
                    "location": "Dhaka, Bangladesh",
                    "start_date": "January 2024",
                    "end_date": "May 2024",
                    "current": False,
                    "description": [
                        "Assisted in research projects related to machine learning applications",
                        "Developed data visualization tools using Python and D3.js",
                        "Collaborated with team members on academic publications",
                        "Presented research findings at departmental seminars"
                    ]
                }
            ]

            # Sample skills data
            skills = [
                {"name": "JavaScript", "level": 90, "category": "Programming Languages"},
                {"name": "Python", "level": 85, "category": "Programming Languages"},
                {"name": "Java", "level": 75, "category": "Programming Languages"},
                {"name": "C++", "level": 70, "category": "Programming Languages"},
                {"name": "HTML/CSS", "level": 95, "category": "Web Technologies"},
                {"name": "React", "level": 85, "category": "Web Technologies"},
                {"name": "Node.js", "level": 80, "category": "Web Technologies"},
                {"name": "MongoDB", "level": 75, "category": "Databases"},
                {"name": "PostgreSQL", "level": 70, "category": "Databases"},
                {"name": "Git", "level": 85, "category": "Tools"},
                {"name": "Docker", "level": 70, "category": "Tools"},
                {"name": "TensorFlow", "level": 65, "category": "Machine Learning"}
            ]

            # Insert data into MongoDB if collections are empty
            if self.db.projects.count_documents({}) == 0:
                self.db.projects.insert_many(projects)
                logger.info(f"Inserted {len(projects)} projects")
            
            if self.db.experiences.count_documents({}) == 0:
                self.db.experiences.insert_many(experiences)
                logger.info(f"Inserted {len(experiences)} experiences")
            
            if self.db.skills.count_documents({}) == 0:
                self.db.skills.insert_many(skills)
                logger.info(f"Inserted {len(skills)} skills")
            
            return True
            
        except Exception as e:
            logger.error(f"Error seeding database: {e}")
            return False

# Create a singleton instance
db_service = DatabaseService()