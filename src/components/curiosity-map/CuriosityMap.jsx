import React, { useState, useMemo } from 'react';
import { Network, Sparkles, List, Compass, Info } from 'lucide-react';
import { curiosityCategories, curiosityNodes, curiosityLinks } from '../../data/curiosityMap';
import MapLegend from './MapLegend';
import ConstellationCanvas from './ConstellationCanvas';
import NodeDetailPanel from './NodeDetailPanel';
import MobileListView from './MobileListView';
import './CuriosityMap.css';

export default function CuriosityMap() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('map'); // 'map' | 'list'

  // Map of nodes by ID for fast relationship lookups
  const nodeMap = useMemo(() => {
    const map = new Map();
    curiosityNodes.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  // Compute directly connected nodes for the currently selected node
  const connectedNodes = useMemo(() => {
    if (!selectedNode) return [];
    const neighbors = [];
    curiosityLinks.forEach((link) => {
      if (link.source === selectedNode.id) {
        const neighbor = nodeMap.get(link.target);
        if (neighbor) neighbors.push(neighbor);
      } else if (link.target === selectedNode.id) {
        const neighbor = nodeMap.get(link.source);
        if (neighbor) neighbors.push(neighbor);
      }
    });
    return neighbors;
  }, [selectedNode, nodeMap]);

  // Handle node selection toggle
  const handleSelectNode = (node) => {
    if (selectedNode?.id === node.id) {
      setSelectedNode(null); // Clicking currently selected node deselects it
    } else {
      setSelectedNode(node);
    }
  };

  // Reset full graph
  const handleReset = () => {
    setSelectedNode(null);
    setHoveredNode(null);
    setActiveCategory('all');
  };

  return (
    <section className="section curiosity-map-section" id="curiosity-map">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker">03 / Signature Feature</div>
          <h2 className="section-title">Interactive Curiosity Map</h2>
          <p className="section-subtitle">
            A topological constellation mapping the relationships between my software projects, backend technologies, databases, and ongoing DevOps exploration.
          </p>
        </div>

        {/* User Interaction Instructions & View Mode Switcher */}
        <div className="curiosity-controls-header">
          <div className="curiosity-instruction-text">
            <Info size={15} className="instruction-icon" />
            <span>
              Click or tap any node to inspect direct dependencies and technical role. Click a project node to navigate to its case study.
            </span>
          </div>

          {/* View Mode Toggle (Map vs List) */}
          <div className="view-toggle-group" role="group" aria-label="Constellation view options">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'map' ? 'is-active' : ''}`}
              onClick={() => setViewMode('map')}
              title="Display interactive constellation SVG"
            >
              <Compass size={14} />
              <span>Constellation View</span>
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'list' ? 'is-active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Display accessible directory list"
            >
              <List size={14} />
              <span>Directory View</span>
            </button>
          </div>
        </div>

        {/* Category Legend & Filter Pills */}
        <MapLegend
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onReset={handleReset}
          hasSelection={Boolean(selectedNode)}
        />

        {/* Main Display: Side-by-Side Canvas + Sticky Detail Dock */}
        <div className="curiosity-display-area">
          <div className="curiosity-primary-view">
            {viewMode === 'map' ? (
              <ConstellationCanvas
                nodes={curiosityNodes}
                links={curiosityLinks}
                selectedNode={selectedNode}
                hoveredNode={hoveredNode}
                activeCategory={activeCategory}
                onSelectNode={handleSelectNode}
                onHoverNode={setHoveredNode}
              />
            ) : (
              <MobileListView
                nodes={curiosityNodes}
                selectedNode={selectedNode}
                activeCategory={activeCategory}
                onSelectNode={handleSelectNode}
              />
            )}
          </div>

          {/* Contextual Node Detail Panel (Sticky Dock) */}
          <div className="curiosity-detail-dock">
            {selectedNode ? (
              <NodeDetailPanel
                node={selectedNode}
                connectedNodes={connectedNodes}
                onSelectNode={handleSelectNode}
                onClose={() => setSelectedNode(null)}
              />
            ) : (
              <div className="curiosity-idle-card">
                <div className="idle-icon-wrap">
                  <Sparkles size={20} className="idle-icon" />
                </div>
                <div className="idle-content">
                  <h4 className="idle-title">Explore Knowledge Connections</h4>
                  <p className="idle-desc">
                    Click any node in the constellation or choose a key focus below to inspect its role and relationships.
                  </p>
                  <div className="idle-quick-links">
                    <span className="quick-label">Quick start:</span>
                    <button
                      type="button"
                      className="quick-chip"
                      onClick={() => handleSelectNode(nodeMap.get('procurehub'))}
                    >
                      ProcureHub
                    </button>
                    <button
                      type="button"
                      className="quick-chip"
                      onClick={() => handleSelectNode(nodeMap.get('devops-interest'))}
                    >
                      DevOps
                    </button>
                    <button
                      type="button"
                      className="quick-chip"
                      onClick={() => handleSelectNode(nodeMap.get('backend-dev'))}
                    >
                      Backend Dev
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
