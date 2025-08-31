/**
 * Portfolio Dashboard - Product Showcase
 * A beautiful landing page showcasing all products in the ecosystem
 * Inspired by Supabase and Parlant design systems
 */

import React, { useState, useEffect } from 'react';
import './portfolio-dashboard.css';

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  gradient: string;
  url: string;
  status: 'live' | 'beta' | 'coming-soon';
  features: string[];
  techStack: string[];
  metrics?: {
    users?: string;
    rating?: number;
    downloads?: string;
  };
}

const products: Product[] = [
  {
    id: 'quizmentor',
    name: 'QuizMentor',
    tagline: 'Adaptive Learning Platform',
    description:
      'Personalized quiz experiences that adapt to your learning pace. Track progress, compete with friends, and master new topics through gamified learning.',
    icon: '🎓',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    url: 'https://quizmentor.ai',
    status: 'live',
    features: [
      'Adaptive questioning',
      'Real-time leaderboards',
      'Achievement system',
      'Progress tracking',
    ],
    techStack: ['React Native', 'TypeScript', 'Supabase', 'Node.js'],
    metrics: {
      users: '10K+',
      rating: 4.8,
      downloads: '50K+',
    },
  },
  {
    id: 'devmentor',
    name: 'DevMentor',
    tagline: 'AI Development Assistant',
    description:
      'Your intelligent coding companion that learns your patterns and helps you write better code faster. Get contextual suggestions and automated workflows.',
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    url: 'https://devmentor.ai',
    status: 'beta',
    features: [
      'Code completion',
      'Pattern learning',
      'Automated refactoring',
      'Documentation generation',
    ],
    techStack: ['VS Code API', 'TypeScript', 'OpenAI', 'Python'],
    metrics: {
      users: '5K+',
      rating: 4.9,
      downloads: '25K+',
    },
  },
  {
    id: 'harvest',
    name: 'Harvest',
    tagline: 'Smart Time Tracking',
    description:
      'Effortlessly track time across projects with intelligent categorization. Get insights into your productivity and optimize your workflow.',
    icon: '⏱️',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    url: 'https://harvest.ai',
    status: 'live',
    features: [
      'Automatic tracking',
      'Project analytics',
      'Team collaboration',
      'Invoice generation',
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    metrics: {
      users: '15K+',
      rating: 4.7,
      downloads: '100K+',
    },
  },
  {
    id: 'omni',
    name: 'Omni',
    tagline: 'Universal AI for VS Code',
    description:
      'One extension to rule them all. Connect to any AI provider and switch seamlessly between models without changing your workflow.',
    icon: '🔮',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    url: 'https://omni.dev',
    status: 'beta',
    features: ['Multi-provider support', 'Model switching', 'Custom prompts', 'Token optimization'],
    techStack: ['VS Code Extension API', 'TypeScript', 'Multiple AI APIs'],
    metrics: {
      users: '8K+',
      rating: 4.9,
      downloads: '40K+',
    },
  },
];

export const PortfolioDashboard: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'beta'>('all');
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const filteredProducts = products.filter((product) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'live') return product.status === 'live';
    if (activeFilter === 'beta') return product.status === 'beta';
    return true;
  });

  return (
    <div className={`portfolio-dashboard ${animateIn ? 'animate-in' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
          <div className="gradient-orb orb-3" />
          <div className="grid-pattern" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">🚀 Building the Future of Developer Tools</span>
          </div>

          <h1 className="hero-title">
            One Vision,
            <span className="gradient-text"> Multiple Solutions</span>
          </h1>

          <p className="hero-description">
            A suite of powerful tools designed to enhance your productivity, learning, and
            development workflow. Each product seamlessly integrates into your daily routine.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">38K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">215K+</div>
              <div className="stat-label">Downloads</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">4.8</div>
              <div className="stat-label">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Filter */}
      <section className="filter-section">
        <div className="filter-container">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Products
          </button>
          <button
            className={`filter-btn ${activeFilter === 'live' ? 'active' : ''}`}
            onClick={() => setActiveFilter('live')}
          >
            <span className="status-dot live" />
            Live
          </button>
          <button
            className={`filter-btn ${activeFilter === 'beta' ? 'active' : ''}`}
            onClick={() => setActiveFilter('beta')}
          >
            <span className="status-dot beta" />
            Beta
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card"
              style={
                {
                  '--card-gradient': product.gradient,
                  '--animation-delay': `${index * 100}ms`,
                } as React.CSSProperties
              }
              onClick={() => setSelectedProduct(product)}
            >
              <div className="card-header">
                <div className="card-icon">{product.icon}</div>
                <div className="card-status">
                  <span className={`status-badge ${product.status}`}>
                    {product.status === 'coming-soon' ? 'Soon' : product.status}
                  </span>
                </div>
              </div>

              <h3 className="card-title">{product.name}</h3>
              <p className="card-tagline">{product.tagline}</p>
              <p className="card-description">{product.description}</p>

              <div className="card-features">
                {product.features.slice(0, 3).map((feature, i) => (
                  <span key={i} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="card-footer">
                <div className="card-metrics">
                  {product.metrics?.users && (
                    <span className="metric">
                      <svg className="metric-icon" viewBox="0 0 16 16" width="14" height="14">
                        <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 11c-2.05 0-3.87-.92-5.1-2.37C3.73 10.24 5.76 9.5 8 9.5s4.27.74 5.1 2.13C11.87 13.08 10.05 14 8 14z" />
                      </svg>
                      {product.metrics.users}
                    </span>
                  )}
                  {product.metrics?.rating && (
                    <span className="metric">
                      <svg className="metric-icon" viewBox="0 0 16 16" width="14" height="14">
                        <path d="M8 .25l2.09 4.23 4.66.68-3.37 3.29.8 4.64L8 10.89l-4.18 2.2.8-4.64L1.25 5.16l4.66-.68z" />
                      </svg>
                      {product.metrics.rating}
                    </span>
                  )}
                </div>
                <a
                  href={product.url}
                  className="card-link"
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-header">
          <h2>Why Choose Our Ecosystem?</h2>
          <p>Built with modern technologies and best practices</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h4>Secure by Design</h4>
            <p>End-to-end encryption, SOC 2 compliant, and regular security audits</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>Lightning Fast</h4>
            <p>Optimized performance with edge computing and intelligent caching</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h4>Global Scale</h4>
            <p>Deployed across multiple regions for low latency worldwide</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h4>Developer First</h4>
            <p>Comprehensive APIs, SDKs, and documentation for seamless integration</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of developers and teams already using our tools</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Explore Products</button>
            <button className="btn btn-secondary">View Documentation</button>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-modal" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              ✕
            </button>

            <div className="modal-header" style={{ background: selectedProduct.gradient }}>
              <div className="modal-icon">{selectedProduct.icon}</div>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.tagline}</p>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>About</h3>
                <p>{selectedProduct.description}</p>
              </div>

              <div className="modal-section">
                <h3>Key Features</h3>
                <ul className="feature-list">
                  {selectedProduct.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h3>Tech Stack</h3>
                <div className="tech-tags">
                  {selectedProduct.techStack.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <a
                  href={selectedProduct.url}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {selectedProduct.name} →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
