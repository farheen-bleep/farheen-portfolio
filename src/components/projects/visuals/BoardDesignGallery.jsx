import React from 'react';
import { Palette, Info } from 'lucide-react';
import './BoardDesignGallery.css';

export default function BoardDesignGallery({ project }) {
  const designAssets = [
    {
      id: "board-layout",
      title: "Monopoly-Inspired Game Board",
      category: "Tabletop Board Layout",
      tool: "Designed in Canva",
      dimensions: "Square (1:1 Aspect Ratio)",
      description: "Full top-down tabletop board layout featuring custom property districts, corner stations (Start, Jail, Free Parking, Go to Jail), transit hubs, and central community card slots.",
      designSpecs: "Color-coded property neighborhoods, high-legibility sans typography, and modular corner tile alignment designed for direct raster/SVG import into JavaFX scenes."
    },
    {
      id: "property-cards",
      title: "Property Deed Cards",
      category: "Title & Ownership Cards",
      tool: "Designed in Canva",
      dimensions: "Portrait (3:4 Aspect Ratio)",
      description: "Comprehensive title deeds displaying property group headers, purchase cost, graduated rent schedules (base rent through 4 houses and hotel), and mortgage values.",
      designSpecs: "Crisp vector borders with contrasting property color bands and tabular rent figures optimized for in-game JavaFX property inspection modals."
    },
    {
      id: "action-cards",
      title: "Chance & Community Action Cards",
      category: "Game Event Cards",
      tool: "Designed in Canva",
      dimensions: "Portrait (3:4 Aspect Ratio)",
      description: "Turn-based event and consequence cards introducing randomized penalties, dividend rewards, movement instructions, and jail pass mechanics.",
      designSpecs: "Distinctive thematic card backs paired with clean prompt layouts and instructional icons to maintain instant readability during fast gameplay."
    },
    {
      id: "tokens-currency",
      title: "Player HUD & Banking Assets",
      category: "Interface & Iconography",
      tool: "Designed in Canva",
      dimensions: "Landscape (16:9 Aspect Ratio)",
      description: "Custom player token markers, currency note graphics, and banking summary icons tailored for the JavaFX player status dashboard.",
      designSpecs: "Cohesive visual hierarchy balancing playful board game aesthetics with the clean contrast required for desktop monitors."
    }
  ];

  return (
    <div className="board-design-section">
      <div className="board-design-header">
        <div className="board-header-top">
          <span className="case-section-kicker">06 / Visual Asset Design</span>
          <div className="canva-tool-pill">
            <Palette size={13} />
            <span>Designed in Canva</span>
          </div>
        </div>

        <h2 className="case-section-heading">Game Board &amp; Visual Design</h2>
        
        <p className="board-intro-narrative">
          A distinctive aspect of <strong>Business Bytes</strong> is its custom visual identity. The tabletop game board layout, property deed cards, event cards, and banking assets were personally conceptualized and designed using <strong>Canva</strong> to give the digital desktop application the authentic charm and visual structure of a physical board game.
        </p>

        <div className="canva-clarity-callout">
          <Info size={16} className="clarity-icon" />
          <div className="clarity-text">
            <strong>Architecture &amp; Design Distinction:</strong> Canva was used specifically to craft the visual assets, color systems, and card templates. All application logic, player turns, real-time balance tracking, and MySQL persistence were engineered independently in Java and JavaFX.
          </div>
        </div>
      </div>

      {/* Design Specifications Grid */}
      <div className="board-gallery-grid" role="region" aria-label="Game board and card design specifications">
        {designAssets.map((asset) => (
          <article key={asset.id} className="board-asset-card">
            <div className="asset-card-content">
              <div className="asset-meta-line">
                <span className="asset-category">{asset.category}</span>
                <span className="asset-dim">{asset.dimensions}</span>
              </div>
              <h3 className="asset-title">{asset.title}</h3>
              <p className="asset-desc">{asset.description}</p>
              <div className="asset-specs-box">
                <span className="asset-specs-label">Design &amp; Layout Specs</span>
                <p className="asset-specs-text">{asset.designSpecs}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
