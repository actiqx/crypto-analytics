# Nexus Analytics Dashboard

A professional full-stack cryptocurrency analytics dashboard built with **FastAPI** and **React (Vite/TypeScript)**.

## Project Overview

Nexus Analytics provides real-time tracking of cryptocurrency assets, user management, and data visualization. The system is designed with a modular backend architecture and a premium, responsive frontend using Tailwind CSS and shadcn/ui.

## 🚀 Getting Started

The easiest way to run the entire application is to use the provided startup script (on Windows).

### Prerequisites
- **Python 3.10+** (for local development)
- **Node.js 18+** (for local development)
- **Docker & Docker Compose** (for containerized deployment)

## 🐳 Docker Deployment (Recommended)

The entire system can be easily deployed using Docker. This ensures environment consistency across different systems.

### Running with Docker Compose
1. Ensure Docker is running on your machine.
2. Run the following command in the root directory:
   ```bash
   docker-compose up --build
   ```
3. Access the services at:
   - **Frontend UI**: `http://localhost:3000`
   - **Backend API**: `http://localhost:8000/docs`

### Running the Application
Simply double-click `start_app.bat` in the root directory. This will:
1.  Initialize the Python virtual environment and start the FastAPI server at `http://localhost:8000`.
2.  Start the Vite development server for the frontend at `http://localhost:3000`.

---

## 📂 Repository Structure

```text
.
├── backend/            # FastAPI Backend API
│   ├── main.py        # Entry point
│   ├── database.py    # SQLAlchemy/SQLite setup
│   ├── models.py      # Database models
│   ├── routes/        # API route handlers
│   └── services/      # Business logic
├── frontend/           # React Frontend UI
│   ├── src/           # Application source code
│   ├── public/        # Static assets
│   └── components.json # shadcn/ui configuration
└── start_app.bat      # Windows startup script
```

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: SQLite with SQLAlchemy ORM
- **Tasks**: Background data fetching from CoinCap API
- **Documentation**: Swagger UI (Auto-generated)

### Frontend
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui & Lucide Icons
- **Vite Plugins**: React SWC for fast development

---

## 🔗 Links
- **Frontend UI**: [http://localhost:3000/](http://localhost:3000/)
- **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
