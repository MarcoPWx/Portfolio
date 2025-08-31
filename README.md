# NatureQuest Portfolio

A beautiful portfolio website showcasing the NatureQuest product ecosystem, inspired by modern design systems like Supabase and Parlant.

## 🎯 Products Showcased

- **QuizMentor** - Adaptive Learning Platform
- **DevMentor** - AI Development Assistant  
- **Harvest** - Smart Time Tracking
- **Omni** - Universal AI for VS Code

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── components/
│       ├── PortfolioDashboard.tsx    # Main portfolio component
│       ├── portfolio-dashboard.css    # Dashboard styles
│       └── ecosystem/
│           ├── EcosystemWidget.tsx   # Cross-promotion widget
│           └── ecosystem-widget.css  # Widget styles
├── public/                   # Static assets
├── package.json
├── next.config.js
└── tsconfig.json
```

## 🎨 Features

- **Dark theme** with gradient effects
- **Interactive product cards** with metrics
- **Status filtering** (Live/Beta/Coming Soon)
- **Product detail modals**
- **Responsive design**
- **Smooth animations**
- **SEO optimized**

## 🛠️ Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- CSS Modules

## 📱 Components

### PortfolioDashboard
Main portfolio showcase with hero section, product grid, and features.

### EcosystemWidget
Embeddable widget for cross-promotion across all products:
- Minimizable interface
- 7-day hide option
- Product quick links

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export
```bash
npm run build
npm run export
# Deploy the 'out' directory to any static host
```

## 🔧 Configuration

Edit product data in `src/components/PortfolioDashboard.tsx`:

```typescript
const products: Product[] = [
  {
    id: 'quizmentor',
    name: 'QuizMentor',
    tagline: 'Adaptive Learning Platform',
    // ... customize
  }
];
```

## 📊 Analytics Integration

Add your analytics in `src/app/layout.tsx`:

```typescript
// Google Analytics
<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />

// Plausible
<Script defer data-domain="naturequest.dev" src="https://plausible.io/js/script.js" />
```

## 🎯 SEO

Update metadata in `src/app/layout.tsx`:
- Title and description
- Open Graph tags
- Twitter cards
- Structured data

## 📖 Storybook & UI Docs

- We author docs with native MDX and group titles as Foundation/*, UI/*, and Guides/* for a clean sidebar.
- Add `tags={['docs']}` to `<Meta>` in each MDX page.
- See the authoring guide: `docs/storybook/MDX_GUIDE.md`.

To build the static Storybook:

```bash
npm run build-storybook
open storybook-static/index.html
```

## 📝 License

Private - NatureQuest © 2024

---

Built with ❤️ by the NatureQuest team
