from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database

router = APIRouter()

@router.post("/directions/", response_model=schemas.Direction)
def create_direction(direction: schemas.DirectionCreate, db: Session = Depends(database.get_db)):
    db_direction = models.Direction(name=direction.name)
    db.add(db_direction)
    db.commit()
    db.refresh(db_direction)
    return db_direction

@router.get("/directions/", response_model=list[schemas.Direction])
def get_directions(db: Session = Depends(database.get_db)):
    return db.query(models.Direction).all()
