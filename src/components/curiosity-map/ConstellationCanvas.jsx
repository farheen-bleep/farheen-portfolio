import React from 'react';
import { curiosityCategories } from '../../data/curiosityMap';
import './ConstellationCanvas.css';

export default function ConstellationCanvas({
  nodes,
  links,
  selectedNode,
  hoveredNode,
  activeCategory,
  onSelectNode,
  onHoverNode
}) {
  // Determine active focus ID
  const activeFocusId = selectedNode?.id || hoveredNode?.id || null;

  // Set of directly connected node IDs to active node
  const connectedNodeIds = new Set();
  if (activeFocusId) {
    connectedNodeIds.add(activeFocusId);
    links.forEach((l) => {
      if (l.source === activeFocusId) connectedNodeIds.add(l.target);
      if (l.target === activeFocusId) connectedNodeIds.add(l.source);
    });
  }

  // Lookup map for fast coordinate access
  const nodeMap = new Map();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  // Keyboard accessibility handler
  const handleKeyDown = (e, node) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectNode(node);
    }
  };

  // Subtle celestial dust points
  const celestialDust = [
    { cx: 140, cy: 80, r: 1.4 },
    { cx: 310, cy: 40, r: 1.6 },
    { cx: 470, cy: 110, r: 1.2 },
    { cx: 720, cy: 60, r: 1.5 },
    { cx: 910, cy: 120, r: 1.5 },
    { cx: 190, cy: 470, r: 1.4 },
    { cx: 370, cy: 550, r: 1.6 },
    { cx: 740, cy: 480, r: 1.4 },
    { cx: 890, cy: 420, r: 1.2 },
    { cx: 50, cy: 290, r: 1.4 },
    { cx: 640, cy: 30, r: 1.3 }
  ];

  return (
    <div className="constellation-svg-wrapper">
      <svg
        viewBox="0 0 960 590"
        className="constellation-svg"
        role="img"
        aria-label="Interactive Curiosity Map: Constellation of Farheen Hawawala's projects, technical skills, and interests"
      >
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="constellation-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.75" fill="#C8CDC6" opacity="0.6" />
          </pattern>

          {/* Glow filter for active lines */}
          <filter id="active-line-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#50687E" floodOpacity="0.5" />
          </filter>

          {/* Crisp node shadow */}
          <filter id="node-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#22262B" floodOpacity="0.14" />
          </filter>
        </defs>

        {/* Canvas Background with Subtle Warm Ivory */}
        <rect width="960" height="590" fill="#FFFFF0" rx="12" />
        <rect width="960" height="590" fill="url(#constellation-grid)" rx="12" />

        {/* Celestial Dust Dots */}
        <g className="celestial-dust" aria-hidden="true">
          {celestialDust.map((dust, i) => (
            <circle
              key={i}
              cx={dust.cx}
              cy={dust.cy}
              r={dust.r}
              fill="#BAC4CE"
              opacity="0.85"
            />
          ))}
        </g>

        {/* Constellation Connection Lines */}
        <g className="constellation-links-layer" aria-hidden="true">
          {links.map((link, idx) => {
            const src = nodeMap.get(link.source);
            const tgt = nodeMap.get(link.target);
            if (!src || !tgt) return null;

            const isLinkConnectedToActive =
              activeFocusId &&
              (link.source === activeFocusId || link.target === activeFocusId);

            const isLinkDimmed =
              activeFocusId && !isLinkConnectedToActive;

            const matchesCategory =
              activeCategory === 'all' ||
              src.category === activeCategory ||
              tgt.category === activeCategory;

            return (
              <line
                key={`${link.source}-${link.target}-${idx}`}
                x1={src.x}
                y1={src.y}
                x2={tgt.x}
                y2={tgt.y}
                className={`constellation-line ${
                  isLinkConnectedToActive ? 'line-active' : ''
                } ${isLinkDimmed || !matchesCategory ? 'line-dimmed' : ''}`}
                filter={isLinkConnectedToActive ? 'url(#active-line-glow)' : undefined}
              />
            );
          })}
        </g>

        {/* Interactive Constellation Nodes */}
        <g className="constellation-nodes-layer">
          {nodes.map((node, index) => {
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode?.id === node.id;
            const isConnectedNeighbor =
              activeFocusId && connectedNodeIds.has(node.id) && !isSelected && !isHovered;
            const categoryMeta = curiosityCategories[node.category] || {};

            // Category filtering check
            const matchesCategory =
              activeCategory === 'all' || node.category === activeCategory;

            // Dimming logic
            const isDimmed =
              (activeFocusId && !connectedNodeIds.has(node.id)) ||
              (!matchesCategory && !isSelected);

            // Floating animation phase
            const floatClass = `float-phase-${(index % 4) + 1}`;

            const isProject = node.category === 'project';
            const isInterest = node.category === 'interest';

            // Dynamic label positioning based on node layout
            const labelY =
              node.labelPos === 'top'
                ? node.y - node.r - 9
                : node.y + node.r + 17;

            return (
              <g
                key={node.id}
                tabIndex={0}
                role="button"
                aria-label={`${node.name} (${categoryMeta.label || node.category}). Status: ${node.status}. Click or press Enter to view details.`}
                aria-pressed={isSelected}
                className={`constellation-node-group ${floatClass} ${
                  isSelected ? 'node-selected' : ''
                } ${isHovered ? 'node-hovered' : ''} ${
                  isConnectedNeighbor ? 'node-neighbor' : ''
                } ${isDimmed ? 'node-dimmed' : ''}`}
                onClick={() => onSelectNode(node)}
                onMouseEnter={() => onHoverNode(node)}
                onMouseLeave={() => onHoverNode(null)}
                onFocus={() => onHoverNode(node)}
                onBlur={() => onHoverNode(null)}
                onKeyDown={(e) => handleKeyDown(e, node)}
                transform={`translate(0, 0)`}
              >
                {/* Orbital concentric ring for Projects & Core Interests */}
                {isProject && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r + 6}
                    className="project-orbital-ring"
                  />
                )}

                {isInterest && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r + 5}
                    className="interest-orbital-ring"
                  />
                )}

                {/* Direct Neighbor Ring (when connected to selected node) */}
                {isConnectedNeighbor && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r + 5}
                    className="neighbor-halo-ring"
                  />
                )}

                {/* Selected Node Active Double Halo Ring */}
                {isSelected && (
                  <>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r + 9}
                      className="node-selected-outer-ring"
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r + 4}
                      className="node-selected-inner-ring"
                    />
                  </>
                )}

                {/* Hover ring */}
                {isHovered && !isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r + 6}
                    className="node-hover-ring"
                  />
                )}

                {/* Primary Node Body Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={isProject ? '#FFFFFF' : isInterest ? '#262B31' : '#FFFFFF'}
                  stroke={isSelected ? '#50687E' : categoryMeta.color || '#30343B'}
                  strokeWidth={isSelected ? 3.2 : isProject ? 2.6 : 2.2}
                  filter="url(#node-shadow)"
                  className="node-circle"
                />

                {/* Internal Node Glyphs / Markers */}
                {isProject && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r - 8}
                    fill="#50687E"
                    className="node-inner-core"
                  />
                )}

                {isInterest && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={5}
                    fill="#FFFFF0"
                    className="node-inner-dot"
                  />
                )}

                {!isProject && !isInterest && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r - 7}
                    fill={categoryMeta.color || '#50687E'}
                    className="node-inner-dot"
                  />
                )}

                {/* Typographic Label with High-Contrast Text Halo */}
                <text
                  x={node.x}
                  y={labelY}
                  textAnchor="middle"
                  className={`node-label ${isProject ? 'label-project' : ''} ${
                    isInterest ? 'label-interest' : ''
                  }`}
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
