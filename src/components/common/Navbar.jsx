import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  // Section IDs corresponding to navLinks in order
  const sectionIds = ['about', 'projects', 'curiosity-map', 'skills', 'education', 'contact'];

  // ScrollSpy logic: actively detect section in viewport
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);

    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const scrollPosition = window.scrollY;
    const headerOffset = 130; // Navbar height + breathing margin

    // Check if user is at the top in Hero section
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      const aboutTop = aboutEl.offsetTop - headerOffset;
      if (scrollPosition < aboutTop) {
        setActiveSection('');
        return;
      }
    }

    // Check if user reached bottom of page (activates contact)
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
      setActiveSection('contact');
      return;
    }

    // Find current active section from bottom to top
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const id = sectionIds[i];
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop - headerOffset;
        if (scrollPosition >= top) {
          setActiveSection(id);
          return;
        }
      }
    }
  }, [isHomePage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial evaluation on mount or route change
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    if (isHomePage && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const headerOffset = 80;
        const targetPosition = targetEl.offsetTop - headerOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        setActiveSection(targetId);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Brand Wordmark */}
        <Link to="/" className="brand-link" aria-label="Farheen Hawawala - Home">
          <span className="brand-name">{personalInfo.name}</span>
          <span className="brand-tag">Engineering</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {personalInfo.navLinks.map((link) => {
              const targetId = link.href.replace('#', '');
              const destination = isHomePage ? link.href : `/${link.href}`;
              const isActive = isHomePage && activeSection === targetId;

              return (
                <li key={link.label} className="nav-item">
                  <a
                    href={destination}
                    className={`nav-link ${isActive ? 'is-active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Resume Placeholder */}
          <div className="header-actions">
            {personalInfo.contactLinks.resume ? (
              <a
                href={personalInfo.contactLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary resume-btn"
              >
                <FileText size={15} />
                <span>Resume</span>
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span
                className="btn btn-secondary resume-btn btn-disabled"
                title="Resume file placeholder — to be attached"
              >
                <FileText size={15} />
                <span>Resume</span>
                <span className="resume-badge">Pending</span>
              </span>
            )}
          </div>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="mobile-toggle"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {personalInfo.navLinks.map((link) => {
                const targetId = link.href.replace('#', '');
                const destination = isHomePage ? link.href : `/${link.href}`;
                const isActive = isHomePage && activeSection === targetId;

                return (
                  <li key={link.label} className="mobile-nav-item">
                    <a
                      href={destination}
                      className={`mobile-nav-link ${isActive ? 'is-active' : ''}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mobile-drawer-footer">
              {personalInfo.contactLinks.resume ? (
                <a
                  href={personalInfo.contactLinks.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-full"
                >
                  <FileText size={16} />
                  <span>View Resume (PDF)</span>
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <span className="btn btn-secondary btn-full btn-disabled">
                  <FileText size={16} />
                  <span>Resume (Pending File)</span>
                </span>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
