import React from 'react';
import { GraduationCap, School, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { universityEducation, schoolEducation } from '../../data/education';
import './EducationAchievements.css';

export default function EducationAchievements() {
  return (
    <section className="section education-section" id="education">
      <div className="container">
        <div className="section-header-block">
          <div className="section-kicker">05 / Academic Background</div>
          <h2 className="section-title">Education &amp; Academic History</h2>
          <p className="section-subtitle">
            Academic foundations across engineering undergraduate studies and secondary education in Ahmedabad.
          </p>
        </div>

        <div className="edu-grid">
          {/* Higher Education Column */}
          <div className="edu-column">
            <div className="edu-card">
              <div className="edu-card-header">
                <div className="edu-icon-box">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <span className="edu-institution-label">Higher Education</span>
                  <h3 className="edu-institution">{universityEducation.institution}</h3>
                </div>
              </div>

              <div className="edu-degree-block">
                <h4 className="edu-degree">{universityEducation.degree}</h4>
                <div className="edu-meta-row">
                  <span className="edu-meta-item">
                    <MapPin size={13} />
                    <span>{universityEducation.location}</span>
                  </span>
                  <span className="edu-meta-item">
                    <Calendar size={13} />
                    <span>{universityEducation.duration}</span>
                  </span>
                </div>
              </div>

              <div className="edu-stats-banner">
                <div className="edu-stat">
                  <span className="stat-label">Expected Graduation</span>
                  <span className="stat-value">2028</span>
                </div>
                <div className="edu-stat gpa-stat">
                  <span className="stat-label">Current GPA / SPI</span>
                  <span className="stat-highlight">{universityEducation.gpa} / {universityEducation.scale}</span>
                </div>
              </div>

              <div className="edu-coursework">
                <span className="coursework-title">Key Core Coursework</span>
                <p className="coursework-desc">
                  Data Structures &amp; Algorithms, Object-Oriented Programming (Java), Database Management Systems (SQL), Operating Systems, and Computer Networks.
                </p>
              </div>
            </div>
          </div>

          {/* School Education Column */}
          <div className="school-column">
            <div className="school-card-wrapper">
              <div className="school-header">
                <div className="school-icon-box">
                  <School size={20} />
                </div>
                <div>
                  <h3 className="school-group-title">School Education</h3>
                  <p className="school-group-subtitle">
                    Secondary and higher secondary academic performance in Ahmedabad.
                  </p>
                </div>
              </div>

              <div className="school-entries-list">
                {schoolEducation.map((item) => (
                  <article key={item.id} className="school-entry-card">
                    <div className="school-entry-top">
                      <span className="school-tier-pill">{item.tier}</span>
                      <div className="school-location-row">
                        <MapPin size={12} />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <h4 className="school-name">{item.school}</h4>

                    <div className="school-detail-grid">
                      <div className="school-detail-item">
                        <span className="detail-label">Qualification</span>
                        <span className="detail-value">{item.qualification}</span>
                      </div>
                      <div className="school-detail-item">
                        <span className="detail-label">Academic Result</span>
                        <div className="result-highlight-badge">
                          <CheckCircle2 size={13} />
                          <span>{item.result}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
