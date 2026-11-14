import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Grid } from 'lucide-react';
import { projectsData } from '../../data/projects';
import './ProjectDetailLayout.css';

export default function ProjectNavFooter({ currentSlug }) {
  const currentIndex = projectsData.findIndex((p) => p.slug === currentSlug);

  // Compute circular previous and next projects
  const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
  const nextIndex = (currentIndex + 1) % projectsData.length;

  const prevProject = projectsData[prevIndex];
  const nextProject = projectsData[nextIndex];

  return (
    <nav className="project-nav-footer-bar" aria-label="Project Case Study Navigation">
      <div className="container nav-footer-container">
        {/* Previous Project */}
        <Link to={`/projects/${prevProject.slug}`} className="nav-arrow-item prev-arrow">
          <ArrowLeft size={16} className="nav-arrow-icon" />
          <div className="nav-text-col">
            <span className="nav-dir-tag">Previous Project</span>
            <span className="nav-proj-title">{prevProject.title}</span>
          </div>
        </Link>

        {/* Center Back to Overview */}
        <Link to="/#projects" className="nav-center-link">
          <Grid size={15} />
          <span>All Projects</span>
        </Link>

        {/* Next Project */}
        <Link to={`/projects/${nextProject.slug}`} className="nav-arrow-item next-arrow">
          <div className="nav-text-col text-right">
            <span className="nav-dir-tag">Next Project</span>
            <span className="nav-proj-title">{nextProject.title}</span>
          </div>
          <ArrowRight size={16} className="nav-arrow-icon" />
        </Link>
      </div>
    </nav>
  );
}

