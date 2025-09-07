#!/bin/bash

# Portfolio IP Cleanup Script
# This script removes or genericizes proprietary information

echo "🔒 Starting Portfolio IP Cleanup..."

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Backup portfolio first
BACKUP_DIR="/Users/betolbook/Documents/github/portfolio.backup.$(date +%Y%m%d_%H%M%S)"
echo -e "${YELLOW}Creating backup at $BACKUP_DIR${NC}"
cp -r /Users/betolbook/Documents/github/portfolio "$BACKUP_DIR"

# Navigate to portfolio directory
cd /Users/betolbook/Documents/github/portfolio

# 1. Remove sensitive MDX files
echo -e "${YELLOW}Removing sensitive documentation files...${NC}"
find . -name "*DevMentor*" -type f -delete 2>/dev/null
find . -name "*AI-OS*" -type f -delete 2>/dev/null
find . -name "*LearnForge*" -type f -delete 2>/dev/null
find . -name "*Chameleon*" -type f -delete 2>/dev/null

# 2. Update TypeScript/JavaScript files
echo -e "${YELLOW}Updating component files...${NC}"

# Replace project names with generic ones
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -exec sed -i '' \
  -e 's/AI-OS-CE/Developer Toolkit/g' \
  -e 's/AI-OS CE/Developer Toolkit/g' \
  -e 's/ai-os-ce/dev-toolkit/g' \
  -e 's/AI-OS-Pro/Enterprise Platform/g' \
  -e 's/AI-OS Pro/Enterprise Platform/g' \
  -e 's/ai-os-pro/enterprise-platform/g' \
  -e 's/DevMentor/Platform/g' \
  -e 's/devmentor/platform/g' \
  -e 's/LearnForge/Documentation System/g' \
  -e 's/learnforge/docs-system/g' \
  -e 's/Chameleon\.ai/AI Assistant/g' \
  -e 's/Chameleon/AI Assistant/g' \
  -e 's/chameleon/ai-assistant/g' \
  -e 's/NatureQuest/Portfolio/g' \
  -e 's/naturequest/portfolio/g' \
  -e 's/Octopus/Analytics Platform/g' \
  -e 's/octopus/analytics/g' {} \;

# 3. Clean up specific files
echo -e "${YELLOW}Cleaning specific component files...${NC}"

# Update PortfolioDashboard.tsx to use generic descriptions
if [ -f "src/components/PortfolioDashboard.tsx" ]; then
  echo "  Updating PortfolioDashboard.tsx..."
  # This would need more sophisticated replacement
  # For now, we'll flag it for manual review
  echo -e "${RED}  ⚠️  Please manually review src/components/PortfolioDashboard.tsx${NC}"
fi

# Update ProjectStack.tsx to remove specific project references
if [ -f "src/components/ProjectStack.tsx" ]; then
  echo "  Updating ProjectStack.tsx..."
  echo -e "${RED}  ⚠️  Please manually review src/components/ProjectStack.tsx${NC}"
fi

# 4. Update package.json metadata
echo -e "${YELLOW}Updating package.json...${NC}"
if [ -f "package.json" ]; then
  sed -i '' \
    -e 's/"name": ".*"/"name": "portfolio"/' \
    -e 's/"description": ".*"/"description": "Professional software development portfolio"/' \
    package.json
fi

# 5. Update layout.tsx metadata
echo -e "${YELLOW}Updating app metadata...${NC}"
if [ -f "src/app/layout.tsx" ]; then
  sed -i '' \
    -e "s/PixelQuest Portfolio/Software Portfolio/g" \
    -e "s/NatureQuest/Portfolio/g" \
    -e "s/AI-powered development platform/Software development portfolio/g" \
    src/app/layout.tsx
fi

# 6. Remove or update README
echo -e "${YELLOW}Updating README...${NC}"
if [ -f "README.md" ]; then
  cat > README.md << 'EOF'
# Portfolio

Professional software development portfolio showcasing various projects and technical skills.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📁 Projects

- **QuizMentor** - Educational learning platform
- **Developer Toolkit** - Productivity tools for developers
- **Enterprise Platform** - Solutions for teams
- **Voice Platform** - Voice application development
- **Time Tracker** - Smart time management

## 🛠️ Technologies

- Next.js / React / TypeScript
- Node.js / Express
- PostgreSQL / Redis
- Docker / Kubernetes
- AWS / Cloud Infrastructure

## 📝 License

Private - All Rights Reserved

---

Built with modern web technologies
EOF
fi

# 7. Create .gitignore if needed
echo -e "${YELLOW}Updating .gitignore...${NC}"
cat >> .gitignore << 'EOF'

# IP Protection
*DevMentor*
*AI-OS*
*LearnForge*
*Chameleon*
*.backup
CONFIDENTIAL*
PRIVATE*
SECRET*
*-proprietary*
*-internal*
EOF

# 8. Summary report
echo ""
echo -e "${GREEN}✅ Portfolio IP Cleanup Complete!${NC}"
echo ""
echo -e "${YELLOW}Manual Review Required:${NC}"
echo "  1. src/components/PortfolioDashboard.tsx - Update product descriptions"
echo "  2. src/components/ProjectStack.tsx - Remove specific project references"
echo "  3. Any remaining story files in src/components/ui/"
echo "  4. Check all imports for proprietary references"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Review changes: git diff"
echo "  2. Test the build: npm run build"
echo "  3. Check for remaining sensitive content: grep -r 'AI-OS\\|DevMentor\\|LearnForge'"
echo "  4. Commit changes: git add . && git commit -m 'Remove proprietary information'"
echo "  5. Consider cleaning git history if sensitive data was committed"
echo ""
echo -e "${GREEN}Backup saved to: $BACKUP_DIR${NC}"
echo ""
echo -e "${RED}⚠️  IMPORTANT: Make the repository PRIVATE until fully reviewed!${NC}"
