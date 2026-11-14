import React from 'react';
import { Terminal, Code, Layout, Database, Wrench, ShieldCheck, Sparkles } from 'lucide-react';
import { skillCategories } from '../../data/skills';
import './Skills.css';

const categoryIcons = {
  languages: Code,
  frontend: Layout,
  backend: Database,
  databases: Database,
  tools: Wrench,
  devops: Terminal
};

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div className="section-header-block">
          <div className="section-kicker">04 / Capabilities</div>
          <h2 className="section-title">Technical Skills &amp; Exploration</h2>
          <p className="section-subtitle">
            Organised by domain, pairing core coursework competencies with ongoing self-directed study in DevOps and infrastructure.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.id] || Code;
            const isDevOps = category.id === 'devops';

            return (
              <div
                key={category.id}
                className={`skill-category-card ${isDevOps ? 'devops-category-card' : ''}`}
              >
                <div className="category-header">
                  <div className="category-title-row">
                    <div className="category-icon-box">
                      <Icon size={18} />
                    </div>
                    <h3 className="category-title">{category.title}</h3>
                  </div>

                  {isDevOps && (
                    <span className="devops-pill">
                      <Sparkles size={11} />
                      <span>Active Focus</span>
                    </span>
                  )}
                </div>

                <p className="category-description">{category.description}</p>

                <div className="skills-item-list">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-name-row">
                        <span className="skill-name">{skill.name}</span>
                        {isDevOps && skill.note.toLowerCase().includes('foundational') && (
                          <span className="foundational-tag">Foundational</span>
                        )}
                      </div>
                      <span className="skill-note">{skill.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* DevOps Transparency Note */}
        <div className="devops-transparency-banner">
          <Terminal size={18} className="transparency-icon" />
          <div className="transparency-content">
            <span className="transparency-title">Transparency in Technical Scope</span>
            <p className="transparency-text">
              DevOps tooling (such as Docker, Jenkins, and automated CI/CD pipelines) is represented as an area of active exploration and foundational learning, reflecting coursework and hands-on experiments rather than production seniority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

