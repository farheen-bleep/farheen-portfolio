import React, { useState } from 'react';
import { Award, BookOpen, Code2, FolderGit2, CheckSquare, Sparkles, AlertCircle } from 'lucide-react';
import './NextHireEvaluation.css';

export default function NextHireEvaluation() {
  // Interactive sample scores
  const [cgpaScore, setCgpaScore] = useState(36); // out of 40 (e.g. 9.0 GPA)
  const [skillsScore, setSkillsScore] = useState(25); // out of 30
  const [projectsScore, setProjectsScore] = useState(18); // out of 20
  const [completenessScore, setCompletenessScore] = useState(9); // out of 10

  const totalScore = cgpaScore + skillsScore + projectsScore + completenessScore;

  const getReadinessBand = (score) => {
    if (score >= 80) {
      return {
        label: "Ready",
        badgeClass: "badge-ready",
        note: "Candidate exceeds benchmark requirements for interview scheduling."
      };
    } else if (score >= 60) {
      return {
        label: "Partial",
        badgeClass: "badge-partial",
        note: "Candidate meets core prerequisites with minor skill or project gaps."
      };
    } else {
      return {
        label: "Needs Improvement",
        badgeClass: "badge-review",
        note: "Score indicates foundational requirements are not yet satisfied."
      };
    }
  };

  const currentBand = getReadinessBand(totalScore);

  return (
    <div className="nexthire-eval-container">
      <div className="eval-intro">
        <span className="eval-kicker">Evaluation Framework</span>
        <h3 className="eval-heading">100-Point Deterministic Scoring Rubric</h3>
        <p className="eval-description">
          NextHire.AI uses a transparent, rule-based scoring engine to benchmark student resumes against entry-level job criteria without subjective human bias or opaque black-box machine learning.
        </p>
      </div>

      {/* 4-Pillar Rubric Breakdown Cards */}
      <div className="rubric-pillars-grid">
        <div className="rubric-pillar-card">
          <div className="pillar-header">
            <BookOpen size={18} className="pillar-icon" />
            <span className="pillar-weight">40% Weight</span>
          </div>
          <h4 className="pillar-title">Academic CGPA</h4>
          <span className="pillar-max">Max: 40 Points</span>
          <p className="pillar-desc">
            Linear scaling of cumulative university grade point average (e.g., 9.0+ maps to 36–40 points).
          </p>
          <div className="pillar-input-row">
            <label htmlFor="cgpa-slider" className="slider-label">Simulate: {cgpaScore} pts</label>
            <input
              id="cgpa-slider"
              type="range"
              min="0"
              max="40"
              value={cgpaScore}
              onChange={(e) => setCgpaScore(Number(e.target.value))}
              className="rubric-slider"
            />
          </div>
        </div>

        <div className="rubric-pillar-card">
          <div className="pillar-header">
            <Code2 size={18} className="pillar-icon" />
            <span className="pillar-weight">30% Weight</span>
          </div>
          <h4 className="pillar-title">Technical Skills</h4>
          <span className="pillar-max">Max: 30 Points</span>
          <p className="pillar-desc">
            Keywords matched against position specifications (languages, frameworks, and databases).
          </p>
          <div className="pillar-input-row">
            <label htmlFor="skills-slider" className="slider-label">Simulate: {skillsScore} pts</label>
            <input
              id="skills-slider"
              type="range"
              min="0"
              max="30"
              value={skillsScore}
              onChange={(e) => setSkillsScore(Number(e.target.value))}
              className="rubric-slider"
            />
          </div>
        </div>

        <div className="rubric-pillar-card">
          <div className="pillar-header">
            <FolderGit2 size={18} className="pillar-icon" />
            <span className="pillar-weight">20% Weight</span>
          </div>
          <h4 className="pillar-title">Project Experience</h4>
          <span className="pillar-max">Max: 20 Points</span>
          <p className="pillar-desc">
            Verification of practical implementation, repository presence, and full-stack work.
          </p>
          <div className="pillar-input-row">
            <label htmlFor="proj-slider" className="slider-label">Simulate: {projectsScore} pts</label>
            <input
              id="proj-slider"
              type="range"
              min="0"
              max="20"
              value={projectsScore}
              onChange={(e) => setProjectsScore(Number(e.target.value))}
              className="rubric-slider"
            />
          </div>
        </div>

        <div className="rubric-pillar-card">
          <div className="pillar-header">
            <CheckSquare size={18} className="pillar-icon" />
            <span className="pillar-weight">10% Weight</span>
          </div>
          <h4 className="pillar-title">Resume Completeness</h4>
          <span className="pillar-max">Max: 10 Points</span>
          <p className="pillar-desc">
            Valid contact links, structured section headings, and readable formatting.
          </p>
          <div className="pillar-input-row">
            <label htmlFor="comp-slider" className="slider-label">Simulate: {completenessScore} pts</label>
            <input
              id="comp-slider"
              type="range"
              min="0"
              max="10"
              value={completenessScore}
              onChange={(e) => setCompletenessScore(Number(e.target.value))}
              className="rubric-slider"
            />
          </div>
        </div>
      </div>

      {/* Real-time Calculation Result Bar */}
      <div className="eval-result-card">
        <div className="result-score-block">
          <span className="result-label">Computed Benchmark Score</span>
          <div className="score-number-row">
            <span className="score-total">{totalScore}</span>
            <span className="score-denom">/ 100 Points</span>
          </div>
        </div>

        <div className="result-status-block">
          <span className="result-label">Candidate Readiness Tier</span>
          <div className={`readiness-pill ${currentBand.badgeClass}`}>
            <Sparkles size={14} />
            <span>{currentBand.label}</span>
          </div>
          <p className="result-guidance">{currentBand.note}</p>
        </div>
      </div>

      {/* Threshold Reference Legend */}
      <div className="thresholds-reference">
        <span className="ref-title">Defined Classification Thresholds:</span>
        <div className="ref-grid">
          <div className="ref-item">
            <span className="ref-dot ready-dot" />
            <strong>Ready:</strong> 80 – 100 points
          </div>
          <div className="ref-item">
            <span className="ref-dot partial-dot" />
            <strong>Partial:</strong> 60 – 79 points
          </div>
          <div className="ref-item">
            <span className="ref-dot review-dot" />
            <strong>Needs Improvement:</strong> Below 60 points
          </div>
        </div>
      </div>
    </div>
  );
}

