import React from 'react';
import { render, screen } from '@testing-library/react';
import { MiniArchGraph, ArchNode, ArchEdge } from '../../src/components/MiniArchGraph';

describe('MiniArchGraph', () => {
  it('renders an SVG with nodes and edges', () => {
    const nodes: ArchNode[] = [
      { id: 'gateway', label: 'API Gateway' },
      { id: 'service', label: 'Service' },
      { id: 'db', label: 'DB' },
    ];
    const edges: ArchEdge[] = [
      { from: 'gateway', to: 'service' },
      { from: 'service', to: 'db' },
    ];

    const { container } = render(<MiniArchGraph nodes={nodes} edges={edges} />);

    // Accessible SVG
    expect(screen.getByRole('img', { name: /architecture graph/i })).toBeInTheDocument();

    // Labels appear
    expect(screen.getByText('API Gateway')).toBeInTheDocument();
    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('DB')).toBeInTheDocument();

    // Lines rendered for edges
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBeGreaterThanOrEqual(2);

    // Circles rendered for nodes
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThanOrEqual(nodes.length);
  });
});

