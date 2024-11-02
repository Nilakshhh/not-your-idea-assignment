from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database

router = APIRouter()

@router.post("/states/", response_model=schemas.State)
def create_state(state: schemas.StateCreate, db: Session = Depends(database.get_db)):
    db_state = models.State(name=state.name, direction_id=state.direction_id)
    db.add(db_state)
    db.commit()
    db.refresh(db_state)
    return db_state

@router.get("/states/", response_model=list[schemas.State])
def get_states(db: Session = Depends(database.get_db)):
    return db.query(models.State).all()
