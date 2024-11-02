from pydantic import BaseModel
from typing import Optional, List

# City Schema
class CityBase(BaseModel):
    city_name: str
    coordinates: Optional[str] = None
    additional_info: Optional[str] = None

class CityCreate(CityBase):
    pass

class City(CityBase):
    id: int
    state_id: int

    class Config:
        orm_mode = True

# State Schema
class StateBase(BaseModel):
    state_name: str

class StateCreate(StateBase):
    direction_id: int

class State(StateBase):
    id: int
    direction_id: int
    cities: List[City] = []

    class Config:
        orm_mode = True

# Direction Schema
class DirectionBase(BaseModel):
    direction_name: str

class DirectionCreate(DirectionBase):
    pass

class Direction(DirectionBase):
    id: int
    states: List[State] = []

    class Config:
        orm_mode = True
