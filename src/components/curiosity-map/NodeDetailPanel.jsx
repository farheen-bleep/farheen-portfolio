import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, GitFork, ExternalLink, Sparkles } from 'lucide-react';
import { curiosityCategories, curiosityNodes } from '../../data/curiosityMap';
import './NodeDetailPanel.css';

export default function NodeDetailPanel({ node, connectedNodes, onSelectNode, onClose }) {
  if (!node) return null;

  const categoryMeta = curiosityCategories[node.category] || {};

  return (
    <aside
      className="node-detail-panel"
      role="region"
      aria-label={`Details for ${node.name}`}
    >
      <div className="panel-header">
        <div className="panel-badge-group">
          <span
            className="panel-category-pill"
            style={{ borderColor: categoryMeta.color, color: categoryMeta.color }}
          >
            {categoryMeta.label || node.category}
          </span>
          <span className="panel-status-tag">{node.status}</span>
        </div>

        <button
          type="button"
          className="panel-close-btn"
          onClick={onClose}
          aria-label="Close details panel"
          title="Close details"
        >
          <X size={16} />
        </button>
      </div>

      <h3 className="panel-title">{node.name}</h3>

      {node.roleNote && (
        <span className="panel-role-note">{node.roleNote}</span>
      )}

      <p className="panel-summary">{node.summary}</p>

      {/* Connected Entities traversal */}
      {connectedNodes && connectedNodes.length > 0 && (
        <div className="panel-connections-section">
          <div className="connections-header">
            <GitFork size={13} className="connections-icon" />
            <span className="connections-label">Directly Connected Nodes ({connectedNodes.length})</span>
          </div>

          <div className="connected-chips-list">
            {connectedNodes.map((conn) => {
              const cat = curiosityCategories[conn.category] || {};
              return (
                <button
                  key={conn.id}
                  type="button"
                  className="connected-chip"
                  onClick={() => onSelectNode(conn)}
                  title={`Focus ${conn.name}`}
                >
                  <span
                    className="chip-dot"
                    style={{ backgroundColor: cat.color }}
                    aria-hidden="true"
                  />
                  <span>{conn.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Project Case Study Action */}
      {node.projectSlug && (
        <div className="panel-action-footer">
          <Link to={`/projects/${node.projectSlug}`} className="btn btn-primary panel-project-btn">
            <span>Explore {node.name} Case Study</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </aside>
  );
}

