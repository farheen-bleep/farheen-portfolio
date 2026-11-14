import React from 'react';
import { curiosityCategories } from '../../data/curiosityMap';
import './MobileListView.css';

export default function MobileListView({
  nodes,
  selectedNode,
  activeCategory,
  onSelectNode
}) {
  // Group nodes by category
  const categoriesToRender =
    activeCategory === 'all'
      ? ['project', 'interest', 'technology', 'database', 'devops']
      : [activeCategory];

  return (
    <div className="mobile-constellation-list" role="region" aria-label="Interactive Curiosity Directory">
      {categoriesToRender.map((catKey) => {
        const catMeta = curiosityCategories[catKey];
        const categoryNodes = nodes.filter((n) => n.category === catKey);
        if (!categoryNodes.length) return null;

        return (
          <div key={catKey} className="mobile-category-group">
            <div className="mobile-group-header">
              <span
                className="mobile-group-dot"
                style={{ backgroundColor: catMeta?.color }}
                aria-hidden="true"
              />
              <h4 className="mobile-group-title">{catMeta?.label || catKey}</h4>
              <span className="mobile-group-count">{categoryNodes.length}</span>
            </div>

            <div className="mobile-nodes-grid">
              {categoryNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    className={`mobile-node-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => onSelectNode(node)}
                    aria-pressed={isSelected}
                  >
                    <div className="mobile-card-top">
                      <span className="mobile-card-name">{node.name}</span>
                      <span className="mobile-card-status">{node.status}</span>
                    </div>

                    {node.roleNote && (
                      <span className="mobile-card-role">{node.roleNote}</span>
                    )}

                    <p className="mobile-card-summary">{node.summary}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

