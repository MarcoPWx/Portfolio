#!/usr/bin/env node

/**
 * Master Documentation Tracker
 * Scans and inventories all documentation across the NatureQuest ecosystem
 * Generates a comprehensive index with categorization and metadata
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const ECOSYSTEM_ROOT = '/Users/betolbook/Documents/github/NatureQuest';
const OUTPUT_DIR = path.join(__dirname, '../docs/master-documentation');
const IGNORE_PATTERNS = [
  'node_modules',
  '.next',
  '.expo',
  'dist',
  'build',
  '.git',
  'coverage',
  '.archive',
];

// Documentation categories
const CATEGORIES = {
  API: ['api', 'endpoint', 'routes', 'swagger', 'openapi'],
  USER_JOURNEY: ['journey', 'flow', 'user-story', 'scenario'],
  ARCHITECTURE: ['architecture', 'design', 'system', 'infrastructure'],
  DEPLOYMENT: ['deployment', 'deploy', 'ci-cd', 'pipeline', 'docker', 'kubernetes'],
  TESTING: ['test', 'spec', 'e2e', 'unit', 'integration'],
  AI: ['ai', 'ml', 'llm', 'machine-learning', 'prompt'],
  RUNBOOK: ['runbook', 'playbook', 'incident', 'emergency'],
  GUIDE: ['guide', 'tutorial', 'how-to', 'getting-started'],
  STATUS: ['status', 'devlog', 'progress', 'epic'],
  CONFIG: ['config', 'setup', 'installation', 'environment'],
  SECURITY: ['security', 'auth', 'encryption', 'privacy'],
  PERFORMANCE: ['performance', 'optimization', 'scaling', 'cache'],
  DATABASE: ['database', 'schema', 'migration', 'sql'],
  MONITORING: ['monitoring', 'logging', 'metrics', 'observability'],
  BUSINESS: ['monetization', 'strategy', 'roadmap', 'planning'],
};

// Project mapping
const PROJECTS = {
  portfolio: 'Portfolio Central',
  QuizMentor: 'QuizMentor',
  devmentor: 'DevMentor',
  'Harvest.ai': 'Harvest.ai',
  'Omni.ai': 'Omni.ai',
};

class DocumentationTracker {
  constructor() {
    this.documents = [];
    this.statistics = {
      total: 0,
      byProject: {},
      byCategory: {},
      byType: {},
      duplicates: [],
      orphaned: [],
      outdated: [],
    };
    this.contentHashes = new Map();
  }

  // Scan directory recursively
  async scanDirectory(dir, project = 'unknown') {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        // Skip ignored patterns
        if (IGNORE_PATTERNS.some((pattern) => entry.name.includes(pattern))) {
          continue;
        }

        if (entry.isDirectory()) {
          // Detect project change
          const newProject = PROJECTS[entry.name] || project;
          await this.scanDirectory(fullPath, newProject);
        } else if (entry.name.endsWith('.md')) {
          await this.processDocument(fullPath, project);
        }
      }
    } catch (error) {
      console.error(`Error scanning ${dir}:`, error.message);
    }
  }

  // Process individual document
  async processDocument(filePath, project) {
    try {
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath, 'utf8');
      const hash = crypto.createHash('md5').update(content).digest('hex');

      // Extract metadata
      const metadata = this.extractMetadata(content);
      const category = this.categorizeDocument(filePath, content);
      const relativePath = path.relative(ECOSYSTEM_ROOT, filePath);

      // Check for duplicates
      if (this.contentHashes.has(hash)) {
        this.statistics.duplicates.push({
          original: this.contentHashes.get(hash),
          duplicate: relativePath,
        });
      } else {
        this.contentHashes.set(hash, relativePath);
      }

      // Check if outdated (not modified in 90 days)
      const daysSinceModified = (Date.now() - stats.mtime) / (1000 * 60 * 60 * 24);
      if (daysSinceModified > 90) {
        this.statistics.outdated.push(relativePath);
      }

      const doc = {
        id: hash.substring(0, 8),
        path: relativePath,
        fullPath: filePath,
        project,
        category,
        title: metadata.title || path.basename(filePath, '.md'),
        description: metadata.description,
        tags: metadata.tags,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        daysSinceModified: Math.floor(daysSinceModified),
        lineCount: content.split('\n').length,
        wordCount: content.split(/\s+/).length,
        hasTableOfContents: content.includes('## Table of Contents') || content.includes('## TOC'),
        hasCodeBlocks: (content.match(/```/g) || []).length / 2,
        hasImages: (content.match(/!\[.*?\]\(.*?\)/g) || []).length,
        hasLinks: (content.match(/\[.*?\]\(.*?\)/g) || []).length,
        headings: this.extractHeadings(content),
        apis: this.extractAPIs(content),
        components: this.extractComponents(content),
        errors: this.extractErrors(content),
      };

      this.documents.push(doc);
      this.updateStatistics(doc);
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  }

  // Extract metadata from content
  extractMetadata(content) {
    const metadata = {
      title: null,
      description: null,
      tags: [],
    };

    // Extract title from first H1
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      metadata.title = titleMatch[1];
    }

    // Extract description from first paragraph after title
    const descMatch = content.match(/^#[^\n]+\n\n([^\n]+)/);
    if (descMatch) {
      metadata.description = descMatch[1];
    }

    // Extract tags from content
    const tagMatches = content.match(/tags?:\s*(.+)/i);
    if (tagMatches) {
      metadata.tags = tagMatches[1].split(/[,\s]+/).filter(Boolean);
    }

    return metadata;
  }

  // Categorize document based on path and content
  categorizeDocument(filePath, content) {
    const lowerPath = filePath.toLowerCase();
    const lowerContent = content.toLowerCase();

    for (const [category, keywords] of Object.entries(CATEGORIES)) {
      if (
        keywords.some((keyword) => lowerPath.includes(keyword) || lowerContent.includes(keyword))
      ) {
        return category;
      }
    }

    return 'GENERAL';
  }

  // Extract headings structure
  extractHeadings(content) {
    const headings = [];
    const regex = /^(#{1,6})\s+(.+)$/gm;
    let match;

    while ((match = regex.exec(content)) !== null) {
      headings.push({
        level: match[1].length,
        text: match[2],
      });
    }

    return headings;
  }

  // Extract API endpoints
  extractAPIs(content) {
    const apis = [];

    // Common API patterns
    const patterns = [
      /(?:GET|POST|PUT|DELETE|PATCH)\s+([\/\w\-\{\}]+)/g,
      /endpoint:\s*["']([^"']+)["']/g,
      /api\/([\/\w\-]+)/g,
    ];

    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        apis.push(match[1]);
      }
    });

    return [...new Set(apis)];
  }

  // Extract component names
  extractComponents(content) {
    const components = [];

    // React component patterns
    const patterns = [
      /(?:export\s+)?(?:default\s+)?(?:function|const|class)\s+([A-Z][A-Za-z]+)/g,
      /<([A-Z][A-Za-z]+)/g,
    ];

    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        components.push(match[1]);
      }
    });

    return [...new Set(components)];
  }

  // Extract error codes and messages
  extractErrors(content) {
    const errors = [];

    // Error patterns
    const patterns = [
      /error\s*[:=]\s*["']([^"']+)["']/gi,
      /throw\s+new\s+Error\(["']([^"']+)["']\)/g,
      /ERROR_([A-Z_]+)/g,
    ];

    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        errors.push(match[1]);
      }
    });

    return [...new Set(errors)];
  }

  // Update statistics
  updateStatistics(doc) {
    this.statistics.total++;

    // By project
    if (!this.statistics.byProject[doc.project]) {
      this.statistics.byProject[doc.project] = 0;
    }
    this.statistics.byProject[doc.project]++;

    // By category
    if (!this.statistics.byCategory[doc.category]) {
      this.statistics.byCategory[doc.category] = 0;
    }
    this.statistics.byCategory[doc.category]++;

    // By type
    const type = path.extname(doc.path);
    if (!this.statistics.byType[type]) {
      this.statistics.byType[type] = 0;
    }
    this.statistics.byType[type]++;
  }

  // Generate reports
  async generateReports() {
    // Create output directory
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Generate main index
    const index = this.generateIndex();
    fs.writeFileSync(path.join(OUTPUT_DIR, 'MASTER_INDEX.md'), index);

    // Generate category reports
    for (const category of Object.keys(CATEGORIES)) {
      const categoryDocs = this.documents.filter((doc) => doc.category === category);
      if (categoryDocs.length > 0) {
        const report = this.generateCategoryReport(category, categoryDocs);
        fs.writeFileSync(path.join(OUTPUT_DIR, `${category}_DOCUMENTATION.md`), report);
      }
    }

    // Generate project reports
    for (const project of Object.keys(this.statistics.byProject)) {
      const projectDocs = this.documents.filter((doc) => doc.project === project);
      const report = this.generateProjectReport(project, projectDocs);
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${project.replace(/\s+/g, '_')}_DOCUMENTATION.md`),
        report,
      );
    }

    // Generate statistics report
    const statsReport = this.generateStatisticsReport();
    fs.writeFileSync(path.join(OUTPUT_DIR, 'DOCUMENTATION_STATISTICS.md'), statsReport);

    // Generate JSON database
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'documentation-database.json'),
      JSON.stringify(
        {
          generated: new Date().toISOString(),
          statistics: this.statistics,
          documents: this.documents,
        },
        null,
        2,
      ),
    );
  }

  // Generate main index
  generateIndex() {
    let content = `# Master Documentation Index
Generated: ${new Date().toISOString()}
Total Documents: ${this.statistics.total}

## Quick Stats
- **Projects**: ${Object.keys(this.statistics.byProject).length}
- **Categories**: ${Object.keys(this.statistics.byCategory).length}
- **Duplicates Found**: ${this.statistics.duplicates.length}
- **Outdated Documents**: ${this.statistics.outdated.length}

## Documentation by Category
`;

    for (const [category, count] of Object.entries(this.statistics.byCategory)) {
      content += `- [${category}](${category}_DOCUMENTATION.md) - ${count} documents\n`;
    }

    content += `\n## Documentation by Project\n`;

    for (const [project, count] of Object.entries(this.statistics.byProject)) {
      content += `- [${project}](${project.replace(/\s+/g, '_')}_DOCUMENTATION.md) - ${count} documents\n`;
    }

    content += `\n## Critical Documents\n\n`;
    content += `### API Documentation\n`;
    const apiDocs = this.documents.filter((d) => d.category === 'API').slice(0, 10);
    apiDocs.forEach((doc) => {
      content += `- [${doc.title}](../../${doc.path})\n`;
    });

    content += `\n### User Journeys\n`;
    const journeyDocs = this.documents.filter((d) => d.category === 'USER_JOURNEY').slice(0, 10);
    journeyDocs.forEach((doc) => {
      content += `- [${doc.title}](../../${doc.path})\n`;
    });

    content += `\n### Runbooks\n`;
    const runbookDocs = this.documents.filter((d) => d.category === 'RUNBOOK').slice(0, 10);
    runbookDocs.forEach((doc) => {
      content += `- [${doc.title}](../../${doc.path})\n`;
    });

    return content;
  }

  // Generate category report
  generateCategoryReport(category, docs) {
    let content = `# ${category} Documentation
Generated: ${new Date().toISOString()}
Total Documents: ${docs.length}

## Documents
`;

    // Sort by project and then by title
    docs.sort((a, b) => {
      if (a.project !== b.project) return a.project.localeCompare(b.project);
      return a.title.localeCompare(b.title);
    });

    let currentProject = '';
    docs.forEach((doc) => {
      if (doc.project !== currentProject) {
        currentProject = doc.project;
        content += `\n### ${currentProject}\n\n`;
      }

      content += `#### [${doc.title}](../../${doc.path})\n`;
      if (doc.description) {
        content += `> ${doc.description}\n`;
      }
      content += `- **Path**: ${doc.path}\n`;
      content += `- **Modified**: ${doc.daysSinceModified} days ago\n`;
      content += `- **Size**: ${(doc.size / 1024).toFixed(2)} KB | ${doc.lineCount} lines | ${doc.wordCount} words\n`;

      if (doc.apis && doc.apis.length > 0) {
        content += `- **APIs**: ${doc.apis.slice(0, 5).join(', ')}\n`;
      }

      if (doc.components && doc.components.length > 0) {
        content += `- **Components**: ${doc.components.slice(0, 5).join(', ')}\n`;
      }

      content += '\n';
    });

    return content;
  }

  // Generate project report
  generateProjectReport(project, docs) {
    let content = `# ${project} Documentation
Generated: ${new Date().toISOString()}
Total Documents: ${docs.length}

## Statistics
`;

    // Category breakdown for this project
    const categories = {};
    docs.forEach((doc) => {
      categories[doc.category] = (categories[doc.category] || 0) + 1;
    });

    content += `### By Category\n`;
    Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => {
        content += `- ${cat}: ${count}\n`;
      });

    content += `\n## All Documents\n\n`;

    // Group by category
    const byCategory = {};
    docs.forEach((doc) => {
      if (!byCategory[doc.category]) {
        byCategory[doc.category] = [];
      }
      byCategory[doc.category].push(doc);
    });

    Object.entries(byCategory)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([category, categoryDocs]) => {
        content += `### ${category}\n\n`;

        categoryDocs
          .sort((a, b) => a.title.localeCompare(b.title))
          .forEach((doc) => {
            content += `- [${doc.title}](../../${doc.path})`;
            if (doc.daysSinceModified > 30) {
              content += ` ⚠️ ${doc.daysSinceModified} days old`;
            }
            content += `\n`;
          });

        content += '\n';
      });

    return content;
  }

  // Generate statistics report
  generateStatisticsReport() {
    let content = `# Documentation Statistics Report
Generated: ${new Date().toISOString()}

## Overall Statistics
- **Total Documents**: ${this.statistics.total}
- **Total Projects**: ${Object.keys(this.statistics.byProject).length}
- **Total Categories**: ${Object.keys(this.statistics.byCategory).length}

## By Project
`;

    Object.entries(this.statistics.byProject)
      .sort((a, b) => b[1] - a[1])
      .forEach(([project, count]) => {
        const percentage = ((count / this.statistics.total) * 100).toFixed(1);
        content += `- ${project}: ${count} (${percentage}%)\n`;
      });

    content += `\n## By Category\n`;

    Object.entries(this.statistics.byCategory)
      .sort((a, b) => b[1] - a[1])
      .forEach(([category, count]) => {
        const percentage = ((count / this.statistics.total) * 100).toFixed(1);
        content += `- ${category}: ${count} (${percentage}%)\n`;
      });

    content += `\n## Quality Metrics\n\n`;
    content += `### Duplicates (${this.statistics.duplicates.length})\n`;

    this.statistics.duplicates.slice(0, 20).forEach((dup) => {
      content += `- Original: ${dup.original}\n`;
      content += `  Duplicate: ${dup.duplicate}\n`;
    });

    content += `\n### Outdated Documents (>90 days) (${this.statistics.outdated.length})\n`;

    this.statistics.outdated.slice(0, 20).forEach((path) => {
      content += `- ${path}\n`;
    });

    content += `\n## Coverage Analysis\n\n`;

    // Check for missing critical documentation
    const criticalDocs = {
      'API Documentation': this.documents.filter((d) => d.category === 'API').length,
      'User Journeys': this.documents.filter((d) => d.category === 'USER_JOURNEY').length,
      Runbooks: this.documents.filter((d) => d.category === 'RUNBOOK').length,
      Architecture: this.documents.filter((d) => d.category === 'ARCHITECTURE').length,
      Testing: this.documents.filter((d) => d.category === 'TESTING').length,
      Security: this.documents.filter((d) => d.category === 'SECURITY').length,
    };

    Object.entries(criticalDocs).forEach(([type, count]) => {
      const status = count > 5 ? '✅' : count > 0 ? '⚠️' : '❌';
      content += `- ${type}: ${status} ${count} documents\n`;
    });

    return content;
  }

  // Main execution
  async run() {
    console.log('🔍 Starting documentation scan...');
    await this.scanDirectory(ECOSYSTEM_ROOT);

    console.log(`📊 Found ${this.statistics.total} documents`);
    console.log('📝 Generating reports...');
    await this.generateReports();

    console.log(`✅ Documentation tracking complete!`);
    console.log(`📁 Reports saved to: ${OUTPUT_DIR}`);

    // Print summary
    console.log('\n📈 Summary:');
    console.log(`- Total Documents: ${this.statistics.total}`);
    console.log(`- Duplicates: ${this.statistics.duplicates.length}`);
    console.log(`- Outdated: ${this.statistics.outdated.length}`);
    console.log(`- Projects: ${Object.keys(this.statistics.byProject).join(', ')}`);
  }
}

// Execute
const tracker = new DocumentationTracker();
tracker.run().catch(console.error);
