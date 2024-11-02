from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Direction(Base):
    __tablename__ = 'direction'  # Match table name exactly

    id = Column(Integer, primary_key=True, index=True)
    direction_name = Column(String, unique=True, index=True, nullable=False)  # Match column name
    states = relationship('State', back_populates='direction')

class State(Base):
    __tablename__ = 'states'

    id = Column(Integer, primary_key=True, index=True)
    state_name = Column(String, unique=True, index=True, nullable=False)  # Match column name
    direction_id = Column(Integer, ForeignKey('direction.id'))
    direction = relationship('Direction', back_populates='states')
    cities = relationship('City', back_populates='state')

class City(Base):
    __tablename__ = 'cities'

    id = Column(Integer, primary_key=True, index=True)
    city_name = Column(String, nullable=False)  # Match column name
    state_id = Column(Integer, ForeignKey('states.id'))
    coordinates = Column(String)
    additional_info = Column(String)  # Match column name
    state = relationship('State', back_populates='cities')
