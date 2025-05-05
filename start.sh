#!/bin/bash
# This script starts the FastAPI backend server

echo "Starting FastAPI backend server..."

# Ensure Python can find the installed packages
export PYTHONPATH=$PYTHONPATH:$PWD/.pythonlibs/lib/python3.11/site-packages/

# Change to the server directory so relative imports work
cd server

# Seed the database with initial data (if needed)
echo "Seeding the database with initial data..."
python -c "from database import db_service; db_service.seed_database()"

# Start the FastAPI server
echo "Starting the FastAPI server..."
python app.py