from fastapi import FastAPI
from .database import engine, Base
from .routes import directions, state, city
from fastapi.middleware.cors import CORSMiddleware

# Initialize database
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow specific origin(s)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(directions.router, prefix="/api")
app.include_router(state.router, prefix="/api")
app.include_router(city.router, prefix="/api")
