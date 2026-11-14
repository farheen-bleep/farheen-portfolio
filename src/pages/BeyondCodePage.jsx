import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sun,
  Sunset,
  Moon,
  RotateCcw,
  Sparkles,
  Info,
  Cookie,
  PenTool,
  BookOpen,
  Camera,
  Award
} from 'lucide-react';
import StudioRoomCanvas from '../components/beyond-code/StudioRoomCanvas';
import BeyondCodeDrawer from '../components/beyond-code/BeyondCodeDrawer';
import { beyondCodeData } from '../data/beyondCodeData';
import './BeyondCodePage.css';

export default function BeyondCodePage() {
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [lightingMood, setLightingMood] = useState('daylight');

  // Update document title for Beyond Code
  useEffect(() => {
    document.title = 'Beyond Code — 3D Creative Universe | Farheen Hawawala';
    return () => {
      document.title = 'Farheen Hawawala — Engineering Portfolio';
    };
  }, []);

  const handleSelectArea = (areaId) => {
    setSelectedAreaId(areaId);
  };

  const handleCloseDrawer = () => {
    setSelectedAreaId(null);
  };

  const handleResetCamera = () => {
    setSelectedAreaId(null);
  };

  const iconMap = {
    baking: <Cookie size={14} />,
    writing: <PenTool size={14} />,
    reading: <BookOpen size={14} />,
    photography: <Camera size={14} />,
    workshop: <Sparkles size={14} />,
    personal: <Award size={14} />
  };

  return (
    <main className="beyond-code-page" id="beyond-code-root">
      {/* 1. Hero Introduction Block */}
      <section className="beyond-intro-section">
        <div className="container beyond-intro-container">
          <div className="beyond-eyebrow-row">
            <div className="beyond-eyebrow">
              <span className="eyebrow-pip" />
              <span>A MINIATURE 3D UNIVERSE</span>
            </div>
            <div className="beyond-meta-badge">
              <span className="badge-sparkle">✦</span>
              <span>VERSION 2.0 // CREATIVE WORLD</span>
            </div>
          </div>

          <h1 className="beyond-main-heading">Beyond Code</h1>

          <p className="beyond-lead-text">
            {beyondCodeData.meta.subtitle}
          </p>

          {/* Room Quick-Navigation Badges */}
          <div className="room-nav-pills" role="toolbar" aria-label="Selectable creative studio corners">
            {Object.values(beyondCodeData.areas).map((area) => {
              const isSelected = selectedAreaId === area.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  className={`room-pill-btn ${isSelected ? 'is-active' : ''}`}
                  onClick={() => handleSelectArea(area.id)}
                  style={{
                    borderColor: isSelected ? area.accentColor : undefined,
                    color: isSelected ? area.accentColor : undefined
                  }}
                  title={`Focus ${area.name}`}
                >
                  <span
                    className="pill-icon-wrap"
                    style={{
                      backgroundColor: `${area.accentColor}18`,
                      color: area.accentColor
                    }}
                  >
                    {iconMap[area.id] || <Sparkles size={14} />}
                  </span>
                  <span>{area.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Central 3D Interactive Room Canvas Stage */}
      <section className="beyond-stage-section">
        <div className="container stage-container">
          {/* Controls Bar over the 3D Stage */}
          <div className="stage-controls-strip">
            <div className="stage-instructions">
              <span className="instruction-icon">🖱️</span>
              <span className="instruction-text">
                Click objects to reveal stories · Drag to orbit · Scroll to inspect
              </span>
            </div>

            <div className="stage-action-buttons">
              {/* Lighting Mood Toggle */}
              <div className="lighting-mood-group" role="group" aria-label="Room lighting mood">
                <button
                  type="button"
                  className={`mood-btn ${lightingMood === 'daylight' ? 'is-active' : ''}`}
                  onClick={() => setLightingMood('daylight')}
                  title="Daylight Studio"
                  aria-label="Daylight Studio Lighting"
                >
                  <Sun size={14} />
                  <span>Daylight</span>
                </button>
                <button
                  type="button"
                  className={`mood-btn ${lightingMood === 'golden' ? 'is-active' : ''}`}
                  onClick={() => setLightingMood('golden')}
                  title="Golden Hour"
                  aria-label="Golden Hour Lighting"
                >
                  <Sunset size={14} />
                  <span>Golden</span>
                </button>
                <button
                  type="button"
                  className={`mood-btn ${lightingMood === 'night' ? 'is-active' : ''}`}
                  onClick={() => setLightingMood('night')}
                  title="Cozy Night"
                  aria-label="Cozy Night Lighting"
                >
                  <Moon size={14} />
                  <span>Night</span>
                </button>
              </div>

              {/* Reset View Button */}
              <button
                type="button"
                className="stage-btn-reset"
                onClick={handleResetCamera}
                title="Reset Camera View"
                aria-label="Reset Isometric Camera View"
              >
                <RotateCcw size={14} />
                <span>Reset View</span>
              </button>
            </div>
          </div>

          {/* 3D Canvas Box */}
          <div className="canvas-frame">
            <StudioRoomCanvas
              selectedAreaId={selectedAreaId}
              onSelectArea={handleSelectArea}
              lightingMood={lightingMood}
            />
          </div>
        </div>
      </section>

      {/* 4. Sliding Information Drawer (One at a time) */}
      <BeyondCodeDrawer
        selectedAreaId={selectedAreaId}
        onClose={handleCloseDrawer}
        onNavigateArea={handleSelectArea}
      />
    </main>
  );
}

