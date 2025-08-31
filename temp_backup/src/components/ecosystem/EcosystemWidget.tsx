/**
 * Unified Product Ecosystem Widget
 * A reusable component to cross-promote your product suite
 * Can be embedded in any of your products (QuizMentor, DevMentor, Harvest, Omni)
 */

import React, { useState, useEffect } from 'react';
import './ecosystem-widget.css';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  url: string;
  status: 'live' | 'beta' | 'coming-soon';
  description?: string;
}

const products: Product[] = [
  {
    id: 'devmentor',
    name: 'DevMentor',
    tagline: 'AI Development Assistant',
    icon: '🧠',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    url: 'https://devmentor.ai',
    status: 'beta',
    description: 'AI assistant that learns your coding patterns'
  },
  {
    id: 'quizmentor',
    name: 'QuizMentor',
    tagline: 'Adaptive Learning Platform',
    icon: '🎓',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    url: 'https://quizmentor.ai',
    status: 'live',
    description: 'Personalized quizzes that adapt to your learning pace'
  },
  {
    id: 'harvest',
    name: 'Harvest',
    tagline: 'Time & Project Tracking',
    icon: '🌾',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    url: 'https://harvest.ai',
    status: 'live',
    description: 'Smart time tracking for developers and teams'
  },
  {
    id: 'omni',
    name: 'Omni',
    tagline: 'Universal AI for VS Code',
    icon: '🔮',
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    url: 'https://omni.dev',
    status: 'beta',
    description: 'One extension, every AI provider'
  }
];

interface EcosystemWidgetProps {
  currentProduct?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  expanded?: boolean;
}

export const EcosystemWidget: React.FC<EcosystemWidgetProps> = ({
  currentProduct,
  position = 'bottom-right',
  theme = 'dark',
  expanded: initialExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter out current product from the list
  const otherProducts = products.filter(p => p.id !== currentProduct);

  useEffect(() => {
    // Check if user has minimized before
    const minimized = localStorage.getItem('ecosystem-widget-minimized');
    if (minimized === 'true') {
      setIsMinimized(true);
    }
  }, []);

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsExpanded(false);
    localStorage.setItem('ecosystem-widget-minimized', 'true');
    
    // Show again after 7 days
    setTimeout(() => {
      localStorage.removeItem('ecosystem-widget-minimized');
    }, 7 * 24 * 60 * 60 * 1000);
  };

  const handleProductClick = (product: Product) => {
    if (product.status === 'live' || product.status === 'beta') {
      window.open(product.url, '_blank');
    } else {
      setSelectedProduct(product);
    }
  };

  if (isMinimized) {
    return (
      <div className={`ecosystem-widget minimized ${position} ${theme}`}>
        <button
          className="ecosystem-fab"
          onClick={() => setIsMinimized(false)}
          title="Explore our product ecosystem"
        >
          <span className="fab-icon">🚀</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`ecosystem-widget ${position} ${theme} ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {!isExpanded ? (
        // Collapsed state - small widget
        <div className="ecosystem-collapsed">
          <button
            className="ecosystem-toggle"
            onClick={() => setIsExpanded(true)}
          >
            <span className="ecosystem-logo">
              <svg width="24" height="24" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="url(#gradient)" strokeWidth="3" fill="none" />
                <circle cx="50" cy="50" r="35" stroke="url(#gradient)" strokeWidth="2" fill="none" opacity="0.7" />
                <circle cx="50" cy="50" r="25" stroke="url(#gradient)" strokeWidth="1.5" fill="none" opacity="0.5" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="ecosystem-text">Explore Our Apps</span>
            <span className="ecosystem-arrow">→</span>
          </button>
        </div>
      ) : (
        // Expanded state - full dashboard
        <div className="ecosystem-expanded">
          <div className="ecosystem-header">
            <h3>Our Product Ecosystem</h3>
            <div className="ecosystem-actions">
              <button onClick={handleMinimize} className="btn-minimize" title="Hide for 7 days">
                ✕
              </button>
            </div>
          </div>

          <div className="ecosystem-products">
            {otherProducts.map((product) => (
              <div
                key={product.id}
                className={`product-card ${product.status}`}
                onClick={() => handleProductClick(product)}
                style={{ '--product-gradient': product.color } as React.CSSProperties}
              >
                <div className="product-icon">{product.icon}</div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="product-tagline">{product.tagline}</p>
                  {product.status === 'beta' && <span className="badge beta">BETA</span>}
                  {product.status === 'coming-soon' && <span className="badge soon">SOON</span>}
                </div>
                <div className="product-arrow">→</div>
              </div>
            ))}
          </div>

          <div className="ecosystem-footer">
            <p className="ecosystem-message">
              🎯 <strong>One Account, All Products</strong> - Sign in once, access everything
            </p>
          </div>

          {selectedProduct && selectedProduct.status === 'coming-soon' && (
            <div className="product-modal">
              <div className="modal-content">
                <h4>{selectedProduct.name} - Coming Soon!</h4>
                <p>{selectedProduct.description}</p>
                <button onClick={() => setSelectedProduct(null)}>Got it!</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Standalone initialization for non-React environments
export function initEcosystemWidget(config?: EcosystemWidgetProps) {
  const container = document.createElement('div');
  container.id = 'ecosystem-widget-root';
  document.body.appendChild(container);
  
  // For non-React apps, we'd render with vanilla JS
  // This is a placeholder for the actual implementation
  console.log('Ecosystem widget initialized', config);
}

// VS Code Extension specific integration
export class VSCodeEcosystemProvider {
  constructor(private context: any) {}

  activate() {
    // Add status bar item
    const statusBarItem = this.context.createStatusBarItem();
    statusBarItem.text = '$(rocket) Explore Apps';
    statusBarItem.tooltip = 'Discover our product ecosystem';
    statusBarItem.command = 'ecosystem.showDashboard';
    statusBarItem.show();

    // Register command
    this.context.registerCommand('ecosystem.showDashboard', () => {
      // Show webview panel with ecosystem dashboard
      this.showEcosystemPanel();
    });
  }

  private showEcosystemPanel() {
    // Implementation for VS Code webview
    console.log('Showing ecosystem panel in VS Code');
  }
}
