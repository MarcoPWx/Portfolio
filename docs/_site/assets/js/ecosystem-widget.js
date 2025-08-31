/**
 * Ecosystem Widget for Jekyll Sites
 * A vanilla JavaScript implementation of the React EcosystemWidget
 */

class EcosystemWidget {
  constructor(options = {}) {
    this.currentProduct = options.currentProduct || null;
    this.position = options.position || 'bottom-right';
    this.theme = options.theme || 'dark';
    this.expanded = options.expanded || false;

    this.isExpanded = this.expanded;
    this.isMinimized = false;
    this.selectedProduct = null;

    this.products = [
      {
        id: 'devmentor',
        name: 'DevMentor',
        tagline: 'AI Development Assistant',
        icon: '🧠',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        url: '/devmentor/',
        status: 'beta',
        description: 'AI assistant that learns your coding patterns',
      },
      {
        id: 'quizmentor',
        name: 'QuizMentor',
        tagline: 'Adaptive Learning Platform',
        icon: '🎓',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        url: '/quizmentor/',
        status: 'live',
        description: 'Personalized quizzes that adapt to your learning pace',
      },
      {
        id: 'harvest',
        name: 'Harvest.ai',
        tagline: 'Time & Project Tracking',
        icon: '🌾',
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        url: '/harvest/',
        status: 'live',
        description: 'Smart time tracking for developers and teams',
      },
      {
        id: 'auth',
        name: 'NatureQuest Auth',
        tagline: 'Unified Authentication',
        icon: '🔐',
        color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        url: '/naturequest-auth/',
        status: 'beta',
        description: 'Single sign-on across the ecosystem',
      },
    ];

    this.init();
  }

  init() {
    // Check if user has minimized before
    const minimized = localStorage.getItem('ecosystem-widget-minimized');
    if (minimized === 'true') {
      this.isMinimized = true;
    }

    this.createWidget();
    this.attachEventListeners();
  }

  createWidget() {
    // Remove existing widget if any
    const existing = document.getElementById('ecosystem-widget');
    if (existing) {
      existing.remove();
    }

    const widget = document.createElement('div');
    widget.id = 'ecosystem-widget';
    widget.className = `ecosystem-widget ${this.position} ${this.theme}`;

    if (this.isMinimized) {
      widget.classList.add('minimized');
      widget.innerHTML = this.renderMinimized();
    } else if (this.isExpanded) {
      widget.innerHTML = this.renderExpanded();
    } else {
      widget.innerHTML = this.renderCollapsed();
    }

    document.body.appendChild(widget);
  }

  renderMinimized() {
    return `
      <button class="ecosystem-fab" onclick="ecosystemWidget.restore()">
        <span class="fab-icon">🌟</span>
      </button>
    `;
  }

  renderCollapsed() {
    return `
      <div class="ecosystem-collapsed">
        <button class="ecosystem-toggle" onclick="ecosystemWidget.expand()">
          <div class="ecosystem-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span class="ecosystem-text">Explore Ecosystem</span>
          <span class="ecosystem-arrow">→</span>
        </button>
      </div>
    `;
  }

  renderExpanded() {
    const otherProducts = this.products.filter((p) => p.id !== this.currentProduct);

    return `
      <div class="ecosystem-expanded">
        <div class="ecosystem-header">
          <h3>NatureQuest Ecosystem</h3>
          <div class="ecosystem-actions">
            <button class="btn-minimize" onclick="ecosystemWidget.minimize()" title="Minimize">
              −
            </button>
            <button class="btn-minimize" onclick="ecosystemWidget.collapse()" title="Close">
              ×
            </button>
          </div>
        </div>
        
        <div class="ecosystem-products">
          ${otherProducts.map((product) => this.renderProductCard(product)).join('')}
        </div>
        
        <div class="ecosystem-footer">
          <p class="ecosystem-message">
            <strong>One ecosystem</strong>, multiple solutions for your development needs.
          </p>
        </div>
      </div>
    `;
  }

  renderProductCard(product) {
    const badgeClass =
      product.status === 'beta' ? 'beta' : product.status === 'coming-soon' ? 'soon' : '';
    const badge = badgeClass
      ? `<span class="badge ${badgeClass}">${product.status.toUpperCase()}</span>`
      : '';

    return `
      <div class="product-card ${product.status === 'coming-soon' ? 'coming-soon' : ''}" 
           style="--product-gradient: ${product.color}"
           onclick="ecosystemWidget.visitProduct('${product.url}')">
        <div class="product-icon">${product.icon}</div>
        <div class="product-info">
          <h4>${product.name}${badge}</h4>
          <p class="product-tagline">${product.tagline}</p>
        </div>
        <span class="product-arrow">→</span>
      </div>
    `;
  }

  expand() {
    this.isExpanded = true;
    this.createWidget();
  }

  collapse() {
    this.isExpanded = false;
    this.createWidget();
  }

  minimize() {
    this.isMinimized = true;
    this.isExpanded = false;
    localStorage.setItem('ecosystem-widget-minimized', 'true');
    this.createWidget();

    // Show again after 7 days
    setTimeout(
      () => {
        localStorage.removeItem('ecosystem-widget-minimized');
      },
      7 * 24 * 60 * 60 * 1000,
    );
  }

  restore() {
    this.isMinimized = false;
    localStorage.removeItem('ecosystem-widget-minimized');
    this.createWidget();
  }

  visitProduct(url) {
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  }

  attachEventListeners() {
    // Handle clicks outside the widget to close it
    document.addEventListener('click', (e) => {
      const widget = document.getElementById('ecosystem-widget');
      if (widget && this.isExpanded && !widget.contains(e.target)) {
        this.collapse();
      }
    });

    // Handle escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isExpanded) {
        this.collapse();
      }
    });
  }
}

// Auto-initialize the widget
let ecosystemWidget;

document.addEventListener('DOMContentLoaded', () => {
  // Detect current product based on URL
  const path = window.location.pathname;
  let currentProduct = null;

  if (path.includes('/devmentor/')) currentProduct = 'devmentor';
  else if (path.includes('/quizmentor/')) currentProduct = 'quizmentor';
  else if (path.includes('/harvest/')) currentProduct = 'harvest';
  else if (path.includes('/naturequest-auth/')) currentProduct = 'auth';

  // Initialize widget
  ecosystemWidget = new EcosystemWidget({
    currentProduct: currentProduct,
    position: 'bottom-right',
    theme: document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark',
  });
});

// Update theme when changed
document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        if (ecosystemWidget) {
          ecosystemWidget.theme =
            document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
          ecosystemWidget.createWidget();
        }
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
});
