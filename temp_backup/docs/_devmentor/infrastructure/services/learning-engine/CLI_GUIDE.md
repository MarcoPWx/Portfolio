---
layout: product
title: CLI GUIDE
product: DevMentor
source: infrastructure/services/learning-engine/CLI_GUIDE.md
---

{% raw %}
# 🎮 Personal Learning Engine CLI Guide
## Configure Your AI to Learn Your Coding Style

> **Interactive CLI for personalizing your AI development assistant**

The Personal Learning Engine CLI allows you to configure how the AI learns your coding patterns, design preferences, and development style, creating a truly personalized AI assistant.

---

## 🚀 **Quick Start**

### **First Time Setup**
```bash
# Interactive setup wizard
personal-learning setup

# Quick setup with defaults
personal-learning setup --quick

# Advanced setup with all options
personal-learning setup --advanced
```

### **Check Your Profile**
```bash
# View current profile
personal-learning profile show

# View learning progress
personal-learning analyze progress

# See discovered patterns
personal-learning analyze patterns
```

---

## 🎯 **Configuration Commands**

### **🎨 Coding Style Configuration**
```bash
# Configure your coding style preferences
personal-learning configure coding-style
```

**What it configures:**
- Variable naming conventions (camelCase, snake_case, etc.)
- Function declaration style (arrow functions vs declarations)
- TypeScript preferences
- Code quality rules and principles
- Maximum complexity preferences

**Example interaction:**
```
🎨 Coding Style Configuration
? Variable naming convention: camelCase
? Function declaration style: arrow functions  
? Prefer TypeScript over JavaScript? Yes
? Maximum function complexity (cyclomatic): 10
? Important code quality rules: 
  ✓ Single Responsibility Principle
  ✓ DRY (Don't Repeat Yourself)
  ✓ KISS (Keep It Simple, Stupid)
```

### **🏗️ Design Patterns Configuration**
```bash
# Set preferred design patterns and architectures
personal-learning configure design-patterns
```

**What it configures:**
- Favorite design patterns (Observer, Strategy, Factory, etc.)
- Architectural preferences (Microservices, Clean Architecture, etc.)
- Scalability approach and philosophy
- Domain-driven design preferences

### **🛠️ Tools & Technologies**
```bash
# Configure preferred tools and tech stack
personal-learning configure tools
```

**What it configures:**
- Preferred development environments (VS Code, IntelliJ, etc.)
- Deployment and DevOps tools (Docker, Kubernetes, AWS, etc.)
- Database preferences (SQL, NoSQL, Graph, etc.)
- Testing frameworks and approaches

### **💬 Communication Preferences**
```bash
# Set how you prefer to receive explanations
personal-learning configure communication
```

**What it configures:**
- Explanation style (brief, detailed, step-by-step)
- Technical depth level (1-10 scale)
- Whether to include alternative approaches
- Feedback frequency preferences

### **🎯 Learning Goals**
```bash
# Define your learning objectives
personal-learning configure learning-goals
```

**What it configures:**
- Short-term learning goals (3-6 months)
- Long-term learning goals (6+ months)  
- Preferred learning methods
- Weekly learning time allocation

---

## 👤 **Profile Management**

### **Create & Switch Profiles**
```bash
# Create a new profile
personal-learning profile create "work-profile"

# Create profile copying from existing
personal-learning profile create "personal-dev" --copy-from work-profile

# Switch between profiles
personal-learning profile switch work-profile

# List all profiles
personal-learning profile list

# Show detailed profile info
personal-learning profile show --verbose
```

### **Profile Use Cases**
- **Work Profile**: Enterprise patterns, conservative choices
- **Personal Profile**: Experimental tech, cutting-edge patterns
- **Learning Profile**: Focus on skill development areas
- **Project-Specific**: Tailored for specific tech stacks

---

## 🔍 **Analysis Commands**

### **📊 Code Pattern Analysis**
```bash
# Analyze current repository
personal-learning analyze code

# Analyze specific repository
personal-learning analyze code --repo /path/to/project

# Analyze recent commits only
personal-learning analyze code --since "2024-01-01"

# Analyze by specific author
personal-learning analyze code --author "your-name"
```

**What it analyzes:**
- Naming conventions and consistency
- Function complexity patterns
- File organization structures
- Git commit patterns and frequency
- Code reuse and refactoring habits

### **🧩 Knowledge Gap Detection**
```bash
# Identify learning opportunities
personal-learning analyze gaps

# Focus on specific domain
personal-learning analyze gaps --domain "system-design"
```

**What it identifies:**
- Patterns you avoid or struggle with
- Technologies mentioned but not deeply used
- Areas where you rely heavily on assistance
- Skills gaps based on industry standards

### **📈 Learning Progress**
```bash
# View learning progress
personal-learning analyze progress

# Specific timeframe
personal-learning analyze progress --timeframe week
personal-learning analyze progress --timeframe year
```

**What it shows:**
- Patterns learned over time
- Accuracy improvement metrics
- Goals achieved vs total goals
- Time spent learning and practicing

---

## 💡 **Get Personalized Suggestions**

### **📚 Book Recommendations**
```bash
# Get book recommendations based on your gaps
personal-learning suggest books

# Focus on specific domain
personal-learning suggest books --domain "architecture"

# Filter by skill level
personal-learning suggest books --level intermediate
```

### **🏗️ Pattern Recommendations**
```bash
# Get design pattern suggestions for current work
personal-learning suggest patterns

# With specific context
personal-learning suggest patterns --context "building-api"
```

### **🛠️ Tool Recommendations**
```bash
# Get tool suggestions
personal-learning suggest tools

# For specific purpose
personal-learning suggest tools --for "testing"
```

### **✨ Code Improvements**
```bash
# Get improvement suggestions for current code
personal-learning suggest improvements

# For specific file
personal-learning suggest improvements src/components/MyComponent.js
```

---

## 🤖 **Learning Management**

### **🎓 Start Learning**
```bash
# Start autonomous learning
personal-learning learn start

# Set learning mode
personal-learning learn start --mode aggressive
personal-learning learn start --mode passive
```

**Learning Modes:**
- **Passive**: Observes patterns without active suggestions
- **Active**: Provides suggestions and learns from feedback
- **Aggressive**: Actively suggests improvements and alternatives

### **📊 Monitor Learning**
```bash
# Check learning status
personal-learning learn status

# View live dashboard
personal-learning dashboard --live

# Open web dashboard
personal-learning dashboard --web
```

### **👍 Provide Feedback**
```bash
# Rate AI suggestions (1-5 scale)
personal-learning learn feedback 5 "Great suggestion!"
personal-learning learn feedback 2 "Not relevant to my style"
```

### **🔄 Reset Learning**
```bash
# Reset all learning data
personal-learning learn reset

# Keep preferences but reset learning
personal-learning learn reset --keep-preferences
```

---

## 📊 **Dashboard & Analytics**

### **📈 View Statistics**
```bash
# Show detailed learning statistics
personal-learning stats

# Export in different formats
personal-learning stats --format json
personal-learning stats --format yaml
```

### **📤 Export Data**
```bash
# Export learning data
personal-learning export json --output my-profile.json
personal-learning export csv --output learning-data.csv
personal-learning export pdf --output learning-report.pdf

# Include specific data types
personal-learning export json --include "preferences,patterns,progress"
```

---

## 🎯 **Example Workflows**

### **🔧 Setting Up for New Project**
```bash
# Create project-specific profile
personal-learning profile create "react-native-project" --copy-from work-profile

# Configure for React Native specifics
personal-learning configure tools
# Select: React Native, Expo, TypeScript, Jest

personal-learning configure design-patterns  
# Select: Component patterns, State management, etc.

# Start learning in active mode
personal-learning learn start --mode active
```

### **📚 Focused Learning Session**
```bash
# Set learning goals
personal-learning configure learning-goals
# Add: "Master TypeScript advanced patterns"

# Analyze current gaps
personal-learning analyze gaps --domain typescript

# Get book recommendations
personal-learning suggest books --domain typescript --level advanced

# Start focused learning
personal-learning learn start --mode aggressive
```

### **🔍 Code Review Preparation**
```bash
# Analyze recent work
personal-learning analyze code --since "last week"

# Get improvement suggestions
personal-learning suggest improvements

# Check consistency with your patterns
personal-learning analyze patterns --category consistency
```

---

## ⚙️ **Advanced Configuration**

### **🔧 Custom Learning Parameters**
```bash
# Edit advanced settings (creates profile-specific config)
personal-learning configure advanced
```

**Advanced options:**
- Learning rate (how fast to adapt)
- Confidence threshold (when to make suggestions)
- Pattern sensitivity (how strict pattern matching is)
- Explanation depth preference
- Custom code quality rules

### **🗂️ Import/Export Configurations**
```bash
# Export current configuration
personal-learning export config --output my-config.json

# Import configuration
personal-learning import config my-config.json

# Share configuration with team
personal-learning export config --team-safe --output team-config.json
```

---

## 🚨 **Troubleshooting**

### **Common Issues**

**CLI not found:**
```bash
# Make sure it's executable
chmod +x src/cli.js

# Add to PATH or use full path
./src/cli.js setup
```

**Permission errors:**
```bash
# Check config directory permissions
ls -la ~/.personal-learning/

# Reset permissions if needed
chmod -R 755 ~/.personal-learning/
```

**Git analysis fails:**
```bash
# Ensure you're in a Git repository
git status

# Check if repository has commits
git log --oneline -n 5
```

**Learning data corruption:**
```bash
# Reset learning data
personal-learning learn reset --force

# Start fresh setup
personal-learning setup --advanced
```

---

## 🎉 **Tips for Best Results**

### **🎯 Effective Configuration**
1. **Be specific** - Don't choose "mixed" or "context-dependent" unless necessary
2. **Set realistic goals** - Start with 1-2 learning areas
3. **Provide feedback** - Rate suggestions to improve accuracy
4. **Use multiple profiles** - Different contexts need different settings

### **📈 Maximizing Learning**
1. **Analyze regularly** - Run code analysis weekly
2. **Review suggestions** - Check what the AI recommends daily
3. **Update goals** - Revise learning goals monthly
4. **Track progress** - Monitor learning metrics for motivation

### **🔄 Iterative Improvement**
1. **Start simple** - Begin with basic preferences
2. **Evolve gradually** - Refine preferences as you learn
3. **Experiment** - Try different settings to find what works
4. **Share insights** - Use export feature to document learnings

---

**🧠 The Personal Learning Engine CLI transforms your development workflow by creating an AI assistant that truly understands your unique coding style, preferences, and goals!** {% endraw %}
