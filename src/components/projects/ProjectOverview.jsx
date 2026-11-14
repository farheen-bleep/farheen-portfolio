import React from 'react';
import './ProjectDetailLayout.css';

export default function ProjectOverview({ project }) {
  return (
    <div className="case-study-overview-block">
      {/* 1. Overview */}
      <div className="case-content-section">
        <span className="case-section-kicker">01 / Context &amp; Purpose</span>
        <h2 className="case-section-heading">Project Overview</h2>
        <p className="case-body-paragraph">{project.overview}</p>
      </div>

      {/* 2. Problem Statement */}
      <div className="case-content-section">
        <span className="case-section-kicker">02 / Identified Need</span>
        <h2 className="case-section-heading">Problem Statement</h2>
        <p className="case-body-paragraph">{project.problemStatement}</p>
      </div>

      {/* 3. Proposed Solution */}
      <div className="case-content-section">
        <span className="case-section-kicker">03 / Engineering Approach</span>
        <h2 className="case-section-heading">Proposed Solution</h2>
        <p className="case-body-paragraph">{project.solution}</p>
      </div>
    </div>
  );
}

