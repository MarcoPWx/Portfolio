---
layout: product
title: DEPLOYMENT GUIDE
product: QuizMentor
source: DEPLOYMENT_GUIDE.md
---

{% raw %}
# QuizMentor Deployment Guide

## Prerequisites

### Required Accounts
- [ ] Apple Developer Account ($99/year)
- [ ] Google Play Developer Account ($25 one-time)
- [ ] Expo Account (free)
- [ ] Supabase Account
- [ ] GitHub Account

### Required Tools
```bash
# Install EAS CLI globally
npm install -g eas-cli

# Install Expo CLI
npm install -g expo

# Login to Expo
expo login
eas login

# Link project to EAS
eas init --id your-project-id
```

## Environment Setup

### 1. Configure Environment Variables

Create `.env.production`:
```env
EXPO_PUBLIC_ENV=production
EXPO_PUBLIC_SUPABASE_URL=https://your-prod.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
EXPO_PUBLIC_API_URL=https://api.quizmentor.app
```

### 2. Update app.json
- Set proper bundle identifiers
- Update version numbers
- Configure app icons and splash screens

## iOS Deployment

### Step 1: Apple Developer Setup

1. **Create App ID**
   - Sign in to [Apple Developer](https://developer.apple.com)
   - Certificates, Identifiers & Profiles → Identifiers
   - Create new App ID with bundle ID: `com.quizmentor.app`
   - Enable capabilities:
     - Push Notifications
     - Sign In with Apple
     - Associated Domains

2. **Create App in App Store Connect**
   - Go to [App Store Connect](https://appstoreconnect.apple.com)
   - My Apps → Create New App
   - Select iOS platform
   - Enter app information from `store/APP_STORE_LISTING.md`

### Step 2: Configure EAS for iOS

```bash
# Configure iOS credentials
eas credentials

# Select iOS platform
# Choose "Set up a new ad hoc provisioning profile"
# Or "Set up a new App Store distribution profile"
```

### Step 3: Build iOS App

```bash
# Development build for testing
eas build --platform ios --profile development

# Preview build for TestFlight
eas build --platform ios --profile preview

# Production build for App Store
eas build --platform ios --profile production
```

### Step 4: Submit to App Store

```bash
# Automatic submission
eas submit --platform ios --latest

# Or manual submission with specific build
eas submit --platform ios --id=build-id
```

### Step 5: TestFlight Setup
1. Wait for build processing (15-30 minutes)
2. Add internal testers in App Store Connect
3. Submit for external testing (requires review)
4. Share TestFlight link with beta testers

## Android Deployment

### Step 1: Google Play Setup

1. **Create App in Google Play Console**
   - Go to [Google Play Console](https://play.google.com/console)
   - Create app → New app
   - Enter app details from `store/APP_STORE_LISTING.md`
   - Set up store listing

2. **Configure App Signing**
   - Google Play Console → Setup → App signing
   - Let Google manage signing key (recommended)

### Step 2: Build Android App

```bash
# Development APK
eas build --platform android --profile development

# Preview APK for testing
eas build --platform android --profile preview

# Production AAB for Play Store
eas build --platform android --profile production
```

### Step 3: Submit to Google Play

```bash
# Automatic submission
eas submit --platform android --latest

# Manual submission
eas submit --platform android --id=build-id
```

### Step 4: Release Management
1. Upload AAB to internal testing track
2. Run closed alpha/beta testing
3. Gradual rollout to production (10% → 50% → 100%)

## CI/CD with EAS Build

### GitHub Actions Integration

Create `.github/workflows/eas-build.yml`:
```yaml
name: EAS Build
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
          
      - run: npm ci
      
      - run: eas build --platform all --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

### Automatic Builds on Push

Configure in `eas.json`:
```json
{
  "build": {
    "production": {
      "autoIncrement": true,
      "env": {
        "EXPO_PUBLIC_ENV": "production"
      }
    }
  }
}
```

## Over-The-Air (OTA) Updates

### Configure OTA Updates

In `app.json`:
```json
{
  "expo": {
    "updates": {
      "enabled": true,
      "checkAutomatically": "ON_LOAD",
      "fallbackToCacheTimeout": 30000
    }
  }
}
```

### Publish OTA Update

```bash
# Publish update to production
eas update --branch production --message "Bug fixes and improvements"

# Publish with specific platform
eas update --platform ios --branch production
```

## Monitoring & Analytics

### Crash Reporting with Sentry

```bash
# Install Sentry
npx expo install sentry-expo

# Configure in app.json
{
  "expo": {
    "plugins": [
      [
        "sentry-expo",
        {
          "dsn": "YOUR_SENTRY_DSN",
          "enableInExpoDevelopment": true,
          "debug": false
        }
      ]
    ]
  }
}
```

### Analytics Setup

Configure Firebase Analytics or Amplitude for user tracking.

## Troubleshooting

### Common Issues

1. **iOS Build Failures**
   - Check provisioning profiles: `eas credentials`
   - Verify bundle identifier matches
   - Ensure all capabilities are enabled

2. **Android Build Failures**
   - Check package name consistency
   - Verify keystore configuration
   - Check gradle version compatibility

3. **Submission Failures**
   - Ensure all metadata is complete
   - Check screenshot dimensions
   - Verify age ratings and content descriptions

### Debug Commands

```bash
# View build logs
eas build:list --platform ios --limit 5

# Check build status
eas build:view [build-id]

# Download build artifact
eas build:download [build-id]

# Clear credentials
eas credentials --clear-cache
```

## Release Checklist

### Pre-Release
- [ ] Update version in app.json
- [ ] Update CHANGELOG.md
- [ ] Run all tests
- [ ] Test on physical devices
- [ ] Update store listings
- [ ] Prepare marketing materials
- [ ] Schedule social media posts

### Release
- [ ] Build production versions
- [ ] Submit to stores
- [ ] Create GitHub release
- [ ] Deploy web landing page updates
- [ ] Send release notes to team

### Post-Release
- [ ] Monitor crash reports
- [ ] Check user reviews
- [ ] Respond to support emails
- [ ] Plan hotfix if needed
- [ ] Update roadmap

## Security Considerations

### API Keys
- Never commit production keys
- Use EAS Secrets for sensitive data
- Rotate keys regularly

### Code Signing
- Keep certificates secure
- Use separate keys for dev/prod
- Enable two-factor authentication

### Data Protection
- Implement certificate pinning
- Use secure storage for tokens
- Encrypt sensitive local data

## App Store Optimization (ASO)

### Keywords Research
- Use App Annie or Sensor Tower
- Monitor competitor keywords
- A/B test descriptions

### Screenshots
- Highlight key features
- Use device frames
- Include captions

### Reviews Management
- Respond to all reviews
- Address negative feedback
- Encourage positive reviews

## Cost Optimization

### EAS Build Minutes
- Use local builds for development
- Cache dependencies
- Optimize build times

### Infrastructure
- Monitor Supabase usage
- Implement caching strategies
- Use CDN for assets

## Support & Resources

- [EAS Documentation](https://docs.expo.dev/eas/)
- [App Store Guidelines](https://developer.apple.com/app-store/guidelines/)
- [Google Play Policies](https://play.google.com/console/about/policy/)
- [Expo Forums](https://forums.expo.dev/)
- QuizMentor Team: team@quizmentor.app
{% endraw %}
