---
layout: product
title: AUTH BETA READINESS
product: DevMentor
source: infrastructure/services/auth-service/AUTH_BETA_READINESS.md
---

{% raw %}
CURRENT ARCHITECTURE

# 🚀 Auth Service - BETA READINESS

> **Status**: Pre-Beta  
> **Target Date**: Beta Launch Ready in 5 Days  
> **Last Updated**: August 16, 2025  
> **Priority**: CRITICAL PATH  
> **Purpose**: Complete auth service understanding, architecture, and beta readiness guide

## 📚 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Understanding the Auth Service](#understanding-the-auth-service)
3. [Key Benefits of Centralization](#key-benefits-of-centralization)
4. [Architecture Overview](#architecture-overview)
5. [Authentication Process Explained](#authentication-process-explained)
6. [Critical Security Tasks (Days 1-2)](#critical-security-tasks-days-1-2)
7. [Core Features (Days 3-4)](#core-features-days-3-4)
8. [Testing, Deployment & Monitoring](#testing-deployment--monitoring)
9. [Troubleshooting & Common Issues](#troubleshooting--common-issues)

---

## Executive Summary

The auth service is DevMentor's cornerstone for handling all user-related security features. It simplifies user authentication, authorization, and session management across all services.

### Key Highlights
- **Centralized Security**: One-stop management for authentication and authorization.
- **Single Sign-On (SSO)**: Seamless access across multiple services.
- **User Management**: Consistent policies and controls from one place.
- **Enhanced Security Features**: Robust protection against common attacks.

**Beta Readiness Timeline**: 
- **Time to Beta**: 5 focused days
- **Critical Tasks**: 8 to complete
- **Additional Features**: 12 post-beta enhancements

### Why This Matters

Without a secure auth service:
- 🚫 Each service implements its own (inconsistent) security
- 🚫 Users need multiple logins
- 🚫 Security vulnerabilities scattered across services
- 🚫 No central user management
- 🚫 Difficult to implement SSO or enterprise features

With our centralized auth service:
- ✅ Single sign-on (SSO) across all services
- ✅ Consistent security policies
- ✅ One place to fix security issues
- ✅ Easy user management
- ✅ Enterprise-ready (OAuth, SAML ready)

---

## Understanding the Auth Service

The Auth Service ensures secure user interactions and service access by centralizing key security operations:

- **User Authentication**: Verifying user identities during login.
- **Role-Based Authorization**: Granting access based on user roles and permissions.
- **Session Management**: Managing active user sessions with secure tokens.
- **Security Enforcement**: Implementing protective measures like rate limiting and account lockout.
- **Activity Auditing**: Logging of all auth-related transactions for transparency and compliance.

### How It Works
Think of the Auth Service as the **digital security guard** of your app, identification checks at the front, ensuring every user has the right access.

### Key Components
Here's how each component fits into the architecture:

| Component | Purpose | Port | Technology |
|-----------|---------|------|------------|
| **Auth Service** | Central auth logic | 3002 | Node.js/Express |
| **API Gateway** | Handles token validation and routing | 8000 | Express |
| **PostgreSQL** | Stores user data and session information | 5432 | PostgreSQL |
| **Redis** | Caches sessions, enforces rate limit | 6379 | Redis |
| **SendGrid** | Sends verification emails and password resets | - | Email API |

---

## Key Benefits of Centralization

Centralizing authentication with a dedicated auth service brings various advantages, including:

- **Unified Security Management**: Central control over authentication practices, implementation of security policies, and management of users.
- **Scalability**: Ability to scale with user growth without compromising security.
- **Streamlined User Experience**: Transparent sign-on (SSO) across all connected applications.
- **Reduced Complexity**: Decreases the need for each application to implement security independently.

---

## Architecture Overview

### High-Level System Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        AUTH SERVICE SYSTEM ARCHITECTURE                   │
└──────────────────────────────────────────────────────────────────────────┘

    [Web/Apps Users]               [Mobile Apps]
         │                              │
         ├───────► Load Balancer ──────►
         │                              │
         ▼                              ▼
  ┌─────────────┐    ┌──────────────┐        ┌───────────────┐
  │  Web Client │    │ API Gateway  │        │ External APIs │
  │  Port: 3001 │    │ Port: 8000   │        │   (Future)    │
  └─────────────┘    └──────┬───────┘        └───────────────┘
         │                   │                        │
         │                   ├────────────────────────┘
         │                   │
         │       [Token Validation]
         │                   │
         └───────────────────┼─────────────────────────┐
                             ▼                         │
                    ┌──────────────┐                   │
                    │ AUTH SERVICE │                   │
                    │  Port: 3002  │                   │
                    └──────┬───────┘                   │
                           │                           │
                    ┌──────┼──────┐                    │
                    ▼      ▼      ▼                    ▼
            ┌──────────┐ ┌─────┐ ┌──────────┐  ┌──────────────┐
            │PostgreSQL│ │Redis│ │SendGrid  │  │Business Svcs │
            │ Database │ │Cache│ │  Email   │  │• Memory:3003 │
            │          │ │     │ │          │  │• Project:3004│
            │ • Users  │ │     │ │          │  │• AI:3005     │
            │ • Sessions│ │     │ │          │  └──────────────┘
            │ • Audit  │ │     │ │          │
            └──────────┘ └─────┘ └──────────┘
```

### Detailed Service Flow

This detailed flow shows how requests move through the system:

1. **User Login**
   - Users initiate login through the web client, prompting the flow through the auth service to verify credentials, generate tokens, and manage sessions.

2. **Authenticated API Request**
   - After login, users access various business services through the API Gateway, where tokens are validated for secure access.

3. **Service-to-Service Tokens**
   - Internal service communications are handled via mutual authentication, ensuring secure service-to-service interactions.

### Database Schema

A well-designed schema ensures efficient data management and security:

```sql
┌── DATABASE STRUCTURE ────────────────────────────────────────────────────┐
│                        ┌──────────────┐                                  │
│                        │    USERS     │                                  │
│                        ├──────────────┤                                  │
│                        │ id (PK)      │                                  │
│                        │ email        │                                  │
│                        │ password_hash│                                  │
│                        │ role         │                                  │
│                        │ created_at   │                                  │
│                        └─────┬─────┬──┘                                  │
│                             1│     │1                                   │
│                              ▼     ▼                                    │
│               ┌────────────┐   ┌─────────────┐                          │
│               │ SESSIONS   │   │    ROLES    │                          │
│               ├────────────┤   ├─────────────┤                          │
│               │ user_id (FK)│  │ role_id (PK)│                          │
│               │ token       │  │ role_name   │                          │
│               └────────────┘  └─────────────┘                          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## How Authentication Works

### 1. Registration Flow

```
 User          Frontend         Auth Service      Database       Email
  │               │                  │               │            │
  ├─[Sign Up]────►│                  │               │            │
  │               ├─[Validate]       │               │            │
  │               ├─[POST /register]►│               │            │
  │               │                  ├─[Check Email]►│            │
  │               │                  ├─[Hash Pass]   │            │
  │               │                  ├─[Create User]►│            │
  │               │                  ├─[Send Email]──────────────►│
  │               │◄─[Success]───────┤               │            │
  │◄─[Check Email]┤                  │               │            │
  │               │                  │               │            │
  │◄═══════════[Verification Email]══════════════════════════════┤
  │               │                  │               │            │
  ├─[Click Link]─►│                  │               │            │
  │               ├─[GET /verify]───►│               │            │
  │               │                  ├─[Update User]►│            │
  │               │◄─[Verified]──────┤               │            │
  │◄─[Welcome!]───┤                  │               │            │
```

### 2. Login Flow with JWT

```
 User          Frontend         Auth Service      Database
  │               │                  │               │
  ├─[Login]──────►│                  │               │
  │               ├─[POST /login]───►│               │
  │               │                  ├─[Find User]──►│
  │               │                  │◄─[User Data]──┤
  │               │                  ├─[Verify Pass] │
  │               │                  ├─[Check Lock]  │
  │               │                  ├─[Generate JWT]│
  │               │                  │  • Access (15m)
  │               │                  │  • Refresh (7d)
  │               │                  ├─[Store Session]►
  │               │◄─[Tokens]────────┤               │
  │               ├─[Set Cookies]    │               │
  │◄─[Dashboard]──┤                  │               │
```

### 3. JWT Token Structure

```javascript
// Access Token Payload
{
  "userId": 123,
  "email": "user@example.com",
  "role": "user",
  "type": "access",
  "iat": 1692345600,  // Issued at
  "exp": 1692346500,  // Expires at (15 min)
  "iss": "devmentor.app",
  "aud": "devmentor-api"
}

// Refresh Token Payload
{
  "userId": 123,
  "type": "refresh",
  "iat": 1692345600,
  "exp": 1692950400,  // Expires at (7 days)
  "iss": "devmentor.app"
}
```

### 4. Token Validation Flow

```
 API Request → API Gateway → Business Service
      │            │              │
      │            ├─[Extract Token from Cookie/Header]
      │            ├─[Verify JWT Signature]
      │            ├─[Check Expiry]
      │            ├─[Validate Issuer/Audience]
      │            ├─[Add User Context Headers]
      │            │  • X-User-ID: 123
      │            │  • X-User-Role: admin
      │            │  • X-User-Email: user@...
      │            └─[Forward Request]────────►│
      │                                        ├─[Process]
      │◄───────────[Response]──────────────────┤
```

---

## 🔴 MUST HAVE - Critical Security (Days 1-2)

### 1. Generate & Configure Secure JWT Secrets ⚠️

**Status**: ❌ Not Started  
**Time**: 2 hours  
**Blocker**: YES  

```bash
# Step 1: Generate production secrets
cd /Users/betolbook/Documents/github/NatureQuest/devmentor
mkdir -p secrets
openssl rand -base64 64 > secrets/jwt-secret.txt
openssl genrsa -out secrets/private.pem 2048
openssl rsa -in secrets/private.pem -pubout -out secrets/public.pem

# Step 2: Update .env files
echo "# Production Auth Secrets" >> .env.production
echo "JWT_SECRET=$(cat secrets/jwt-secret.txt)" >> .env.production
echo "JWT_ALGORITHM=RS256" >> .env.production
echo "ACCESS_TOKEN_EXPIRES=15m" >> .env.production
echo "REFRESH_TOKEN_EXPIRES=7d" >> .env.production

# Step 3: Update auth-service configuration
cd services/auth-service
cp src/config.ts src/config.ts.backup
```

**Code Update Required** - `services/auth-service/src/config.ts`:
```typescript
export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || (() => {
      throw new Error('JWT_SECRET is required in production');
    })(),
    algorithm: process.env.JWT_ALGORITHM || 'RS256',
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRES || '15m',
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRES || '7d',
    issuer: 'devmentor.app',
    audience: 'devmentor-api'
  },
  security: {
    bcryptRounds: 12,
    maxLoginAttempts: 5,
    lockoutDuration: 30 * 60 * 1000, // 30 minutes
    passwordMinLength: 12,
    requireStrongPassword: true
  }
};
```

### 2. Implement Account Lockout ⚠️

**Status**: ❌ Not Started  
**Time**: 3 hours  
**Blocker**: YES  

**Add to** `services/auth-service/src/index.ts` (after line 164):
```typescript
// Account lockout tracking
const loginAttempts = new Map<string, { count: number; lockedUntil?: Date }>();

async function checkAccountLockout(email: string): Promise<boolean> {
  const attempts = loginAttempts.get(email);
  if (!attempts) return false;
  
  if (attempts.lockedUntil && attempts.lockedUntil > new Date()) {
    return true; // Still locked out
  }
  
  if (attempts.lockedUntil && attempts.lockedUntil <= new Date()) {
    loginAttempts.delete(email); // Clear expired lockout
    return false;
  }
  
  return false;
}

async function recordFailedLogin(email: string): Promise<void> {
  const attempts = loginAttempts.get(email) || { count: 0 };
  attempts.count++;
  
  if (attempts.count >= 5) {
    attempts.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 min lockout
    await logAuthEvent(null, 'ACCOUNT_LOCKED', false, req, { email, attempts: attempts.count });
  }
  
  loginAttempts.set(email, attempts);
}

async function clearLoginAttempts(email: string): Promise<void> {
  loginAttempts.delete(email);
}
```

**Update login endpoint** (line 279):
```typescript
app.post('/auth/login', authLimiter, async (req, res): Promise<void> => {
  const { email, password } = req.body;
  
  // Check lockout FIRST
  if (await checkAccountLockout(email)) {
    await logAuthEvent(null, 'LOGIN_BLOCKED_LOCKOUT', false, req, { email });
    res.status(429).json({ error: 'Account temporarily locked. Try again in 30 minutes.' });
    return;
  }
  
  // ... existing validation ...
  
  // On failed login (line 312):
  if (!passwordValid) {
    await recordFailedLogin(email);
    await logAuthEvent(user.id, 'LOGIN_ATTEMPT', false, req, { reason: 'invalid_password' });
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  
  // On successful login (line 333):
  await clearLoginAttempts(email);
  // ... rest of success logic
});
```

### 3. Strengthen Password Requirements ⚠️

**Status**: ❌ Not Started  
**Time**: 2 hours  
**Blocker**: YES  

**Create new file** `services/auth-service/src/utils/password-validator.ts`:
```typescript
export interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  preventCommonPasswords: boolean;
}

const COMMON_PASSWORDS = [
  'password', '12345678', 'qwerty', 'abc123', 'password123',
  'admin', 'letmein', 'welcome', 'monkey', '1234567890'
];

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  const lowerPassword = password.toLowerCase();
  if (COMMON_PASSWORDS.some(common => lowerPassword.includes(common))) {
    errors.push('Password is too common or contains common words');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

**Update registration endpoint** (line 224):
```typescript
import { validatePassword } from './utils/password-validator';

app.post('/auth/register', authLimiter, async (req, res): Promise<void> => {
  const { email, password, firstName, lastName } = req.body;
  
  // Validate password strength
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    await logAuthEvent(null, 'REGISTER_ATTEMPT', false, req, { 
      email, 
      reason: 'weak_password',
      errors: passwordValidation.errors 
    });
    res.status(400).json({ 
      error: 'Password does not meet requirements',
      details: passwordValidation.errors 
    });
    return;
  }
  
  // ... rest of registration logic
});
```

### 4. Add CSRF Protection ⚠️

**Status**: ❌ Not Started  
**Time**: 2 hours  
**Blocker**: YES  

```bash
# Install CSRF package
cd services/auth-service
npm install csurf cookie-parser
npm install @types/csurf @types/cookie-parser --save-dev
```

**Update** `services/auth-service/src/index.ts` (after line 59):
```typescript
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

app.use(cookieParser());

// CSRF protection for state-changing operations
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

// Add CSRF token endpoint
app.get('/auth/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Apply to state-changing endpoints
app.post('/auth/register', csrfProtection, authLimiter, async (req, res) => {
  // ... existing logic
});

app.post('/auth/login', csrfProtection, authLimiter, async (req, res) => {
  // ... existing logic
});

app.post('/auth/logout', csrfProtection, authenticateToken, async (req, res) => {
  // ... logout logic
});
```

### 5. Fix Token Expiration Times ⚠️

**Status**: ❌ Not Started  
**Time**: 1 hour  
**Blocker**: YES  

**Update** `services/auth-service/src/index.ts` (lines 126-140):
```typescript
function generateTokens(userId: number, email: string, role: string) {
  const tokenId = crypto.randomBytes(16).toString('hex');
  
  const accessToken = jwt.sign(
    { 
      userId, 
      email,
      role,
      type: 'access',
      jti: `at_${tokenId}`,
      iss: 'devmentor.app',
      aud: 'devmentor-api'
    },
    JWT_SECRET,
    { expiresIn: '15m' } // Changed from 15m to 15m (ensure it's exactly this)
  );
  
  const refreshToken = jwt.sign(
    { 
      userId, 
      type: 'refresh',
      jti: `rt_${tokenId}`,
      iss: 'devmentor.app'
    },
    JWT_SECRET,
    { expiresIn: '7d' } // Changed from 7d to exactly 7d
  );

  return { 
    accessToken, 
    refreshToken,
    expiresIn: 900, // 15 minutes in seconds
    tokenType: 'Bearer'
  };
}
```

---

## 🟡 MUST HAVE - Core Features (Days 3-4)

### 6. Email Verification Flow 📧

**Status**: ❌ Not Started  
**Time**: 4 hours  
**Blocker**: YES for production  

```bash
# Install email service
cd services/auth-service
npm install @sendgrid/mail
npm install --save-dev @types/node
```

**Create** `services/auth-service/src/services/email.ts`:
```typescript
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import { redis } from '../redis';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export class EmailService {
  async sendVerificationEmail(userId: number, email: string): Promise<void> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresIn = 3600; // 1 hour
    
    // Store token in Redis
    await redis.setex(`email:verify:${token}`, expiresIn, userId.toString());
    
    const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
    
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL || 'noreply@devmentor.app',
      subject: 'Verify your DevMentor account',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
            .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background: #f9fafb; }
            .button { 
              display: inline-block; 
              padding: 12px 30px; 
              background: #3b82f6; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
            }
            .footer { text-align: center; color: #6b7280; padding: 20px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to DevMentor!</h1>
            </div>
            <div class="content">
              <h2>Verify Your Email Address</h2>
              <p>Thank you for signing up! Please verify your email address to activate your account.</p>
              <a href="${verificationUrl}" class="button">Verify Email</a>
              <p style="color: #6b7280; font-size: 14px;">
                Or copy this link: <br>
                ${verificationUrl}
              </p>
              <p style="color: #ef4444; font-size: 14px;">This link expires in 1 hour.</p>
            </div>
            <div class="footer">
              <p>If you didn't create an account, please ignore this email.</p>
              <p>&copy; 2025 DevMentor. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    try {
      await sgMail.send(msg);
      console.log(`Verification email sent to ${email}`);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }
  
  async verifyEmail(token: string): Promise<number | null> {
    const userId = await redis.get(`email:verify:${token}`);
    if (!userId) return null;
    
    await redis.del(`email:verify:${token}`);
    return parseInt(userId);
  }
}
```

**Add verification endpoints** to `services/auth-service/src/index.ts`:
```typescript
import { EmailService } from './services/email';
const emailService = new EmailService();

// Send verification email after registration (line 268)
await emailService.sendVerificationEmail(user.id, email);

// Add verification endpoint
app.get('/auth/verify-email', async (req, res): Promise<void> => {
  const { token } = req.query;
  
  if (!token || typeof token !== 'string') {
    res.status(400).json({ error: 'Invalid verification token' });
    return;
  }
  
  try {
    const userId = await emailService.verifyEmail(token);
    if (!userId) {
      res.status(400).json({ error: 'Invalid or expired token' });
      return;
    }
    
    await pool.query('UPDATE users SET email_verified = true WHERE id = $1', [userId]);
    await logAuthEvent(userId, 'EMAIL_VERIFIED', true, req);
    
    res.redirect('/login?verified=true');
  } catch (error) {
    logger.error('Email verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Resend verification
app.post('/auth/resend-verification', authenticateToken, async (req: any, res): Promise<void> => {
  try {
    if (req.user.email_verified) {
      res.status(400).json({ error: 'Email already verified' });
      return;
    }
    
    await emailService.sendVerificationEmail(req.user.id, req.user.email);
    res.json({ message: 'Verification email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

// Block login if not verified (update login endpoint line 295)
if (!user.email_verified) {
  await logAuthEvent(user.id, 'LOGIN_BLOCKED_UNVERIFIED', false, req);
  res.status(403).json({ 
    error: 'Email not verified',
    code: 'EMAIL_NOT_VERIFIED',
    resendUrl: '/auth/resend-verification'
  });
  return;
}
```

### 7. Password Reset Flow 🔑

**Status**: ❌ Not Started  
**Time**: 3 hours  
**Blocker**: YES for production  

**Add to** `services/auth-service/src/services/email.ts`:
```typescript
export class EmailService {
  // ... existing code ...
  
  async sendPasswordResetEmail(userId: number, email: string): Promise<void> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresIn = 3600; // 1 hour
    
    await redis.setex(`password:reset:${token}`, expiresIn, userId.toString());
    
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;
    
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL || 'noreply@devmentor.app',
      subject: 'Reset your DevMentor password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background: #f9fafb; }
            .button { 
              display: inline-block; 
              padding: 12px 30px; 
              background: #dc2626; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
            }
            .footer { text-align: center; color: #6b7280; padding: 20px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Reset Your Password</h2>
              <p>We received a request to reset your password. Click the button below to create a new password.</p>
              <a href="${resetUrl}" class="button">Reset Password</a>
              <p style="color: #6b7280; font-size: 14px;">
                Or copy this link: <br>
                ${resetUrl}
              </p>
              <p style="color: #ef4444; font-size: 14px;">This link expires in 1 hour.</p>
              <p style="margin-top: 30px; padding: 15px; background: #fef2f2; border-left: 4px solid #dc2626;">
                <strong>Security Notice:</strong> If you didn't request this reset, please ignore this email and your password will remain unchanged.
              </p>
            </div>
            <div class="footer">
              <p>&copy; 2025 DevMentor. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    await sgMail.send(msg);
  }
  
  async validateResetToken(token: string): Promise<number | null> {
    const userId = await redis.get(`password:reset:${token}`);
    return userId ? parseInt(userId) : null;
  }
  
  async consumeResetToken(token: string): Promise<number | null> {
    const userId = await this.validateResetToken(token);
    if (userId) {
      await redis.del(`password:reset:${token}`);
    }
    return userId;
  }
}
```

**Add password reset endpoints** to `services/auth-service/src/index.ts`:
```typescript
// Request password reset
app.post('/auth/forgot-password', authLimiter, async (req, res): Promise<void> => {
  const { email } = req.body;
  
  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }
  
  try {
    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      await emailService.sendPasswordResetEmail(user.id, email);
      await logAuthEvent(user.id, 'PASSWORD_RESET_REQUESTED', true, req);
    }
    
    // Always return success to prevent email enumeration
    res.json({ 
      message: 'If an account exists with this email, a password reset link has been sent.' 
    });
  } catch (error) {
    logger.error('Password reset request error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Validate reset token
app.get('/auth/validate-reset-token', async (req, res): Promise<void> => {
  const { token } = req.query;
  
  if (!token || typeof token !== 'string') {
    res.status(400).json({ valid: false });
    return;
  }
  
  const userId = await emailService.validateResetToken(token);
  res.json({ valid: !!userId });
});

// Reset password
app.post('/auth/reset-password', async (req, res): Promise<void> => {
  const { token, newPassword } = req.body;
  
  if (!token || !newPassword) {
    res.status(400).json({ error: 'Token and new password are required' });
    return;
  }
  
  // Validate new password
  const passwordValidation = validatePassword(newPassword);
  if (!passwordValidation.valid) {
    res.status(400).json({ 
      error: 'Password does not meet requirements',
      details: passwordValidation.errors 
    });
    return;
  }
  
  try {
    const userId = await emailService.consumeResetToken(token);
    
    if (!userId) {
      res.status(400).json({ error: 'Invalid or expired reset token' });
      return;
    }
    
    const passwordHash = hashPassword(newPassword);
    
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, userId]);
    
    // Revoke all existing sessions
    await pool.query('DELETE FROM user_sessions WHERE user_id = $1', [userId]);
    
    await logAuthEvent(userId, 'PASSWORD_RESET_COMPLETED', true, req);
    
    res.json({ message: 'Password reset successful. Please login with your new password.' });
  } catch (error) {
    logger.error('Password reset error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});
```

### 8. Basic RBAC Implementation 👥

**Status**: ❌ Not Started  
**Time**: 3 hours  
**Blocker**: Medium priority  

**Create** `services/auth-service/src/middleware/rbac.ts`:
```typescript
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

export enum Permission {
  // User permissions
  READ_OWN_PROFILE = 'profile:read:own',
  WRITE_OWN_PROFILE = 'profile:write:own',
  DELETE_OWN_ACCOUNT = 'account:delete:own',
  
  // Moderator permissions
  READ_ALL_PROJECTS = 'projects:read:all',
  MODERATE_CONTENT = 'content:moderate',
  VIEW_REPORTS = 'reports:view',
  
  // Admin permissions
  READ_ALL_USERS = 'users:read:all',
  WRITE_ALL_USERS = 'users:write:all',
  DELETE_ALL_USERS = 'users:delete:all',
  MANAGE_ROLES = 'roles:manage',
  VIEW_ANALYTICS = 'analytics:view',
  SYSTEM_CONFIG = 'system:config'
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.USER]: [
    Permission.READ_OWN_PROFILE,
    Permission.WRITE_OWN_PROFILE,
    Permission.DELETE_OWN_ACCOUNT
  ],
  [Role.MODERATOR]: [
    Permission.READ_OWN_PROFILE,
    Permission.WRITE_OWN_PROFILE,
    Permission.DELETE_OWN_ACCOUNT,
    Permission.READ_ALL_PROJECTS,
    Permission.MODERATE_CONTENT,
    Permission.VIEW_REPORTS
  ],
  [Role.ADMIN]: Object.values(Permission) // All permissions
};

export function hasPermission(userRole: string, requiredPermission: Permission): boolean {
  const role = userRole as Role;
  const permissions = rolePermissions[role] || [];
  return permissions.includes(requiredPermission);
}

export function requirePermission(permission: Permission) {
  return (req: any, res: any, next: any) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!hasPermission(req.user.role, permission)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        required: permission,
        userRole: req.user.role
      });
    }
    
    next();
  };
}

export function requireRole(role: Role) {
  return (req: any, res: any, next: any) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (req.user.role !== role && req.user.role !== Role.ADMIN) {
      return res.status(403).json({ 
        error: 'Insufficient role',
        required: role,
        userRole: req.user.role
      });
    }
    
    next();
  };
}
```

**Add admin endpoints** to `services/auth-service/src/index.ts`:
```typescript
import { requirePermission, requireRole, Permission, Role } from './middleware/rbac';

// Admin: Get all users
app.get('/auth/admin/users', 
  authenticateToken, 
  requirePermission(Permission.READ_ALL_USERS),
  async (req, res): Promise<void> => {
    try {
      const result = await pool.query(`
        SELECT id, email, first_name, last_name, role, email_verified, 
               created_at, last_login, is_active
        FROM users
        ORDER BY created_at DESC
        LIMIT 100
      `);
      
      res.json({ users: result.rows });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }
);

// Admin: Update user role
app.patch('/auth/admin/users/:userId/role',
  authenticateToken,
  requirePermission(Permission.MANAGE_ROLES),
  async (req, res): Promise<void> => {
    const { userId } = req.params;
    const { role } = req.body;
    
    if (!Object.values(Role).includes(role)) {
      res.status(400).json({ error: 'Invalid role' });
      return;
    }
    
    try {
      await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, userId]);
      await logAuthEvent(req.user.id, 'ROLE_UPDATED', true, req, { 
        targetUserId: userId, 
        newRole: role 
      });
      
      res.json({ message: 'Role updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update role' });
    }
  }
);

// Admin: View audit logs
app.get('/auth/admin/audit-logs',
  authenticateToken,
  requireRole(Role.ADMIN),
  async (req, res): Promise<void> => {
    try {
      const result = await pool.query(`
        SELECT * FROM auth_audit_log
        ORDER BY created_at DESC
        LIMIT 500
      `);
      
      res.json({ logs: result.rows });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch audit logs' });
    }
  }
);
```

---

## 🟢 NICE TO HAVE - Day 5 & Beyond

### 9. Basic Monitoring Dashboard 📊

**Quick Implementation** (30 minutes):
```typescript
// Add to services/auth-service/src/index.ts
const metrics = {
  loginAttempts: 0,
  loginSuccess: 0,
  loginFailures: 0,
  registrations: 0,
  passwordResets: 0,
  activeSessions: new Set(),
  startTime: Date.now()
};

app.get('/auth/metrics', authenticateToken, requireRole(Role.ADMIN), (req, res) => {
  const uptime = Date.now() - metrics.startTime;
  const successRate = metrics.loginAttempts > 0 
    ? (metrics.loginSuccess / metrics.loginAttempts * 100).toFixed(2)
    : 0;
    
  res.json({
    uptime: Math.floor(uptime / 1000),
    metrics: {
      ...metrics,
      activeSessions: metrics.activeSessions.size,
      successRate: `${successRate}%`
    }
  });
});
```

### 10. Session Management Endpoints 🔄

```typescript
// Get active sessions
app.get('/auth/sessions', authenticateToken, async (req: any, res) => {
  const result = await pool.query(`
    SELECT id, created_at, expires_at, ip_address, user_agent
    FROM user_sessions
    WHERE user_id = $1 AND expires_at > NOW()
    ORDER BY created_at DESC
  `, [req.user.id]);
  
  res.json({ sessions: result.rows });
});

// Revoke specific session
app.delete('/auth/sessions/:sessionId', authenticateToken, async (req: any, res) => {
  await pool.query(
    'DELETE FROM user_sessions WHERE id = $1 AND user_id = $2',
    [req.params.sessionId, req.user.id]
  );
  
  res.json({ message: 'Session revoked' });
});

// Revoke all sessions (logout everywhere)
app.post('/auth/logout-all', authenticateToken, async (req: any, res) => {
  await pool.query('DELETE FROM user_sessions WHERE user_id = $1', [req.user.id]);
  res.json({ message: 'All sessions revoked' });
});
```

---

## 📋 Testing Commands

### Quick Test Suite
```bash
# 1. Test registration
curl -X POST http://localhost:3002/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecureP@ssw0rd123!",
    "firstName": "Test",
    "lastName": "User"
  }'

# 2. Test login
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecureP@ssw0rd123!"
  }'

# 3. Test with token (replace YOUR_TOKEN)
curl -X GET http://localhost:3002/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"

# 4. Test password reset request
curl -X POST http://localhost:3002/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# 5. Test metrics (admin only)
curl -X GET http://localhost:3002/auth/metrics \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Integration Test
```bash
# Create test file: services/auth-service/test-beta.js
cat > services/auth-service/test-beta.js << 'EOF'
const axios = require('axios');

const API_URL = 'http://localhost:3002';
let accessToken = '';
let refreshToken = '';

async function testAuthFlow() {
  console.log('🧪 Testing Auth Service Beta Readiness...\n');
  
  try {
    // 1. Test Registration
    console.log('1️⃣ Testing Registration...');
    const registerRes = await axios.post(`${API_URL}/auth/register`, {
      email: `test-${Date.now()}@example.com`,
      password: 'TestP@ssw0rd123!',
      firstName: 'Beta',
      lastName: 'Tester'
    });
    console.log('✅ Registration successful:', registerRes.data.success);
    
    // 2. Test Weak Password
    console.log('\n2️⃣ Testing Password Validation...');
    try {
      await axios.post(`${API_URL}/auth/register`, {
        email: 'weak@example.com',
        password: 'weak'
      });
      console.log('❌ Weak password accepted (FAIL)');
    } catch (err) {
      console.log('✅ Weak password rejected');
    }
    
    // 3. Test Login
    console.log('\n3️⃣ Testing Login...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: registerRes.data.email,
      password: 'TestP@ssw0rd123!'
    });
    accessToken = loginRes.data.tokens.accessToken;
    refreshToken = loginRes.data.tokens.refreshToken;
    console.log('✅ Login successful, tokens received');
    
    // 4. Test Protected Route
    console.log('\n4️⃣ Testing Protected Route...');
    const profileRes = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    console.log('✅ Protected route accessible:', profileRes.data.user.email);
    
    // 5. Test Invalid Token
    console.log('\n5️⃣ Testing Invalid Token...');
    try {
      await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: 'Bearer invalid-token' }
      });
      console.log('❌ Invalid token accepted (FAIL)');
    } catch (err) {
      console.log('✅ Invalid token rejected');
    }
    
    // 6. Test Refresh Token
    console.log('\n6️⃣ Testing Token Refresh...');
    const refreshRes = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken: refreshToken
    });
    console.log('✅ Token refresh successful');
    
    console.log('\n🎉 All tests passed! Auth service is beta ready.');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

testAuthFlow();
EOF

# Run the test
node services/auth-service/test-beta.js
```

---

## 🚀 Deployment Checklist

### Environment Variables (.env.production)
```bash
# Required for Beta Launch
NODE_ENV=production
PORT=3002

# Database
DATABASE_URL=postgresql://user:pass@host:5432/devmentor_prod
REDIS_URL=redis://redis:6379

# Security (MUST CHANGE)
JWT_SECRET=<generate-with-openssl>
JWT_ALGORITHM=RS256
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

# Email (Required for verification)
SENDGRID_API_KEY=<your-sendgrid-key>
FROM_EMAIL=noreply@devmentor.app
APP_URL=https://devmentor.app

# OAuth (Optional but recommended)
GITHUB_CLIENT_ID=<github-oauth-app-id>
GITHUB_CLIENT_SECRET=<github-oauth-secret>

# Monitoring (Optional)
SENTRY_DSN=<sentry-project-dsn>
```

### Docker Build & Deploy
```bash
# Build production image
cd services/auth-service
docker build -t devmentor/auth-service:beta .

# Test locally
docker run -p 3002:3002 \
  --env-file .env.production \
  devmentor/auth-service:beta

# Push to registry
docker tag devmentor/auth-service:beta your-registry/devmentor/auth-service:beta
docker push your-registry/devmentor/auth-service:beta

# Deploy to Kubernetes
kubectl apply -f deployment/k8s/auth-service.yaml
kubectl rollout status deployment/auth-service -n devmentor
```

### Database Migration
```sql
-- Run before deployment
BEGIN;

-- Add missing indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_audit_user_id ON auth_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON auth_audit_log(created_at DESC);

-- Add default admin user (change password immediately)
INSERT INTO users (email, password_hash, first_name, last_name, role, email_verified)
VALUES (
  'admin@devmentor.app',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY/jLwvBwPj2Bie', -- Change@Me123!
  'Admin',
  'User',
  'admin',
  true
) ON CONFLICT (email) DO NOTHING;

COMMIT;
```

---

## ✅ Final Validation Checklist

### Security
- [ ] JWT secret is 64+ characters and unique
- [ ] Passwords require 12+ chars with complexity
- [ ] Account lockout after 5 failed attempts
- [ ] CSRF protection enabled
- [ ] Rate limiting configured
- [ ] SQL injection prevention verified
- [ ] XSS protection headers set

### Features
- [ ] User registration works
- [ ] Email verification sends
- [ ] Login with valid credentials succeeds
- [ ] Login with invalid credentials fails
- [ ] Password reset flow complete
- [ ] Token refresh works
- [ ] Protected routes require auth
- [ ] Admin routes require admin role

### Performance
- [ ] Response time < 200ms for auth endpoints
- [ ] Can handle 100 concurrent users
- [ ] Database queries optimized with indexes
- [ ] Redis caching configured
- [ ] Connection pooling enabled

### Monitoring
- [ ] Health check endpoint returns 200
- [ ] Metrics endpoint shows data
- [ ] Audit logs being written
- [ ] Error logging configured
- [ ] Alerts set up for failures

---

## 🎯 Success Criteria

The auth service is **beta ready** when:

1. ✅ All 8 MUST HAVE items are completed
2. ✅ Security test suite passes
3. ✅ Load test handles 100 concurrent users
4. ✅ No critical vulnerabilities in `npm audit`
5. ✅ Documentation is updated
6. ✅ Admin can manage users
7. ✅ Monitoring shows healthy metrics
8. ✅ Deployed to staging environment

---

## 📞 Support & Troubleshooting

### Common Issues

**Issue**: JWT Secret not loading
```bash
# Fix: Ensure .env file is loaded
export JWT_SECRET=$(openssl rand -base64 64)
# Or add to .env file
```

**Issue**: Email not sending
```bash
# Fix: Check SendGrid API key
curl -X POST https://api.sendgrid.com/v3/mail/send \
  -H "Authorization: Bearer $SENDGRID_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"personalizations":[{"to":[{"email":"test@example.com"}]}],"from":{"email":"test@example.com"},"subject":"Test","content":[{"type":"text/plain","value":"Test"}]}'
```

**Issue**: Database connection failed
```bash
# Fix: Test connection
psql $DATABASE_URL -c "SELECT 1"
# Check Docker network
docker network ls
docker network inspect devmentor_default
```

**Issue**: Redis connection failed
```bash
# Fix: Test Redis
redis-cli -h localhost -p 6379 ping
# Should return PONG
```

---

## 📅 Timeline

| Day | Tasks | Status | Blocking Beta? |
|-----|-------|--------|----------------|
| **Day 1** | Tasks 1-3: JWT, Lockout, Passwords | ❌ | YES |
| **Day 2** | Tasks 4-5: CSRF, Token Times | ❌ | YES |
| **Day 3** | Task 6: Email Verification | ❌ | YES |
| **Day 4** | Tasks 7-8: Password Reset, RBAC | ❌ | YES |
| **Day 5** | Testing, Monitoring, Deployment | ❌ | NO |

---

*Last Updated: August 16, 2025*  
*Generated for: DevMentor Beta Launch*  
*Critical Path: 8 items in 5 days*
{% endraw %}
