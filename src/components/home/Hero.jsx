import React from 'react';
import { Sparkles, Code2, Server, Terminal, ArrowRight, ArrowDown } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import './Hero.css';

export default function Hero() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section hero-shell" id="hero">
      <div className="container">
        {/* Eyebrow: Academic status & Verified GPA */}
        <div className="hero-eyebrow">
          <span className="badge">
            <Sparkles size={12} />
            {personalInfo.academicYear}
          </span>
          <span className="badge">
            {personalInfo.institution}
          </span>
          <span className="badge badge-outline">GPA: {personalInfo.gpa}</span>
        </div>

        {/* Primary Typographic Identity */}
        <h1 className="hero-title">{personalInfo.name}</h1>
        <p className="hero-lead">{personalInfo.introduction}</p>

        {/* Engineering Pillars */}
        <div className="hero-pillars" aria-label="Technical focus areas">
          <div className="pillar-item">
            <Code2 size={18} className="pillar-icon" />
            <span>Full-Stack Development</span>
          </div>
          <div className="pillar-item">
            <Server size={18} className="pillar-icon" />
            <span>Backend &amp; API Systems</span>
          </div>
          <div className="pillar-item">
            <Terminal size={18} className="pillar-icon" />
            <span>DevOps Exploration (CI/CD, Docker)</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="hero-cta-group">
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, 'projects')}
            className="btn btn-primary"
          >
            <span>View Projects</span>
            <ArrowDown size={16} />
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="btn btn-secondary"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
