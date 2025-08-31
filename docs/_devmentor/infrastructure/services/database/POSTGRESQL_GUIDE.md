---
layout: product
title: POSTGRESQL GUIDE
product: DevMentor
source: infrastructure/services/database/POSTGRESQL_GUIDE.md
---

{% raw %}
CURRENT ARCHITECTURE

Note: Any document not marked CURRENT ARCHITECTURE will be archived in a later cleanup.

# PostgreSQL Integration Guide

This guide provides a comprehensive walkthrough of PostgreSQL integration in our system, structured to build understanding from fundamentals to advanced usage.

## 1. Getting Started with PostgreSQL
### Prerequisites
- PostgreSQL installation (version 14.0 or higher)
- Basic SQL knowledge
- Access to database credentials

### Basic Setup
```bash
# Install PostgreSQL
brew install postgresql@14  # For MacOS
sudo apt-get install postgresql-14  # For Ubuntu/Debian

# Start PostgreSQL service
brew services start postgresql@14  # For MacOS
sudo systemctl start postgresql  # For Ubuntu/Debian
```

### Initial Configuration
```sql
-- Create database
CREATE DATABASE devmentor;

-- Create user with appropriate privileges
CREATE USER devmentor_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE devmentor TO devmentor_user;
```

## 2. Database Schema and Structure
### Core Tables
- Users
- Projects
- Tasks
- Progress
- Analytics

### Schema Design
```sql
-- Example of core table structure
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 3. Application Integration
### Environment Configuration
```bash
# Required environment variables
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=devmentor
POSTGRES_USER=devmentor_user
POSTGRES_PASSWORD=your_secure_password
```

### Connection Management
```python
import psycopg2
from psycopg2.pool import SimpleConnectionPool

def get_db_pool():
    return SimpleConnectionPool(
        minconn=1,
        maxconn=10,
        dbname=os.getenv('POSTGRES_DB'),
        user=os.getenv('POSTGRES_USER'),
        password=os.getenv('POSTGRES_PASSWORD'),
        host=os.getenv('POSTGRES_HOST'),
        port=os.getenv('POSTGRES_PORT')
    )

# Usage example
pool = get_db_pool()
conn = pool.getconn()
try:
    with conn.cursor() as cur:
        cur.execute("SELECT version();")
        version = cur.fetchone()
finally:
    pool.putconn(conn)
```

## 4. Data Access Patterns
### Basic CRUD Operations
```python
def create_user(email: str, full_name: str) -> dict:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO users (email, full_name)
                VALUES (%s, %s)
                RETURNING id, email, full_name, created_at;
                """,
                (email, full_name)
            )
            return dict(zip(['id', 'email', 'full_name', 'created_at'], cur.fetchone()))
```

### Query Optimization
- Use appropriate indexes
- Implement connection pooling
- Write efficient queries
- Monitor query performance

## 5. Backup and Maintenance
### Regular Backups
```bash
# Create backup
pg_dump devmentor > backup_$(date +%Y%m%d).sql

# Restore from backup
psql devmentor < backup_20250817.sql
```

### Monitoring
- Monitor database size and growth
- Track query performance
- Set up alerts for critical metrics

## 6. Security Best Practices
- Use connection pooling
- Implement proper access controls
- Regular security audits
- Secure connection strings
- Parameter binding for all queries

## 7. Troubleshooting
### Common Issues
- Connection timeouts
- Query performance
- Memory usage
- Connection limits

### Debugging Tools
- PostgreSQL logs
- pg_stat_statements
- EXPLAIN ANALYZE
- pgAdmin or similar GUI tools

## 8. Performance Optimization
### Indexing Strategies
```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_user_id ON projects(user_id);
```

### Query Optimization
- Use EXPLAIN ANALYZE
- Optimize JOIN operations
- Implement appropriate indexes
- Regular VACUUM and ANALYZE

## 9. Learning Path Structure

### Database Fundamentals
- What is a Database?
- What is RDBMS?
- SQL vs NoSQL
- ACID vs BASE
- OLTP vs OLAP
- Transactions

### Relational Database Concepts
- Tables
- Rows & Columns
- Schemas
- Keys (Primary, Composite)
- Relationships

### Data Types and Models
- Integer and String
- Boolean and Date
- JSON
- Document
- Key-Value
- Columnar
- Graph

### Querying and Language
#### SQL Basics
```sql
-- Basic CRUD operations
SELECT * FROM users WHERE email = 'example@email.com';
INSERT INTO users (email, full_name) VALUES ('new@email.com', 'New User');
UPDATE users SET full_name = 'Updated Name' WHERE id = 1;
DELETE FROM users WHERE id = 1;

-- Joins
SELECT u.*, p.title 
FROM users u
INNER JOIN projects p ON u.id = p.user_id;

-- Group operations
SELECT user_id, COUNT(*) as project_count
FROM projects
GROUP BY user_id;
```

#### Advanced SQL
```sql
-- Views
CREATE VIEW active_projects AS
SELECT * FROM projects WHERE status = 'active';

-- Stored Procedures
CREATE OR REPLACE FUNCTION get_user_stats(user_id INT)
RETURNS TABLE (project_count INT, last_activity TIMESTAMP) AS $$
BEGIN
    RETURN QUERY
    SELECT COUNT(*), MAX(created_at)
    FROM projects
    WHERE user_id = $1;
END;
$$ LANGUAGE plpgsql;

-- CTEs
WITH user_metrics AS (
    SELECT user_id, COUNT(*) as project_count
    FROM projects
    GROUP BY user_id
)
SELECT u.*, m.project_count
FROM users u
JOIN user_metrics m ON u.id = m.user_id;
```

### Indexing and Optimization
- B-Tree indexes
- Hash indexes
- Bitmap indexes
- Query execution planning
- Normalization strategies
- Connection pooling setup

### Security and Maintenance
```sql
-- Role-based access control
CREATE ROLE readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;

-- Row-level security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY project_access ON projects
    USING (user_id = CURRENT_USER_ID());

-- Encryption
CREATE EXTENSION pgcrypto;
UPDATE users SET password = crypt('secure_password', gen_salt('bf'));
```

### Tools and Ecosystem
- PostgreSQL setup and configuration
- pgAdmin for database management
- Sequelize ORM integration
- Backup and restore procedures
- Monitoring and logging setup

## Resources
- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)
- [psycopg2 Documentation](https://www.psycopg.org/docs/)
- [Database Indexing Strategies](https://www.postgresql.org/docs/current/indexes.html)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [SQL Language Reference](https://www.postgresql.org/docs/current/sql.html)
{% endraw %}
