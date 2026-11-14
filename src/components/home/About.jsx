import React from 'react';
import { Terminal, Database, Layout, Sparkles } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-header-block">
          <div className="section-kicker">01 / Profile</div>
          <h2 className="section-title">About &amp; Engineering Direction</h2>
        </div>

        <div className="about-grid">
          {/* Narrative Column */}
          <div className="about-narrative">
            <p className="narrative-lead">
              I'm a Computer Engineering student at L.J. Institute of Engineering, Ahmedabad, focused on building practical software and understanding how applications function from the database layer to the browser.
            </p>

            <p className="narrative-text">
              My project work centers on full-stack development and backend architecture. I enjoy structuring relational schemas in SQLite and MySQL, developing REST APIs with Django REST Framework and Flask, and building practical applications that solve clear problems.
            </p>

            <p className="narrative-text">
              I am also actively exploring <strong>DevOps and deployment workflows</strong>. Rather than treating deployment as an afterthought, I want to understand how software moves reliably from local environments to production. I am currently learning Linux administration, Docker containerization, and continuous integration concepts through self-directed study and coursework.
            </p>

            <p className="narrative-text">
              Alongside backend systems, I care about interface quality. I value clean layouts, thoughtful typography, and clear visual hierarchy—building software that feels dependable, legible, and straightforward to navigate.
            </p>
          </div>

          {/* Quick Technical Pillars Card */}
          <div className="about-sidebar">
            <div className="pillars-card">
              <span className="pillars-card-tag">Engineering Focus</span>

              <div className="pillar-row">
                <div className="pillar-row-icon">
                  <Database size={18} />
                </div>
                <div className="pillar-row-content">
                  <h3 className="pillar-row-title">Backend &amp; Data Systems</h3>
                  <p className="pillar-row-desc">
                    Designing REST APIs with Django REST Framework and Flask, paired with structured schemas in SQLite and MySQL.
                  </p>
                </div>
              </div>

              <div className="pillar-row">
                <div className="pillar-row-icon">
                  <Terminal size={18} />
                </div>
                <div className="pillar-row-content">
                  <h3 className="pillar-row-title">DevOps (Active Exploration)</h3>
                  <p className="pillar-row-desc">
                    Exploring containerization with Docker, pipeline basics in Jenkins, and continuous integration workflows.
                  </p>
                </div>
              </div>

              <div className="pillar-row">
                <div className="pillar-row-icon">
                  <Layout size={18} />
                </div>
                <div className="pillar-row-content">
                  <h3 className="pillar-row-title">Thoughtful Interface Design</h3>
                  <p className="pillar-row-desc">
                    Building clean, accessible, and responsive client experiences with React and standard CSS tokens.
                  </p>
                </div>
              </div>

              <div className="pillar-row">
                <div className="pillar-row-icon">
                  <Sparkles size={18} />
                </div>
                <div className="pillar-row-content">
                  <h3 className="pillar-row-title">Academic Grounding</h3>
                  <p className="pillar-row-desc">
                    Consistent 9.4 GPA at L.J. Institute of Engineering with solid fundamentals across algorithms, networks, and operating systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
