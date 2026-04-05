# Nexus Analytics - Backend API

The backend for the Nexus Analytics application is built with **FastAPI**, **SQLite**, and **SQLAlchemy**. It follows a modular structure to ensure scalability and maintainability.

## 🛠️ Features
- **FastAPI Framework**: High performance, asynchronous Python web API.
- **SQLite Database**: Local SQLite storage for simplicity and ease of setup.
- **SQLAlchemy ORM**: Clean data modeling and database interaction.
- **Unified Services**: Business logic isolated in `services/`.
- **Swagger Documentation**: Automatic interactive API documentation.

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- `pip` (Python package manager)

### Installation
1.  **Create a Virtual Environment**:
    ```bash
    python -m venv venv
    ```
2.  **Activate the Virtual Environment**:
    - **Windows**: `venv\Scripts\activate`
    - **Unix/macOS**: `source venv/bin/activate`
3.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

### Running the Server
```bash
uvicorn main:app --reload --port 8000
```
- **API URL**: `http://localhost:8000`
- **Interactive docs**: `http://localhost:8000/docs` (Swagger UI)

---

## 📂 Backend Architecture

```text
backend/
├── routes/          # API route definitions
│   ├── asset_routes.py
│   └── user_routes.py
├── schemas/         # Pydantic models for data validation
├── services/        # Core business logic handlers
├── database.py      # SQLAlchemy engine configuration
├── main.py          # FastAPI application entry point
├── models.py        # SQLAlchemy database models
└── requirements.txt # Project dependencies
```

## 🔐 Configuration
The backend uses a `.env` file for environment variables. Ensure the `DATABASE_URL` is configured correctly:
```text
DATABASE_URL=sqlite:///./analytics.db
```
*(Copy from `.env.example` if it doesn't exist)*
