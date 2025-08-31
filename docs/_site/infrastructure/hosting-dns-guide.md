# 🌐 Hosting & DNS Architecture Guide

## Table of Contents
1. [DNS Fundamentals](#dns-fundamentals)
2. [Our Ecosystem Architecture](#our-ecosystem-architecture)
3. [Hosting Strategy](#hosting-strategy)
4. [Implementation Steps](#implementation-steps)
5. [Cost Analysis](#cost-analysis)

---

## DNS Fundamentals

### What is DNS?
DNS (Domain Name System) is like the internet's phone book. It translates human-readable domain names into IP addresses that computers use.

```
User types: naturequest.dev
DNS returns: 104.21.45.123 (Cloudflare's IP)
Browser connects to: 104.21.45.123
```

### DNS Record Types You Need to Know

| Record Type | Purpose | Example |
|------------|---------|---------|
| **A** | Points domain to IPv4 address | `naturequest.dev → 104.21.45.123` |
| **AAAA** | Points domain to IPv6 address | `naturequest.dev → 2606:4700::6815:2d7b` |
| **CNAME** | Alias one domain to another | `www.naturequest.dev → naturequest.dev` |
| **MX** | Mail server routing | `mail.naturequest.dev → gmail-smtp-in.l.google.com` |
| **TXT** | Text data (verification, SPF) | `"v=spf1 include:_spf.google.com ~all"` |

---

## Our Ecosystem Architecture

### Domain Structure
```
naturequest.dev (Main Domain)
├── www.naturequest.dev          → Portfolio/Landing (CNAME)
├── accounts.naturequest.dev     → Account Dashboard (A Record)
├── api.naturequest.dev          → Central API (A Record)
├── devmentor.naturequest.dev    → DevMentor App (A Record)
├── quizmentor.naturequest.dev   → QuizMentor App (A Record)
├── harvest.naturequest.dev      → Harvest.ai App (A Record)
└── omni.naturequest.dev         → Omni Documentation (CNAME → GitHub Pages)
```

### Visual Architecture
```
                            [Cloudflare DNS]
                                   |
                    ┌──────────────┴──────────────┐
                    |                              |
              [CDN Layer]                    [SSL/Security]
                    |                              |
    ┌───────────────┴───────────────┬──────────────────────────┐
    |               |               |                           |
[Vercel]        [Vercel]       [Vercel/Railway]          [GitHub Pages]
Portfolio      Accounts       QuizMentor/DevMentor         Omni Docs
www.nq.dev    accounts.nq.dev  *.nq.dev                  omni.nq.dev
    |               |               |
    └───────────────┴───────────────┴──────────┐
                                                |
                                         [Supabase Cloud]
                                      Database & Auth API
                                    (NOT a hosting service)
```

---

## Hosting Strategy

### 1. **Vercel** (Primary Platform)
**Why Vercel?**
- Automatic deployments from GitHub
- Edge functions for API routes
- Built-in analytics
- Excellent Next.js support
- Free tier: 100GB bandwidth/month

**What We Host:**
- Portfolio (www.naturequest.dev)
- Account Dashboard (accounts.naturequest.dev)
- DevMentor (devmentor.naturequest.dev)

**Configuration:**
```json
// vercel.json for portfolio
{
  "rewrites": [
    {
      "source": "/api/auth/:path*",
      "destination": "https://api.naturequest.dev/auth/:path*"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://accounts.naturequest.dev"
        }
      ]
    }
  ]
}
```

### 2. **Railway** (Alternative for QuizMentor)
**Why Railway?**
- Docker support
- Database hosting
- Background jobs
- $5/month includes 8GB RAM, 100GB bandwidth

**What We Host:**
- QuizMentor (quizmentor.naturequest.dev)
- Could move here if Vercel limits hit

### 3. **GitHub Pages** (Free for Omni)
**Why GitHub Pages?**
- Free for open source
- Automatic deployments
- Great for documentation

**Configuration:**
```yaml
# .github/workflows/deploy-omni.yml
name: Deploy Omni Documentation
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          cname: omni.naturequest.dev
```

### 4. **Supabase** (Backend & Auth)
**Why Supabase?**
- Postgres database
- Real-time subscriptions
- Built-in auth
- Storage for files
- Free tier: 500MB database, 2GB storage

---

## Implementation Steps

### Step 1: Register Domain
**Option A: Namecheap** (~$10/year for .dev)
```bash
1. Go to namecheap.com
2. Search for "naturequest.dev"
3. Purchase with privacy protection
4. Point nameservers to Cloudflare
```

**Option B: Cloudflare Registrar** (At cost, ~$10/year)
```bash
1. Transfer domain to Cloudflare
2. No markup pricing
3. Automatic Cloudflare integration
```

### Step 2: Configure Cloudflare DNS

```bash
# Main domain
A     @                    76.76.21.21      (Vercel IP)
AAAA  @                    2606:4700::6815  (Vercel IPv6)

# Subdomains
CNAME www                  cname.vercel-dns.com
A     accounts             76.76.21.21
A     devmentor            76.76.21.21
A     quizmentor           192.168.1.1      (Railway IP)
CNAME harvest              cname.vercel-dns.com
CNAME omni                 yourusername.github.io
A     api                  YOUR_SUPABASE_IP

# Email (if using Google Workspace)
MX    @                    1  aspmx.l.google.com
MX    @                    5  alt1.aspmx.l.google.com
TXT   @                    "v=spf1 include:_spf.google.com ~all"
TXT   _dmarc               "v=DMARC1; p=none; rua=mailto:admin@naturequest.dev"
```

### Step 3: SSL/Security Setup

**Cloudflare SSL Settings:**
```
SSL/TLS Mode: Full (Strict)
Always Use HTTPS: On
Automatic HTTPS Rewrites: On
Min TLS Version: 1.2
```

**Security Headers (via Cloudflare Workers):**
```javascript
// security-headers.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  const newHeaders = new Headers(response.headers)
  
  // Security headers
  newHeaders.set('X-Content-Type-Options', 'nosniff')
  newHeaders.set('X-Frame-Options', 'DENY')
  newHeaders.set('X-XSS-Protection', '1; mode=block')
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  newHeaders.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  
  // HSTS
  newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  })
}
```

### Step 4: Deploy Each Product

**Portfolio & Accounts (Vercel):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy portfolio
cd portfolio
vercel --prod

# Link domain in Vercel Dashboard
# accounts.naturequest.dev → portfolio-accounts.vercel.app
```

**QuizMentor (Railway):**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
cd QuizMentor
railway login
railway up

# Link domain in Railway Dashboard
```

**Omni (GitHub Pages):**
```bash
# In Omni repository settings
# Pages → Source: Deploy from branch
# Custom domain: omni.naturequest.dev
# Enforce HTTPS: ✓
```

### Step 5: Configure Cross-Domain Authentication

**Shared Cookie Domain:**
```javascript
// In auth configuration
const cookieOptions = {
  domain: '.naturequest.dev',  // Note the dot - allows all subdomains
  secure: true,
  sameSite: 'lax',
  httpOnly: true,
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
}
```

**CORS Configuration:**
```javascript
// api.naturequest.dev CORS settings
const allowedOrigins = [
  'https://naturequest.dev',
  'https://www.naturequest.dev',
  'https://accounts.naturequest.dev',
  'https://devmentor.naturequest.dev',
  'https://quizmentor.naturequest.dev',
  'https://harvest.naturequest.dev',
  'https://omni.naturequest.dev'
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))
```

---

## Cost Analysis

### Monthly Costs (Starting)
| Service | Free Tier | Paid Tier | Our Usage |
|---------|-----------|-----------|-----------|
| **Domain** | - | $0.83/mo | $0.83 |
| **Cloudflare** | Unlimited | $20/mo Pro | Free |
| **Vercel** | 100GB | $20/mo Pro | Free initially |
| **Railway** | - | $5/mo | $5 (QuizMentor) |
| **Supabase** | 500MB DB | $25/mo | Free initially |
| **GitHub** | Unlimited public | $4/mo Pro | Free (Omni) |
| **Total** | - | - | **$5.83/mo** |

### Scaling Costs (1000+ users)
- Vercel Pro: $20/mo
- Supabase Pro: $25/mo
- Cloudflare Pro: $20/mo
- **Total: ~$70/mo**

### Enterprise (10,000+ users)
- Vercel Enterprise: Custom
- Supabase Scale: $500/mo
- Cloudflare Business: $200/mo
- Railway Scale: $20/mo
- **Total: ~$720/mo+**

---

## Monitoring & Analytics

### 1. **Cloudflare Analytics** (Free)
- Traffic analytics
- Performance metrics
- Security events
- Bot detection

### 2. **Vercel Analytics** ($10/mo)
- Core Web Vitals
- Real user metrics
- Performance insights

### 3. **Uptime Monitoring**
```javascript
// Use UptimeRobot (free for 50 monitors)
const monitors = [
  'https://naturequest.dev',
  'https://accounts.naturequest.dev',
  'https://api.naturequest.dev/health',
  'https://devmentor.naturequest.dev',
  'https://quizmentor.naturequest.dev'
]
```

### 4. **Error Tracking (Sentry)**
```javascript
// sentry.config.js
Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 0.1, // 10% of transactions
})
```

---

## Security Best Practices

### 1. **API Rate Limiting**
```javascript
// Using express-rate-limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
})
```

### 2. **Environment Variables**
```bash
# .env.production
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc... # Never expose this
STRIPE_SECRET_KEY=sk_live_...
CLOUDFLARE_API_TOKEN=...
```

### 3. **Backup Strategy**
- Database: Daily automated backups (Supabase)
- Code: GitHub (version control)
- Assets: Cloudflare R2 or AWS S3
- Configs: Encrypted in 1Password/Bitwarden

---

## Troubleshooting Common Issues

### DNS Not Propagating
```bash
# Check DNS propagation
dig naturequest.dev
nslookup naturequest.dev 8.8.8.8

# Flush DNS cache (Mac)
sudo dscacheutil -flushcache
```

### SSL Certificate Issues
1. Check Cloudflare SSL mode is "Full (Strict)"
2. Wait 24 hours for certificate generation
3. Clear browser cache

### CORS Errors
```javascript
// Debug CORS
console.log('Origin:', request.headers.origin)
console.log('Credentials:', request.credentials)
```

### Subdomain Cookie Issues
```javascript
// Ensure cookie domain starts with dot
document.cookie = "auth=token; domain=.naturequest.dev; secure; samesite=lax"
```

---

## Next Steps Checklist

- [ ] Purchase naturequest.dev domain
- [ ] Set up Cloudflare account
- [ ] Configure DNS records
- [ ] Deploy portfolio to Vercel
- [ ] Deploy accounts dashboard
- [ ] Set up Supabase project
- [ ] Configure authentication
- [ ] Deploy each product
- [ ] Set up monitoring
- [ ] Test cross-domain auth
- [ ] Configure backups
- [ ] Document API endpoints

---

## Questions & Answers

**Q: Why not use a single server for everything?**
A: Microservices architecture allows independent scaling, deployment, and failure isolation. If QuizMentor goes down, DevMentor still works.

**Q: Can I use AWS/GCP instead?**
A: Yes, but it's more complex and expensive for starting. Our stack is optimized for developer experience and cost.

**Q: How do I handle EU users (GDPR)?**
A: Cloudflare has EU points of presence. Supabase can be deployed in EU regions. Add cookie consent banner.

**Q: What about mobile apps?**
A: Same auth system works. Use deep linking: `devmentor://auth?token=xxx`

---

## Resources

- [Vercel Docs](https://vercel.com/docs)
- [Cloudflare Docs](https://developers.cloudflare.com)
- [Supabase Docs](https://supabase.com/docs)
- [Railway Docs](https://docs.railway.app)
- [DNS Checker](https://dnschecker.org)
- [SSL Test](https://www.ssllabs.com/ssltest)
