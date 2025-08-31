---
layout: product
title: DAY 1 AUTH IMPLEMENTATION
product: DevMentor
source: implementation/DAY_1_AUTH_IMPLEMENTATION.md
---

{% raw %}
# 📋 Day 1: Authentication Implementation Plan

## Current State Assessment

### ✅ What We Have
- **Backend**: 
  - `auth-service/src/github-oauth.ts` - GitHub OAuth implementation exists
  - `auth-service/src/database.ts` - Database connection code
  - `auth-service/src/redis.ts` - Redis session management
  - `auth-service/src/index.ts` - Express server setup
  - Swagger documentation started

- **Frontend**:
  - LoginPage component with UI
  - GitHub OAuth button component
  - authService.ts with methods defined (but not connected)

- **Infrastructure**:
  - PostgreSQL running in cluster
  - Redis running in cluster
  - API Gateway deployed (but not properly configured)

### ❌ What's Missing
1. **No email/password auth implementation**
2. **No JWT token generation/validation**
3. **No refresh token logic**
4. **No rate limiting**
5. **No CSRF protection**
6. **No password hashing**
7. **No email verification**
8. **No session management**
9. **Frontend not connected to backend**
10. **No tests**

## 🎯 Today's Implementation Plan (8-10 hours)

### Phase 1: Backend Foundation (3-4 hours)

#### 1.1 Fix and Test Existing GitHub OAuth (1 hour)
```bash
cd /Users/betolbook/Documents/github/NatureQuest/devmentor/infrastructure/services/auth-service

# Install dependencies
npm install

# Add missing dependencies
npm install --save \
  bcrypt \
  jsonwebtoken \
  express-rate-limit \
  helmet \
  cors \
  express-validator \
  @types/bcrypt \
  @types/jsonwebtoken

# Test the server starts
npm run dev
```

#### 1.2 Implement JWT Token Generation (1 hour)
Create `src/services/token.service.ts`:
```typescript
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { redis } from '../redis';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
const JWT_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

export interface TokenPayload {
  userId: string;
  email: string;
  roles: string[];
}

export class TokenService {
  static generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { 
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'devmentor'
    });
  }

  static generateRefreshToken(): string {
    return uuidv4();
  }

  static async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const key = `refresh_token:${refreshToken}`;
    const expires = 7 * 24 * 60 * 60; // 7 days
    await redis.setex(key, expires, userId);
  }

  static async validateRefreshToken(refreshToken: string): Promise<string | null> {
    const key = `refresh_token:${refreshToken}`;
    return await redis.get(key);
  }

  static verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  }

  static async revokeRefreshToken(refreshToken: string): Promise<void> {
    const key = `refresh_token:${refreshToken}`;
    await redis.del(key);
  }
}
```

#### 1.3 Add Email/Password Authentication (1 hour)
Create `src/services/auth.service.ts`:
```typescript
import bcrypt from 'bcrypt';
import { db } from '../database';
import { TokenService, TokenPayload } from './token.service';
import { redis } from '../redis';

const SALT_ROUNDS = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60; // 15 minutes

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export class AuthService {
  static async register(data: RegisterData) {
    // Check if email exists
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [data.email]
    );

    if (existingUser.rows.length > 0) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    // Create user
    const result = await db.query(
      `INSERT INTO users (email, password_hash, name, created_at, email_verified)
       VALUES ($1, $2, $3, NOW(), false)
       RETURNING id, email, name, created_at`,
      [data.email, hashedPassword, data.name]
    );

    const user = result.rows[0];

    // Generate verification token
    const verificationToken = uuidv4();
    await redis.setex(
      `email_verification:${verificationToken}`,
      24 * 60 * 60, // 24 hours
      user.id
    );

    // TODO: Send verification email
    
    return {
      user,
      verificationToken
    };
  }

  static async login(data: LoginData) {
    // Check rate limiting
    const attemptsKey = `login_attempts:${data.email}`;
    const attempts = await redis.get(attemptsKey);
    
    if (attempts && parseInt(attempts) >= MAX_LOGIN_ATTEMPTS) {
      throw new Error('Account locked due to too many failed attempts');
    }

    // Get user
    const result = await db.query(
      'SELECT id, email, password_hash, name, email_verified, roles FROM users WHERE email = $1',
      [data.email]
    );

    if (result.rows.length === 0) {
      await this.incrementLoginAttempts(data.email);
      throw new Error('Invalid credentials');
    }

    const user = result.rows[0];

    // Check password
    const validPassword = await bcrypt.compare(data.password, user.password_hash);
    if (!validPassword) {
      await this.incrementLoginAttempts(data.email);
      throw new Error('Invalid credentials');
    }

    // Clear login attempts
    await redis.del(attemptsKey);

    // Generate tokens
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      roles: user.roles || ['user']
    };

    const accessToken = TokenService.generateAccessToken(payload);
    const refreshToken = TokenService.generateRefreshToken();
    
    await TokenService.storeRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.email_verified
      }
    };
  }

  private static async incrementLoginAttempts(email: string): Promise<void> {
    const key = `login_attempts:${email}`;
    const exists = await redis.exists(key);
    
    if (exists) {
      await redis.incr(key);
    } else {
      await redis.setex(key, LOCKOUT_DURATION, '1');
    }
  }
}
```

#### 1.4 Add Security Middleware (30 minutes)
Create `src/middleware/security.ts`:
```typescript
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';

export const securityMiddleware = [
  helmet(),
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  })
];

export const loginRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: 'Too many login attempts, please try again later'
});

export const generalRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 100, // 100 requests per minute
  message: 'Too many requests, please try again later'
});
```

### Phase 2: Database Setup (1 hour)

#### 2.1 Create Database Schema
Create `src/migrations/001_create_users.sql`:
```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  avatar VARCHAR(500),
  email_verified BOOLEAN DEFAULT false,
  roles TEXT[] DEFAULT ARRAY['user'],
  github_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_github_id (github_id)
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  refresh_token VARCHAR(255) UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_refresh_token (refresh_token),
  INDEX idx_user_id (user_id)
);

-- Login attempts table (for audit)
CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255),
  ip_address INET,
  success BOOLEAN,
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_email_time (email, created_at)
);

-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_token (token)
);
```

### Phase 3: API Routes Implementation (1 hour)

#### 3.1 Update Auth Routes
Update `src/routes/auth.routes.ts`:
```typescript
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthService } from '../services/auth.service';
import { loginRateLimit } from '../middleware/security';
import { authenticate } from '../middleware/authenticate';

const router = Router();

// Validation rules
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[A-Za-z])(?=.*\d)/),
  body('name').trim().isLength({ min: 2, max: 50 })
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

// Register
router.post('/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await AuthService.register(req.body);
    res.status(201).json({
      message: 'Registration successful. Please verify your email.',
      userId: result.user.id
    });
  } catch (error) {
    if (error.message === 'Email already registered') {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', loginRateLimit, loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await AuthService.login(req.body);
    res.json(result);
  } catch (error) {
    if (error.message.includes('locked') || error.message === 'Invalid credentials') {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: 'Login failed' });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token required' });
  }

  try {
    const result = await AuthService.refreshToken(refreshToken);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Logout
router.post('/logout', authenticate, async (req, res) => {
  const { refreshToken } = req.body;
  
  if (refreshToken) {
    await TokenService.revokeRefreshToken(refreshToken);
  }
  
  res.status(204).send();
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
  res.json(req.user);
});

export default router;
```

### Phase 4: Frontend Integration (2 hours)

#### 4.1 Update Frontend Auth Service (1 hour)
Update `frontend/devmentor-ui/src/services/authService.ts`:
```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

class AuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.loadTokens();
  }

  private loadTokens() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
      this.refreshToken = localStorage.getItem('refreshToken');
      
      if (this.accessToken) {
        this.setupRefreshTimer();
        this.configureAxiosInterceptor();
      }
    }
  }

  private saveTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    this.setupRefreshTimer();
    this.configureAxiosInterceptor();
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
  }

  private setupRefreshTimer() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    
    // Refresh token 1 minute before expiry
    this.refreshTimer = setTimeout(() => {
      this.refreshAccessToken();
    }, 14 * 60 * 1000); // 14 minutes
  }

  private configureAxiosInterceptor() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
    
    axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            await this.refreshAccessToken();
            originalRequest.headers['Authorization'] = `Bearer ${this.accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            this.logout();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  async register(email: string, password: string, name: string) {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      email,
      password,
      name
    });
    
    return response.data;
  }

  async login(email: string, password: string, rememberMe = false) {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
      rememberMe
    });
    
    const { accessToken, refreshToken, user } = response.data;
    this.saveTokens(accessToken, refreshToken);
    
    return user;
  }

  async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error('No refresh token');
    }
    
    const response = await axios.post(`${API_URL}/api/auth/refresh`, {
      refreshToken: this.refreshToken
    });
    
    const { accessToken, refreshToken } = response.data;
    this.saveTokens(accessToken, refreshToken);
    
    return accessToken;
  }

  async logout() {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {
        refreshToken: this.refreshToken
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
    }
  }

  async getCurrentUser() {
    const response = await axios.get(`${API_URL}/api/auth/me`);
    return response.data;
  }

  isAuthenticated() {
    return !!this.accessToken;
  }
}

export default new AuthService();
```

#### 4.2 Create Protected Route Component (30 minutes)
Create `frontend/devmentor-ui/src/components/ProtectedRoute.tsx`:
```typescript
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!authService.isAuthenticated()) {
          router.push('/login');
          return;
        }

        // Verify token is valid
        await authService.getCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

### Phase 5: Testing (1 hour)

#### 5.1 Create Integration Tests
Create `auth-service/src/__tests__/auth.test.ts`:
```typescript
import request from 'supertest';
import app from '../index';

describe('Authentication', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Test123!',
          name: 'Test User'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('userId');
    });

    it('should reject duplicate email', async () => {
      // First registration
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'Test123!',
          name: 'Test User'
        });

      // Second registration with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'Test123!',
          name: 'Another User'
        });

      expect(response.status).toBe(409);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Test123!'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword'
        });

      expect(response.status).toBe(401);
    });
  });
});
```

## 📝 Checklist for Day 1

### Morning (4 hours)
- [ ] Set up auth-service development environment
- [ ] Install all dependencies
- [ ] Create database schema
- [ ] Implement JWT token service
- [ ] Implement auth service with email/password
- [ ] Add security middleware
- [ ] Create API routes

### Afternoon (4 hours)
- [ ] Test backend endpoints with Postman/curl
- [ ] Update frontend auth service
- [ ] Create protected route component
- [ ] Wire up login page to backend
- [ ] Test complete auth flow
- [ ] Write integration tests
- [ ] Document API endpoints

### End of Day Success Criteria
- [ ] User can register with email/password
- [ ] User can login and receive JWT
- [ ] Protected routes require authentication
- [ ] Tokens refresh automatically
- [ ] Rate limiting works
- [ ] Basic security implemented
- [ ] Tests pass

## 🚀 Commands to Run

```bash
# Backend setup
cd infrastructure/services/auth-service
npm install
npm run migrate # Run database migrations
npm run dev # Start development server

# Frontend setup
cd frontend/devmentor-ui
npm install
npm run dev # Start Next.js dev server

# Testing
cd infrastructure/services/auth-service
npm test # Run tests

# Check everything works
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test User"}'
```

## 🔥 If Time Permits (Optional)

1. Add email verification flow
2. Add password reset flow
3. Add OAuth providers beyond GitHub
4. Add 2FA support
5. Add audit logging

## 📊 Tomorrow's Focus

Once authentication is working:
1. Repository analysis service
2. Connect to GitHub API
3. Implement AST parsing
4. Create analysis pipeline

---

**Remember**: We're building the FOUNDATION today. Every feature after this depends on having solid authentication.
{% endraw %}
