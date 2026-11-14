import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './ProjectDetailLayout.css';

export default function ProjectFeatures({ project }) {
  if (!project.keyFeatures || project.keyFeatures.length === 0) return null;

  return (
    <div className="case-content-section features-section">
      <span className="case-section-kicker">05 / Capabilities</span>
      <h2 className="case-section-heading">Key Architectural Features</h2>

      <div className="features-card-grid">
        {project.keyFeatures.map((feat, idx) => (
          <div key={idx} className="feature-card-item">
            <div className="feature-item-num">0{idx + 1}</div>
            <div className="feature-item-body">
              <span className="feature-text">{feat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

