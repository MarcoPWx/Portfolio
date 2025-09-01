# Portfolio Deployment Guide

## Recent Updates (January 2025)

### Changes Made
1. **Removed Recent Articles section** - Simplified the Content section
2. **Updated book title** to "The Context Engineer"
3. **Removed PixelQuest logo square** - Simplified navigation branding
4. **Consolidated Book & Blog sections** into a single "Content" section
5. **Updated project statuses** - All projects now show "Alpha" status
6. **Removed Security badges** - Simplified project cards

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## Deployment to Vercel

### Prerequisites
- Vercel account (create at vercel.com)
- Vercel CLI installed (`npm install -g vercel`)

### Deploy Steps

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy to preview**
   ```bash
   vercel
   ```
   Follow the prompts:
   - Select your scope/team
   - Link to existing project or create new
   - Select project directory (current)
   - Override settings if needed

3. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Environment Variables
No environment variables are required for the basic portfolio deployment.

### Custom Domain
After deployment, you can add a custom domain in the Vercel dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## GitHub Actions CI/CD

The project includes GitHub Actions for automated testing and deployment:
- Tests run on every push
- Automatic deployment to Vercel on main branch

## Build Configuration

The `vercel.json` file configures:
- Framework: Next.js
- Build command: `npm run build`
- Install command: `npm ci`
- Output directory: `.next`

## Troubleshooting

### Build Failures
- Ensure all dependencies are installed: `npm ci`
- Check for TypeScript errors: `npm run type-check`
- Verify build locally: `npm run build`

### Test Failures
- Some tests may need updating after UI changes
- Run tests locally: `npm run test`
- Skip failing tests temporarily: `npm run test -- --passWithNoTests`

## Performance Optimization

The portfolio is optimized for:
- Fast initial load with code splitting
- Lazy loading of heavy components (skills section)
- Optimized images with Next.js Image component
- Minimal JavaScript bundle size

## Monitoring

After deployment, monitor your app:
- Vercel Analytics (built-in)
- Web Vitals tracking
- Error tracking with Vercel Functions logs
