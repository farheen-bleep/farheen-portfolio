import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { beyondCodeData } from '../../data/beyondCodeData';
import './BeyondCodeDrawer.css';

export default function BeyondCodeDrawer({
  selectedAreaId,
  onClose,
  onNavigateArea
}) {
  const area = selectedAreaId ? beyondCodeData.areas[selectedAreaId] : null;

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (area) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [area, onClose]);

  if (!area) return null;

  const areaKeys = Object.keys(beyondCodeData.areas);
  const currentIndex = areaKeys.indexOf(selectedAreaId);
  const prevAreaKey = areaKeys[(currentIndex - 1 + areaKeys.length) % areaKeys.length];
  const nextAreaKey = areaKeys[(currentIndex + 1) % areaKeys.length];

  const prevArea = beyondCodeData.areas[prevAreaKey];
  const nextArea = beyondCodeData.areas[nextAreaKey];

  return (
    <div
      className="beyond-drawer-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <aside
        className="beyond-drawer-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-area-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderTopColor: area.accentColor
        }}
      >
        {/* Top Header Row */}
        <header className="drawer-header">
          <div className="drawer-badge-group">
            <span
              className="drawer-category-pill"
              style={{
                backgroundColor: `${area.accentColor}18`,
                borderColor: `${area.accentColor}40`,
                color: area.accentColor
              }}
            >
              {area.category}
            </span>
            <span className="drawer-badge-tag">{area.badge}</span>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close information panel"
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </header>

        {/* Title & Tagline */}
        <div className="drawer-title-block">
          <h2 id="drawer-area-title" className="drawer-title">
            {area.name}
          </h2>
          <p className="drawer-lead-desc">{area.shortDescription}</p>
        </div>

        {/* Narrative & Philosophy */}
        <div className="drawer-body-scrollable">
          <div className="drawer-narrative-section">
            <p className="drawer-narrative-primary">{area.fullNarrative}</p>

            {area.story && area.story.length > 0 && (
              <div className="drawer-story-paragraphs">
                {area.story.map((para, pIdx) => (
                  <p key={pIdx} className="drawer-story-text">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* 3D Scene Objects Breakdown */}
          <div className="drawer-objects-section">
            <div className="objects-header">
              <Sparkles size={14} style={{ color: area.accentColor }} />
              <span className="objects-heading">Corner Elements in 3D Scene</span>
            </div>

            <div className="drawer-objects-grid">
              {area.objects.map((obj, oIdx) => (
                <div key={oIdx} className="drawer-object-card">
                  <span className="object-name">{obj.name}</span>
                  <p className="object-detail">{obj.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Tour Navigation */}
        <footer className="drawer-footer-tour">
          <button
            type="button"
            className="tour-nav-btn tour-prev"
            onClick={() => onNavigateArea(prevAreaKey)}
            title={`Previous: ${prevArea.name}`}
          >
            <ArrowLeft size={14} />
            <span className="tour-btn-text">
              <small>Previous</small>
              <strong>{prevArea.name}</strong>
            </span>
          </button>

          <button
            type="button"
            className="tour-nav-btn tour-next"
            onClick={() => onNavigateArea(nextAreaKey)}
            title={`Next: ${nextArea.name}`}
          >
            <span className="tour-btn-text text-right">
              <small>Next</small>
              <strong>{nextArea.name}</strong>
            </span>
            <ArrowRight size={14} />
          </button>
        </footer>
      </aside>
    </div>
  );
}

