---
layout: product
title: implementation
product: DevMentor
source: infrastructure/services/database/implementation.md
---

{% raw %}
CURRENT ARCHITECTURE

Note: Any document not marked CURRENT ARCHITECTURE will be archived in a later cleanup.

# DevMentor PostgreSQL Implementation

This document outlines how PostgreSQL is implemented within DevMentor, focusing on our specific use cases and patterns.

## Database Architecture

### Core Schema
```sql
-- Users and Authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    github_username VARCHAR(100),
    full_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Learning Paths
CREATE TABLE learning_paths (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    difficulty_level VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Progress Tracking
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    learning_path_id INTEGER REFERENCES learning_paths(id),
    completion_percentage DECIMAL,
    last_activity TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, learning_path_id)
);

-- Analytics and Metrics
CREATE TABLE user_metrics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    metric_type VARCHAR(50),
    metric_value JSONB,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## SQLAlchemy Integration

### Models (`app/models.py`)
```python
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    github_username = Column(String)
    full_name = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    progress = relationship("UserProgress", back_populates="user")
    metrics = relationship("UserMetrics", back_populates="user")

class LearningPath(Base):
    __tablename__ = 'learning_paths'
    
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String)
    difficulty_level = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    progress = relationship("UserProgress", back_populates="learning_path")

class UserProgress(Base):
    __tablename__ = 'user_progress'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    learning_path_id = Column(Integer, ForeignKey('learning_paths.id'))
    completion_percentage = Column(Numeric)
    last_activity = Column(DateTime(timezone=True))
    
    user = relationship("User", back_populates="progress")
    learning_path = relationship("LearningPath", back_populates="progress")

class UserMetrics(Base):
    __tablename__ = 'user_metrics'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    metric_type = Column(String)
    metric_value = Column(JSONB)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="metrics")
```

### Database Configuration (`app/database.py`)
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
import os

DATABASE_URL = os.getenv(
    'DATABASE_URL',
    'postgresql://devmentor_user:password@localhost:5432/devmentor'
)

engine = create_engine(DATABASE_URL, pool_size=5, max_overflow=10)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
```

## Repository Pattern Implementation

### Base Repository (`app/repositories/base.py`)
```python
from typing import TypeVar, Generic, Type, Optional, List
from sqlalchemy.orm import Session
from pydantic import BaseModel

T = TypeVar('T')
CreateSchema = TypeVar('CreateSchema', bound=BaseModel)
UpdateSchema = TypeVar('UpdateSchema', bound=BaseModel)

class BaseRepository(Generic[T, CreateSchema, UpdateSchema]):
    def __init__(self, model: Type[T]):
        self.model = model

    def create(self, db: Session, *, obj_in: CreateSchema) -> T:
        obj_in_data = obj_in.dict()
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get(self, db: Session, id: int) -> Optional[T]:
        return db.query(self.model).filter(self.model.id == id).first()

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[T]:
        return db.query(self.model).offset(skip).limit(limit).all()

    def update(
        self, db: Session, *, db_obj: T, obj_in: UpdateSchema
    ) -> T:
        obj_data = obj_in.dict(exclude_unset=True)
        for field, value in obj_data.items():
            setattr(db_obj, field, value)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, *, id: int) -> Optional[T]:
        obj = db.query(self.model).get(id)
        if obj:
            db.delete(obj)
            db.commit()
        return obj
```

### User Repository Example (`app/repositories/user.py`)
```python
from typing import Optional
from sqlalchemy.orm import Session
from .base import BaseRepository
from ..models import User
from ..schemas.user import UserCreate, UserUpdate

class UserRepository(BaseRepository[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def get_by_github(self, db: Session, *, username: str) -> Optional[User]:
        return db.query(User).filter(User.github_username == username).first()
```

## Usage Examples

### Creating a New User
```python
from app.database import get_db
from app.repositories.user import UserRepository
from app.schemas.user import UserCreate

user_repo = UserRepository(User)

user_data = UserCreate(
    email="user@example.com",
    github_username="devuser",
    full_name="Dev User"
)

with get_db() as db:
    user = user_repo.create(db, obj_in=user_data)
```

### Tracking Learning Progress
```python
from app.repositories.progress import ProgressRepository
from app.schemas.progress import ProgressCreate

progress_repo = ProgressRepository(UserProgress)

progress_data = ProgressCreate(
    user_id=user.id,
    learning_path_id=1,
    completion_percentage=25.0
)

with get_db() as db:
    progress = progress_repo.create(db, obj_in=progress_data)
```

### Recording Metrics
```python
from app.repositories.metrics import MetricsRepository
from app.schemas.metrics import MetricCreate

metrics_repo = MetricsRepository(UserMetrics)

metric_data = MetricCreate(
    user_id=user.id,
    metric_type="coding_time",
    metric_value={"minutes": 120, "language": "python"}
)

with get_db() as db:
    metric = metrics_repo.create(db, obj_in=metric_data)
```

## Migration Management

We use Alembic for database migrations. Migration scripts are stored in `migrations/versions/`.

### Creating a New Migration
```bash
# Generate migration
alembic revision --autogenerate -m "Add user metrics table"

# Apply migration
alembic upgrade head

# Rollback if needed
alembic downgrade -1
```

## Environment Configuration

Required environment variables for database connection:
```bash
DATABASE_URL=postgresql://devmentor_user:password@localhost:5432/devmentor
DB_POOL_SIZE=5
DB_MAX_OVERFLOW=10
```

## Maintenance Tasks

### Regular Maintenance
```python
# Schedule with your preferred task scheduler
async def perform_maintenance():
    with get_db() as db:
        # Clean old metrics
        db.execute("""
            DELETE FROM user_metrics 
            WHERE recorded_at < NOW() - INTERVAL '90 days'
        """)
        
        # Aggregate statistics
        db.execute("""
            INSERT INTO aggregated_metrics 
            SELECT 
                user_id,
                DATE_TRUNC('day', recorded_at) as day,
                metric_type,
                jsonb_agg(metric_value) as values
            FROM user_metrics 
            WHERE recorded_at >= NOW() - INTERVAL '1 day'
            GROUP BY user_id, DATE_TRUNC('day', recorded_at), metric_type
        """)
```
{% endraw %}
