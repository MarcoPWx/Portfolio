'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export type ArchNode = { id: string; label: string; color?: string };
export type ArchEdge = { from: string; to: string };

export function MiniArchGraph({
  nodes,
  edges,
  height = 180,
}: {
  nodes: ArchNode[];
  edges: ArchEdge[];
  height?: number;
}) {
  const { width, heightBox, positioned } = useMemo(() => {
    const width = 400; // viewBox width
    const heightBox = 220; // viewBox height
    const centerX = width / 2;
    const centerY = heightBox / 2;
    const radius = Math.min(width, heightBox) * 0.35;

    const positioned = nodes.map((n, i) => {
      const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2; // start at top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { ...n, x, y } as ArchNode & { x: number; y: number };
    });

    return { width, heightBox, positioned };
  }, [nodes]);

  const posMap = useMemo(() => {
    const map: Record<string, { x: number; y: number; color?: string; label: string }> = {};
    positioned.forEach(
      (p) => (map[p.id] = { x: (p as any).x, y: (p as any).y, color: p.color, label: p.label }),
    );
    return map;
  }, [positioned]);

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${heightBox}`}
        style={{ width: '100%', height }}
        role="img"
        aria-label="Architecture graph"
      >
        {/* Edges */}
        {edges.map((e, i) => {
          const a = posMap[e.from];
          const b = posMap[e.to];
          if (!a || !b) return null;
          const key = `${e.from}-${e.to}-${i}`;
          return (
            <motion.line
              key={key}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#64748b"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              initial={{ strokeDashoffset: 0, opacity: 0.7 }}
              animate={{ strokeDashoffset: 16, opacity: 0.9 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />
          );
        })}

        {/* Center glow */}
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Nodes */}
        {positioned.map((n, i) => {
          const fill = n.color || '#10b981'; // emerald-500
          return (
            <g key={n.id}>
              <motion.circle
                cx={(n as any).x}
                cy={(n as any).y}
                r={12}
                fill={fill}
                stroke="#0f172a"
                strokeWidth={2}
                initial={{ scale: 1, opacity: 0.95 }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx={(n as any).x}
                cy={(n as any).y}
                r={24}
                fill="url(#nodeGlow)"
                initial={{ opacity: 0.15 }}
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 2.4 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
              />
              <text
                x={(n as any).x}
                y={(n as any).y + 26}
                textAnchor="middle"
                fontSize={10}
                fill="#cbd5e1"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
