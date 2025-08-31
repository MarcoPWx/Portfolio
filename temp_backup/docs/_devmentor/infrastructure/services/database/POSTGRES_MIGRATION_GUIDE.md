---
layout: product
title: POSTGRES MIGRATION GUIDE
product: DevMentor
source: infrastructure/services/database/POSTGRES_MIGRATION_GUIDE.md
---

{% raw %}
CURRENT ARCHITECTURE

# PostgreSQL Migration Strategy for DevMentor

## Executive Summary
This document outlines the strategy to standardize all DevMentor services on PostgreSQL for persistent storage, while maintaining Qdrant for vector operations. The migration will consolidate scattered persistence approaches into a unified, scalable architecture.

## Current State Analysis

### Service Persistence Overview

| Service | Current Storage | Status | Issues |
|---------|----------------|--------|--------|
| **Auth Service** | PostgreSQL (pg) | ✅ Partial | Dual schema paths, inconsistent table definitions |
| **Project Service** | PostgreSQL + Filesystem | ✅ Working | Files on disk, metadata in DB |
| **Memory Service** | Qdrant only | ⚠️ Limited | No relational metadata, demo writes to JSON |
| **AI Gateway** | None | ❌ Stateless | No persistence layer |
| **API Gateway** | Redis (cache only) | ✅ Stateless | Cache-only, no issues |

### Identified Issues

1. **Schema Duplication in Auth Service**
   - `services/auth-service/src/index.ts`: Creates tables with SERIAL IDs in public schema
   - `services/auth-service/src/database.ts`: Defines auth.* schema with UUIDs and RLS
   - No canonical migrations checked into repository

2. **Missing Infrastructure**
   - `services/database/docker-compose.yml` references non-existent `schema.sql` and `seed-data.sql`
   - No migration framework or versioning system
   - Inconsistent ID types (SERIAL vs UUID)

3. **Memory Service Gaps**
   - No PostgreSQL integration for document metadata
   - Demo endpoint writes to local JSON file
   - No stable IDs for retrieval operations

4. **File Storage Inconsistency**
   - Project Service stores files on disk with metadata in PostgreSQL
   - No clear strategy for scaling or backup

## Target Architecture

### Database Schema Organization

```
PostgreSQL Database: devmentor
├── Schema: auth
│   ├── users (UUID PK)
│   ├── user_sessions (UUID PK)
│   └── audit_log (UUID PK)
├── Schema: projects
│   ├── projects (UUID PK)
│   ├── epics (UUID PK)
│   ├── tasks (UUID PK)
│   ├── project_files (UUID PK)
│   └── project_activity (UUID PK)
└── Schema: memory
    ├── documents (UUID PK)
    └── chunks (UUID PK, links to Qdrant)
```

### Storage Strategy

- **PostgreSQL**: All relational data, metadata, audit trails
- **Qdrant**: Vector embeddings for RAG/search
- **Filesystem/S3**: Binary files (with metadata in PostgreSQL)
- **Redis**: Session cache, rate limiting, temporary data

## Implementation Plan

### Phase 1: Schema Definition and Migrations (Week 1)

#### 1.1 Choose Migration Tool
**Options:**
- **Recommended**: node-pg-migrate (simple, SQL-based)
- Alternative 1: Prisma (ORM with migrations)
- Alternative 2: Knex.js migrations
- Alternative 3: Plain SQL with version table

#### 1.2 Create Canonical Schema

**File Structure:**
```
database/
├── migrations/
│   ├── 001_enable_extensions.sql
│   ├── 002_create_auth_schema.sql
│   ├── 003_create_projects_schema.sql
│   ├── 004_create_memory_schema.sql
│   └── 005_seed_initial_data.sql
├── seeds/
│   └── development.sql
└── docker-compose.yml
```

**Core Schema Definitions:**

```sql
-- 001_enable_extensions.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 002_create_auth_schema.sql
CREATE SCHEMA IF NOT EXISTS auth;

CREATE TABLE auth.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'user' NOT NULL,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    github_id VARCHAR(50),
    avatar_url TEXT,
    last_login_at TIMESTAMPTZ,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE auth.user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    refresh_token TEXT UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE auth.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    success BOOLEAN NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_auth_users_email ON auth.users(email);
CREATE INDEX idx_auth_users_username ON auth.users(username);
CREATE INDEX idx_auth_sessions_user_id ON auth.user_sessions(user_id);
CREATE INDEX idx_auth_sessions_token ON auth.user_sessions(session_token);
CREATE INDEX idx_auth_audit_user_id ON auth.audit_log(user_id);
CREATE INDEX idx_auth_audit_created_at ON auth.audit_log(created_at);
```

### Phase 2: Unify Auth Service (Week 1-2)

#### Tasks:
1. Remove embedded CREATE TABLE statements from `services/auth-service/src/index.ts`
2. Standardize on `services/auth-service/src/database.ts` approach with UUID
3. Update all queries to use `auth.*` schema
4. Add migration runner on service startup
5. Test all auth endpoints with new schema

#### Code Changes:
```typescript
// services/auth-service/src/index.ts
async function initializeDatabase() {
  try {
    // Just verify schema exists, don't create tables
    await pool.query("SELECT 1 FROM auth.users LIMIT 1");
    logger.info('Database schema verified');
  } catch (error) {
    logger.error('Database schema not found. Run migrations first.');
    process.exit(1);
  }
}
```

### Phase 3: Enhance Project Service (Week 2)

#### File Storage Decision:

**Option A: Keep Filesystem (Recommended for MVP)**
- Store files on disk at `PROJECTS_DIR`
- Keep metadata and text content in PostgreSQL
- Use shared volumes in production

**Option B: Move to Object Storage (Future)**
- Integrate MinIO/S3
- Store only metadata and signed URLs in PostgreSQL
- Better for multi-region deployments

#### Tasks:
1. Ensure all routes use PostgreSQL (remove any in-memory arrays)
2. Add proper transaction handling for multi-table operations
3. Implement file cleanup on project deletion
4. Add file versioning support in schema

### Phase 4: Add PostgreSQL to Memory Service (Week 2-3)

#### Schema Integration:
```sql
-- 004_create_memory_schema.sql
CREATE SCHEMA IF NOT EXISTS memory;

CREATE TABLE memory.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id VARCHAR(255),
    source VARCHAR(100) NOT NULL,
    type VARCHAR(50) DEFAULT 'document',
    path TEXT,
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE memory.chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES memory.documents(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    qdrant_point_id UUID,
    embedding_model VARCHAR(100),
    score FLOAT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_memory_documents_source ON memory.documents(source);
CREATE INDEX idx_memory_documents_type ON memory.documents(type);
CREATE INDEX idx_memory_chunks_document_id ON memory.chunks(document_id);
CREATE INDEX idx_memory_chunks_qdrant_id ON memory.chunks(qdrant_point_id);
```

#### Implementation Tasks:
1. Add PostgreSQL client to Memory Service
2. On document ingestion:
   - Create `memory.documents` record
   - Split into chunks, create `memory.chunks` records
   - Store embeddings in Qdrant with chunk IDs
3. On search:
   - Query Qdrant for similar vectors
   - Join with PostgreSQL for full metadata
   - Return enriched results
4. Remove JSON file writing from demo endpoint

### Phase 5: Infrastructure Setup (Week 3)

#### Docker Compose Configuration:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: devmentor
      POSTGRES_USER: devmentor
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/migrations:/migrations:ro
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devmentor"]
      interval: 10s
      timeout: 5s
      retries: 5

  migrator:
    image: node:18-alpine
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./database:/database
    environment:
      DATABASE_URL: postgresql://devmentor:${DB_PASSWORD}@postgres:5432/devmentor
    command: |
      sh -c "
        npm install -g node-pg-migrate
        pg-migrate up -m /database/migrations
      "

  qdrant:
    image: qdrant/qdrant
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  qdrant_data:
  redis_data:
```

### Phase 6: Data Migration (Week 3-4)

#### Migration Scripts:

1. **Auth Data Migration**
```sql
-- Migrate existing users from SERIAL to UUID
INSERT INTO auth.users (id, email, username, full_name, password_hash, role, created_at)
SELECT 
    gen_random_uuid(),
    email,
    COALESCE(username, email),
    COALESCE(full_name, first_name || ' ' || last_name),
    password_hash,
    role,
    created_at
FROM public.users;
```

2. **Project Data Verification**
- Ensure all projects have valid UUIDs
- Verify file references are correct
- Clean up orphaned files

3. **Memory Data Import**
- Index existing documents into PostgreSQL
- Backfill Qdrant point IDs
- Remove legacy JSON files

### Phase 7: Testing and Validation (Week 4)

#### Test Checklist:
- [ ] All services start without creating tables
- [ ] Migrations run idempotently
- [ ] Auth flow works end-to-end
- [ ] Project CRUD operations complete successfully
- [ ] File upload/download works
- [ ] Memory ingestion creates both PostgreSQL and Qdrant entries
- [ ] Search returns enriched results
- [ ] Health checks pass for all services
- [ ] Swagger aggregation works

#### Performance Tests:
- [ ] Auth: 100 concurrent login attempts
- [ ] Projects: Create 1000 projects with files
- [ ] Memory: Ingest 10,000 documents
- [ ] Search: 100 concurrent RAG queries

### Phase 8: Documentation Update (Week 4)

#### Required Updates:
1. Update `docs/db/ERD.md` with actual schema
2. Generate OpenAPI specs for all services
3. Update API contracts documentation
4. Create runbook for migrations
5. Document backup/restore procedures

## Rollback Plan

### Database Rollback:
```bash
# Rollback last migration
pg-migrate down

# Rollback to specific migration
pg-migrate down --to 002_create_auth_schema

# Full reset (development only)
pg-migrate reset
```

### Service Rollback:
1. Stop affected service
2. Rollback database migrations
3. Deploy previous service version
4. Restore from backup if needed

## Success Metrics

### Technical Metrics:
- Zero data loss during migration
- < 5 minute downtime per service
- All tests passing
- < 100ms query response time for 95th percentile

### Business Metrics:
- No user-facing errors
- Maintained API compatibility
- Improved query performance
- Reduced operational complexity

## Timeline Summary

| Week | Phase | Deliverables |
|------|-------|-------------|
| 1 | Schema & Auth | Migrations created, Auth service unified |
| 2 | Projects & Memory Planning | Project service verified, Memory schema designed |
| 3 | Memory & Infrastructure | Memory service integrated, Docker setup complete |
| 4 | Testing & Documentation | All tests passing, documentation updated |

## Risk Mitigation

### High Risks:
1. **Data Loss**: Mitigate with comprehensive backups before each phase
2. **Schema Conflicts**: Use namespaces to avoid collisions
3. **Performance Degradation**: Load test each phase before proceeding

### Medium Risks:
1. **Service Dependencies**: Use feature flags for gradual rollout
2. **Migration Failures**: Test in staging environment first
3. **Team Knowledge Gaps**: Provide training on new schema

## Appendix A: SQL Migration Examples

### Complete Auth Schema Migration:
```sql
BEGIN;

-- Create schema
CREATE SCHEMA IF NOT EXISTS auth;

-- Create users table with all fields
CREATE TABLE auth.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'user' NOT NULL CHECK (role IN ('user', 'admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    github_id VARCHAR(50) UNIQUE,
    avatar_url TEXT,
    last_login_at TIMESTAMPTZ,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_auth_users_updated_at 
    BEFORE UPDATE ON auth.users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

COMMIT;
```

## Appendix B: Service Configuration Templates

### Environment Variables Template:
```env
# Database
DATABASE_URL=postgresql://devmentor:password@localhost:5432/devmentor
DB_POOL_SIZE=20
DB_SSL_MODE=prefer

# Qdrant
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_API_KEY=

# Redis
REDIS_URL=redis://localhost:6379
REDIS_LEARNING_URL=redis://localhost:6379/1

# File Storage
PROJECTS_DIR=/data/projects
MAX_FILE_SIZE=10485760

# Services
AUTH_SERVICE_URL=http://localhost:3002
PROJECT_SERVICE_URL=http://localhost:3005
MEMORY_SERVICE_URL=http://localhost:3003
AI_GATEWAY_URL=http://localhost:3001
```

## Next Steps

1. **Immediate Actions:**
   - [ ] Review and approve this strategy
   - [ ] Set up development PostgreSQL instance
   - [ ] Create migration framework scaffolding
   - [ ] Begin Phase 1 implementation

2. **Team Assignments:**
   - Auth Service: [Assignee]
   - Project Service: [Assignee]
   - Memory Service: [Assignee]
   - Infrastructure: [Assignee]
   - Testing: [Assignee]

3. **Communication Plan:**
   - Weekly sync meetings
   - Daily status updates in Slack
   - Migration progress dashboard

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-01-15  
**Status:** DRAFT - Pending Review  
**Owner:** DevMentor Platform Team
{% endraw %}
