import React from 'react';
import { GitBranch, ExternalLink, ShieldCheck, Layers, Terminal, Info } from 'lucide-react';
import './ProjectDetailLayout.css';

export default function ProjectMetadata({ project }) {
  return (
    <aside className="case-metadata-sidebar" aria-label="Project metadata">
      <div className="metadata-card">
        <span className="metadata-card-kicker">Project Specifications</span>

        {/* Development Status */}
        <div className="meta-spec-item">
          <span className="spec-label">Development Status</span>
          <div className="spec-value-badge">
            <span className="status-dot-active" />
            <span>{project.status}</span>
          </div>
        </div>

        {/* Roles if available */}
        {project.roles && project.roles.length > 0 && (
          <div className="meta-spec-item">
            <span className="spec-label">Supported Roles</span>
            <div className="roles-pill-wrap">
              {project.roles.map((r) => (
                <span key={r} className="role-mini-pill">{r}</span>
              ))}
            </div>
          </div>
        )}

        {/* Technology Stack List */}
        <div className="meta-spec-item">
          <span className="spec-label">Full Technology Stack</span>
          <div className="meta-tech-list">
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-badge-pill">{tech}</span>
            ))}
          </div>
        </div>

        {/* Source Repository Link */}
        <div className="meta-spec-item">
          <span className="spec-label">Source Code Repository</span>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="meta-action-link"
            >
              <GitBranch size={15} />
              <span>GitHub Repository</span>
              <ExternalLink size={13} />
            </a>
          ) : (
            <div className="meta-pending-box">
              <GitBranch size={15} className="pending-icon" />
              <span>Repository URL Pending</span>
              <span className="pending-micro-tag">Release Soon</span>
            </div>
          )}
        </div>

        {/* Live Deployment Link */}
        <div className="meta-spec-item">
          <span className="spec-label">Live Deployment</span>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="meta-action-link"
            >
              <ExternalLink size={15} />
              <span>Launch Live App</span>
            </a>
          ) : (
            <div className="meta-pending-box">
              <ExternalLink size={15} className="pending-icon" />
              <span>No Public Demo Active</span>
              <span className="pending-micro-tag">Local Only</span>
            </div>
          )}
        </div>

        {/* Academic & Verification Integrity */}
        <div className="metadata-integrity-note">
          <Info size={13} className="integrity-icon" />
          <span>Verified coursework and personal engineering project details.</span>
        </div>
      </div>
    </aside>
  );
}

