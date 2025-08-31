# 📚 NatureQuest Documentation Hub

Comprehensive documentation center aggregating 256+ documents from across the NatureQuest ecosystem.

## 🌟 Overview

This GitHub Pages site serves as the central documentation hub for all NatureQuest projects:
- **DevMentor**: AI development assistant (200+ docs)
- **QuizMentor**: Adaptive learning platform (70+ docs)
- **Harvest.ai**: Content intelligence (15+ docs)

## 🚀 Quick Links

- **[Live Documentation](https://naturequest.github.io/portfolio/docs/)** - View the documentation site
- **[Learning Roadmap](/learning-roadmap.md)** - 30-day structured learning path
- **[All Documentation](/all-docs.md)** - Complete document index
- **[Portfolio Epics & Tasks](/_portfolio/status/EPIC_MANAGEMENT.md)** - Current epics and actionable tasks
- **[Portfolio Status](/_portfolio/status/PORTFOLIO_STATUS.md)** - Latest status, changes, and next steps

## 📂 Structure

```
portfolio/docs/
├── index.md                 # Main hub page
├── learning-roadmap.md      # Comprehensive learning path
├── _config.yml             # Jekyll configuration
├── _devmentor/             # DevMentor documentation
├── _quizmentor/            # QuizMentor documentation
├── _harvest/               # Harvest.ai documentation
└── scripts/
    └── aggregate-docs.sh   # Documentation aggregation script
```

## 🛠️ Setup

### Local Development

1. **Install Jekyll**:
```bash
gem install bundler jekyll
```

2. **Install dependencies**:
```bash
cd portfolio/docs
bundle install
```

3. **Aggregate documentation**:
```bash
chmod +x ../scripts/aggregate-docs.sh
../scripts/aggregate-docs.sh
```

4. **Run locally**:
```bash
bundle exec jekyll serve
# Open http://localhost:4000/docs/
```

### GitHub Pages Deployment

1. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Source: Deploy from branch
   - Branch: main
   - Folder: /portfolio/docs

2. **Access the site**:
   - URL: `https://[username].github.io/NatureQuest/docs/`

## 📝 Adding Documentation

### Manual Addition

Add new documentation files to the appropriate collection:
- DevMentor: `_devmentor/`
- QuizMentor: `_quizmentor/`
- Harvest.ai: `_harvest/`

Include front matter:
```yaml
---
layout: product
title: Your Document Title
product: DevMentor
---
```

### Automatic Aggregation

Run the aggregation script to pull latest docs from all projects:
```bash
./scripts/aggregate-docs.sh
```

## 🎨 Customization

### Themes

Edit `_config.yml` to change the Jekyll theme:
```yaml
theme: jekyll-theme-minimal  # Current
# Other options:
# theme: jekyll-theme-cayman
# theme: jekyll-theme-slate
# theme: jekyll-theme-architect
```

### Navigation

Update navigation in `_config.yml`:
```yaml
navigation:
  - title: Your Page
    url: /your-page/
```

## 📊 Documentation Coverage

| Product | Docs | Coverage Areas |
|---------|------|----------------|
| **DevMentor** | 200+ | Infrastructure, Kubernetes, AI, Services, Testing |
| **QuizMentor** | 70+ | Mobile, Testing, Gamification, Deployment |
| **Harvest.ai** | 15+ | Architecture, Strategy, Competition |

## 🔍 Search

The site includes client-side search functionality. To enable full-text search:

1. Generate search index:
```bash
bundle exec jekyll build
```

2. Search is available on every page via the search box

## 📈 Analytics

To add Google Analytics, update `_config.yml`:
```yaml
google_analytics: UA-XXXXXXXXX-X
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b docs/your-feature`
3. **Add/update documentation**
4. **Run aggregation script** if adding to source projects
5. **Test locally**: `bundle exec jekyll serve`
6. **Submit pull request**

## 📋 Maintenance

### Weekly Tasks
- Run aggregation script to sync latest docs
- Review and update learning roadmap
- Check for broken links

### Monthly Tasks
- Update documentation statistics
- Review site analytics
- Archive outdated documentation

## 🐛 Troubleshooting

### Build Errors
```bash
bundle update
bundle exec jekyll clean
bundle exec jekyll build --verbose
```

### Missing Documents
```bash
# Re-run aggregation
./scripts/aggregate-docs.sh

# Check source directories
ls -la /path/to/NatureQuest/*/docs/
```

### GitHub Pages Not Updating
- Check repository Settings > Pages
- Verify branch and folder settings
- Check Actions tab for build errors

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/NatureQuest/portfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/NatureQuest/portfolio/discussions)
- **Email**: docs@naturequest.ai

## 📄 License

This documentation is part of the NatureQuest ecosystem.

---

*Last Updated: August 28, 2025*
*Version: 1.1.0*
