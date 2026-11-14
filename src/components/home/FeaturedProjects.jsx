import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GitBranch, ExternalLink } from 'lucide-react';
import { projectsData } from '../../data/projects';
import './FeaturedProjects.css';

export default function FeaturedProjects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="section-header-block">
          <div className="section-kicker">02 / Selected Work</div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Practical academic and personal projects demonstrating full-stack engineering, API architecture, and database persistence.
          </p>
        </div>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-card-top">
                <div className="card-status-row">
                  <span className="badge">{project.status}</span>
                  <span className="project-type-tag">Project Overview</span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-tagline-text">{project.tagline}</p>
              </div>

              <p className="project-desc">{project.shortDescription}</p>

              {/* Technologies */}
              <div className="project-tech-wrapper" aria-label="Technologies used">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="tech-badge tech-badge-more">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="project-card-action">
                <Link to={`/projects/${project.slug}`} className="project-cta-link">
                  <span>View Project Details</span>
                  <ArrowRight size={15} />
                </Link>

                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-repo-link"
                    title={`View ${project.title} on GitHub`}
                    aria-label={`${project.title} GitHub repository (opens in a new tab)`}
                  >
                    <GitBranch size={13} />
                    <span>Repository</span>
                    <ExternalLink size={11} />
                  </a>
                ) : (
                  <span className="project-card-repo-pending" title="Repository URL Pending">
                    <GitBranch size={13} />
                    <span>Repo Pending</span>
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

