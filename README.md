# Real-Time Chat MVP

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Open source real-time chat MVP built with FastAPI (Python) for the backend and React for the frontend. This project demonstrates JWT-based authentication, a simple PostgreSQL-ready data model (implemented with SQLite for local testing), and a WebSocket-based chat channel per room.

## Architecture Overview

- Backend (FastAPI)
  - JWT-based authentication
  - SQLite (as MVP) with SQLAlchemy models for Users, Rooms, and Messages
  - WebSocket endpoint for real-time chat per room
  - REST endpoints for auth (register/login)
- Frontend (React)
  - Simple UI to login/register and join a room via WebSocket
  - Client-side state management for messages
- Config & Render
  - Configurable database URL (defaults to SQLite for MVP but production can use PostgreSQL)

## Setup

1. Prerequisites
   - Python 3.11+ installed
   - Node.js 18+ installed (for frontend)

2. Backend setup
   - Create a Python virtual environment
     - python3 -m venv venv
     - source venv/bin/activate
   - Install dependencies
     - pip install -r requirements.txt
   - Run the FastAPI server
     - uvicorn backend.main:app --reload --port 8000

3. Frontend setup
   - Navigate to frontend/
   - Install dependencies
     - npm install
   - Start the frontend dev server
     - npm run dev

4. Testing
   - Run pytest from the project root
     - pytest -q

## Open Source & Contributions

This project is open source under the MIT license. Contributions are welcome. See LICENSE for details.

## References

- FastAPI: https://fastapi.tiangolo.com/
- SQLAlchemy: https://www.sqlalchemy.org/
- JWT (PyJWT): https://pyjwt.readthedocs.io/
- React: https://reactjs.org/
- WebSocket: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
