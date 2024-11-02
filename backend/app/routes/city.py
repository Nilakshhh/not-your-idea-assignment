from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database

router = APIRouter()

@router.post("/cities/", response_model=schemas.City)
def create_city(city: schemas.CityCreate, state_id: int, db: Session = Depends(database.get_db)):
    db_city = models.City(name=city.name, coordinates=city.coordinates, description=city.description, state_id=state_id)
    db.add(db_city)
    db.commit()
    db.refresh(db_city)
    return db_city

@router.get("/cities/", response_model=list[schemas.City])
def get_cities(db: Session = Depends(database.get_db)):
    return db.query(models.City).all()
