import React, { useEffect } from 'react';
import ProjectHeader from './ProjectHeader';
import ProjectOverview from './ProjectOverview';
import ProjectFeatures from './ProjectFeatures';
import ProjectMetadata from './ProjectMetadata';
import ProjectNavFooter from './ProjectNavFooter';

// Project-Specific Visual Architecture & Workflow Components
import ProcureHubWorkflow from './visuals/ProcureHubWorkflow';
import NextHireEvaluation from './visuals/NextHireEvaluation';
import CostCraftPreview from './visuals/CostCraftPreview';
import BusinessBytesPreview from './visuals/BusinessBytesPreview';
import BoardDesignGallery from './visuals/BoardDesignGallery';

import './ProjectDetailLayout.css';

export default function ProjectDetailLayout({ project }) {
  // Update browser document title dynamically
  useEffect(() => {
    document.title = `${project.title} — Case Study | Farheen Hawawala`;
    return () => {
      document.title = 'Farheen Hawawala — Engineering Portfolio';
    };
  }, [project.title]);

  // Map project ID to its specific architecture/workflow visual component
  const renderProjectVisual = () => {
    switch (project.id) {
      case 'procurehub':
        return <ProcureHubWorkflow />;
      case 'nexthire':
        return <NextHireEvaluation />;
      case 'costcraft':
        return <CostCraftPreview />;
      case 'business-bytes':
        return <BusinessBytesPreview />;
      default:
        return null;
    }
  };

  return (
    <article className="project-detail-layout" aria-labelledby="project-title">
      {/* 1. Project Introduction & Hero */}
      <ProjectHeader project={project} />

      {/* Main 2-Column Content Section */}
      <div className="section project-main-body-section">
        <div className="container project-layout-container">
          <div className="project-primary-column">
            {/* 2 & 3. Overview, Problem Statement & Proposed Solution */}
            <ProjectOverview project={project} />

            {/* 4. Architecture & Workflow Visual Diagram */}
            <div className="case-content-section workflow-visual-section">
              <span className="case-section-kicker">04 / Architecture &amp; Workflow</span>
              <h2 className="case-section-heading">System Workflow &amp; Architecture</h2>
              {renderProjectVisual()}
            </div>

            {/* 5. Key Features */}
            <ProjectFeatures project={project} />

            {/* 6. Game Board & Visual Design (Business Bytes specific) */}
            {project.id === 'business-bytes' && (
              <BoardDesignGallery project={project} />
            )}
          </div>

          {/* Right Sidebar: Metadata, Tech Stack & Project Links */}
          <ProjectMetadata project={project} />
        </div>
      </div>

      {/* 7. Circular Navigation Bar (Previous / Next Project) */}
      <ProjectNavFooter currentSlug={project.slug} />
    </article>
  );
}

