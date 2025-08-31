#!/bin/bash

# NatureQuest Documentation Aggregator
# This script copies documentation from all projects into the portfolio docs site

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌟 NatureQuest Documentation Aggregator${NC}"
echo -e "${BLUE}=====================================>${NC}"

# Base paths
NATUREQUEST_ROOT="/Users/betolbook/Documents/github/NatureQuest"
PORTFOLIO_DOCS="$NATUREQUEST_ROOT/portfolio/docs"

# Create collection directories
echo -e "${YELLOW}Creating collection directories...${NC}"
mkdir -p "$PORTFOLIO_DOCS/_devmentor"
mkdir -p "$PORTFOLIO_DOCS/_quizmentor"
mkdir -p "$PORTFOLIO_DOCS/_harvest"
mkdir -p "$PORTFOLIO_DOCS/_omni"
mkdir -p "$PORTFOLIO_DOCS/_auth"
mkdir -p "$PORTFOLIO_DOCS/_portfolio"

# Function to process markdown files
process_docs() {
    local source_dir=$1
    local target_dir=$2
    local product=$3
    
    echo -e "${GREEN}Processing $product documentation...${NC}"
    
    if [ -d "$source_dir" ]; then
        # Find all .md files excluding node_modules and archives
        find "$source_dir" -type f -name "*.md" \
            ! -path "*/node_modules/*" \
            ! -path "*/.archive/*" \
            ! -path "*/archived-docs/*" \
            -exec bash -c '
                source_file="$1"
                target_dir="$2"
                source_dir="$3"
                
                # Calculate relative path
                rel_path="${source_file#$source_dir/}"
                target_file="$target_dir/$rel_path"
                
                # Create target directory
                mkdir -p "$(dirname "$target_file")"
                
                # Add front matter and copy file with Liquid protection
                {
                    echo "---"
                    echo "layout: product"
                    echo "title: $(basename "$source_file" .md | tr "_" " ")"
                    echo "product: $4"
                    echo "source: $rel_path"
                    echo "---"
                    echo ""
                    echo "{% raw %}"
                    cat "$source_file"
                    echo "{% endraw %}"
                } > "$target_file"
                
                echo "  ✓ $rel_path"
            ' _ {} "$target_dir" "$source_dir" "$product" \;
    else
        echo -e "${RED}  ⚠ Directory not found: $source_dir${NC}"
    fi
}

# Aggregate DevMentor docs
echo -e "\n${BLUE}📚 DevMentor Documentation${NC}"
process_docs "$NATUREQUEST_ROOT/devmentor/docs" "$PORTFOLIO_DOCS/_devmentor" "DevMentor"

# Aggregate QuizMentor docs
echo -e "\n${BLUE}📚 QuizMentor Documentation${NC}"
process_docs "$NATUREQUEST_ROOT/QuizMentor/docs" "$PORTFOLIO_DOCS/_quizmentor" "QuizMentor"

# Aggregate Harvest.ai docs
echo -e "\n${BLUE}📚 Harvest.ai Documentation${NC}"
process_docs "$NATUREQUEST_ROOT/Harvest.ai/docs" "$PORTFOLIO_DOCS/_harvest" "Harvest.ai"

# Aggregate Omni.ai docs
echo -e "\n${BLUE}📚 Omni.ai Documentation${NC}"
process_docs "$NATUREQUEST_ROOT/Omni.ai/docs" "$PORTFOLIO_DOCS/_omni" "Omni.ai"

# Aggregate NatureQuest Auth docs
echo -e "\n${BLUE}📚 NatureQuest Auth Documentation${NC}"
process_docs "$NATUREQUEST_ROOT/naturequest-auth/docs" "$PORTFOLIO_DOCS/_auth" "NatureQuest Auth"

# Aggregate Portfolio docs (whitepapers and infrastructure)
echo -e "\n${BLUE}📚 Portfolio Documentation${NC}"
process_docs "$NATUREQUEST_ROOT/portfolio/docs/infrastructure" "$PORTFOLIO_DOCS/_portfolio" "Portfolio"

# Generate documentation index
echo -e "\n${YELLOW}Generating documentation index...${NC}"
cat > "$PORTFOLIO_DOCS/all-docs.md" << 'EOF'
---
layout: default
title: All Documentation
permalink: /all-docs/
---

# 📚 All NatureQuest Documentation

This page lists all documentation files across the NatureQuest ecosystem.

EOF

# Add documentation counts
echo -e "\n## 📊 Documentation Statistics\n" >> "$PORTFOLIO_DOCS/all-docs.md"
echo "| Product | Document Count |" >> "$PORTFOLIO_DOCS/all-docs.md"
echo "|---------|----------------|" >> "$PORTFOLIO_DOCS/all-docs.md"

for product in devmentor quizmentor harvest omni auth portfolio; do
    count=$(find "$PORTFOLIO_DOCS/_$product" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
    case $product in
        devmentor) name="DevMentor" ;;
        quizmentor) name="QuizMentor" ;;
        harvest) name="Harvest.ai" ;;
        omni) name="Omni.ai" ;;
        auth) name="NatureQuest Auth" ;;
        portfolio) name="Portfolio" ;;
    esac
    echo "| $name | $count |" >> "$PORTFOLIO_DOCS/all-docs.md"
done

total=$(find "$PORTFOLIO_DOCS" -path "$PORTFOLIO_DOCS/_*" -name "*.md" | wc -l | tr -d ' ')
echo "| **Total** | **$total** |" >> "$PORTFOLIO_DOCS/all-docs.md"

# Add file listings
echo -e "\n## 📁 Document Tree\n" >> "$PORTFOLIO_DOCS/all-docs.md"

for product in devmentor quizmentor harvest omni auth portfolio; do
    case $product in
        devmentor) name="DevMentor" ;;
        quizmentor) name="QuizMentor" ;;
        harvest) name="Harvest.ai" ;;
        omni) name="Omni.ai" ;;
        auth) name="NatureQuest Auth" ;;
        portfolio) name="Portfolio" ;;
    esac
    
    echo -e "\n### $name\n" >> "$PORTFOLIO_DOCS/all-docs.md"
    echo '```' >> "$PORTFOLIO_DOCS/all-docs.md"
    if [ -d "$PORTFOLIO_DOCS/_$product" ]; then
        cd "$PORTFOLIO_DOCS/_$product"
        find . -name "*.md" | sed 's|^\./||' | sort >> "$PORTFOLIO_DOCS/all-docs.md"
    fi
    echo '```' >> "$PORTFOLIO_DOCS/all-docs.md"
done

echo -e "\n${GREEN}✅ Documentation aggregation complete!${NC}"
echo -e "${GREEN}📊 Total documents: $total${NC}"
echo -e "\n${BLUE}To view the documentation site locally:${NC}"
echo -e "  cd $PORTFOLIO_DOCS"
echo -e "  bundle exec jekyll serve"
echo -e "  Open: http://localhost:4000/docs/"
