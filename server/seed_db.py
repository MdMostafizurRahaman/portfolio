from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get MongoDB connection string from environment variable or use a default for local development
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")

# Connect to MongoDB
client = MongoClient(MONGODB_URI)
db = client["portfolio_db"]  # Database name

# Clear existing data (optional)
db.projects.delete_many({})
db.experiences.delete_many({})
db.skills.delete_many({})

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

# Insert data into MongoDB
db.projects.insert_many(projects)
db.experiences.insert_many(experiences)
db.skills.insert_many(skills)

print("Database seeded successfully!")
print(f"Inserted {len(projects)} projects")
print(f"Inserted {len(experiences)} experiences")
print(f"Inserted {len(skills)} skills")