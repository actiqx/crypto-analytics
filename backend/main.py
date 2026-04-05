import logging
import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from routes import asset_routes, user_routes

# Configure elegant logging for institutional-grade reliability
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('backend.log')
    ]
)
logger = logging.getLogger("NexusAPI")

# Ensure all database tables exist on startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Nexus Analytics API",
    description="Institutional-grade cryptocurrency metrics and organization management system.",
    version="2.0.0"
)

# Standardize CORS for scalable frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware for performance tracking and tracing
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    logger.info(f"{request.method} {request.url.path} - {response.status_code} - {process_time:.4f}s")
    return response

# Modularizing application routes for horizontal scale
app.include_router(asset_routes.router)
app.include_router(user_routes.router)

@app.get("/")
def root():
    return {
        "status": "operational",
        "version": "2.0.0",
        "timestamp": time.time(),
        "documentation": "/docs"
    }
