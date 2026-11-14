import React from 'react';
import { Mail, Github, Linkedin, FileText, ArrowUpRight, Clock } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import './Contact.css';

export default function Contact() {
  const { contactLinks } = personalInfo;

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header-block">
          <div className="section-kicker">06 / Connect</div>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Open to software engineering and DevOps internship inquiries, collaborative projects, and technical conversations.
          </p>
        </div>

        <div className="contact-card-grid">
          {/* Email Channel */}
          <div className="contact-card">
            <div className="contact-icon-box">
              <Mail size={20} />
            </div>
            <div className="contact-info">
              <span className="contact-channel">Email Communication</span>
              {contactLinks.email ? (
                <a href={`mailto:${contactLinks.email}`} className="contact-link active-link">
                  <span>{contactLinks.email}</span>
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <div className="contact-placeholder">
                  <span className="placeholder-text">Email address placeholder</span>
                  <span className="pending-badge">Pending</span>
                </div>
              )}
            </div>
          </div>

          {/* GitHub Channel */}
          <div className="contact-card">
            <div className="contact-icon-box">
              <Github size={20} />
            </div>
            <div className="contact-info">
              <span className="contact-channel">Source Repositories</span>
              {contactLinks.github ? (
                <a
                  href={contactLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link active-link"
                >
                  <span>GitHub Profile</span>
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <div className="contact-placeholder">
                  <span className="placeholder-text">GitHub profile placeholder</span>
                  <span className="pending-badge">Pending</span>
                </div>
              )}
            </div>
          </div>

          {/* LinkedIn Channel */}
          <div className="contact-card">
            <div className="contact-icon-box">
              <Linkedin size={20} />
            </div>
            <div className="contact-info">
              <span className="contact-channel">Professional Network</span>
              {contactLinks.linkedin ? (
                <a
                  href={contactLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link active-link"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <div className="contact-placeholder">
                  <span className="placeholder-text">LinkedIn profile placeholder</span>
                  <span className="pending-badge">Pending</span>
                </div>
              )}
            </div>
          </div>

          {/* Resume Channel */}
          <div className="contact-card">
            <div className="contact-icon-box">
              <FileText size={20} />
            </div>
            <div className="contact-info">
              <span className="contact-channel">Curriculum Vitae</span>
              {contactLinks.resume ? (
                <a
                  href={contactLinks.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link active-link"
                >
                  <span>Download Resume (PDF)</span>
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <div className="contact-placeholder">
                  <span className="placeholder-text">Resume file to be attached</span>
                  <span className="pending-badge">Pending</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Note on Location & Status */}
        <div className="contact-status-footer">
          <Clock size={16} className="clock-icon" />
          <span>
            Based in <strong>Ahmedabad, India</strong> &bull; Computer Engineering undergraduate &bull; Actively seeking internship opportunities
          </span>
        </div>
      </div>
    </section>
  );
}

