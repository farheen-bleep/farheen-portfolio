import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './ProjectDetailLayout.css';

export default function ProjectHeader({ project }) {
  return (
    <section className="project-hero-header">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="project-breadcrumb">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-active">{project.title}</span>
        </div>

        {/* Status & Categorization */}
        <div className="header-badge-row">
          <span className="badge">{project.status}</span>
          <span className="project-category-kicker">Engineering Case Study</span>
        </div>

        {/* Project Title & Tagline */}
        <h1 className="project-hero-title">{project.title}</h1>
        <p className="project-hero-tagline">{project.tagline}</p>

        {/* Tech Stack Pills */}
        <div className="project-pills-row" aria-label="Core technologies used">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-pill-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

