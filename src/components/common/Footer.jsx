import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personalInfo } from '../../data/personal';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-name">{personalInfo.name}</span>
            <p className="footer-bio-snippet">
              Computer Engineering student focused on software development, backend systems, and DevOps workflows.
            </p>
          </div>

          <div className="footer-nav-group">
            <span className="footer-group-title">Navigation</span>
            <ul className="footer-links">
              {personalInfo.navLinks.map((link) => {
                const destination = isHomePage ? link.href : `/${link.href}`;
                return (
                  <li key={link.label}>
                    <a href={destination} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-nav-group">
            <span className="footer-group-title">Projects</span>
            <ul className="footer-links">
              <li>
                <Link to="/projects/procurehub" className="footer-link">
                  ProcureHub
                </Link>
              </li>
              <li>
                <Link to="/projects/nexthire" className="footer-link">
                  NextHire.AI
                </Link>
              </li>
              <li>
                <Link to="/projects/costcraft" className="footer-link">
                  CostCraft
                </Link>
              </li>
              <li>
                <Link to="/projects/business-bytes" className="footer-link">
                  Business Bytes
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-nav-group">
            <span className="footer-group-title">Connect</span>
            <ul className="footer-links">
              {personalInfo.contactLinks.linkedin && (
                <li>
                  <a
                    href={personalInfo.contactLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    LinkedIn Profile
                  </a>
                </li>
              )}
              {personalInfo.contactLinks.github && (
                <li>
                  <a
                    href={personalInfo.contactLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    GitHub Profile
                  </a>
                </li>
              )}
              {personalInfo.contactLinks.email && (
                <li>
                  <a
                    href={`mailto:${personalInfo.contactLinks.email}`}
                    className="footer-link"
                  >
                    Email Farheen
                  </a>
                </li>
              )}
              {personalInfo.contactLinks.resume && (
                <li>
                  <a
                    href={personalInfo.contactLinks.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    Resume (PDF)
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {currentYear} {personalInfo.name}. Designed &amp; built with intention.
          </p>
          <p className="footer-meta">
            {personalInfo.degree} &bull; {personalInfo.institution}
          </p>
        </div>
      </div>
    </footer>
  );
}

