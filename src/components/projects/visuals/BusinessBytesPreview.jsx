import React, { useState } from 'react';
import { Monitor, Cpu, Database, Server, CheckCircle2 } from 'lucide-react';
import './BusinessBytesPreview.css';

export default function BusinessBytesPreview() {
  const [activeLayer, setActiveLayer] = useState(0);

  const architectureLayers = [
    {
      id: "javafx-gui",
      name: "JavaFX Board Game UI Layer",
      tech: "JavaFX / Scenes, Canvas & Board Layouts",
      icon: Monitor,
      summary: "Desktop graphical user interface managing board rendering, player pieces, turn dialogues, and asset deed displays.",
      responsibilities: [
        "Rendering the 2D game board layout, custom property tiles, and player piece positions",
        "Interactive player HUD displaying current cash balances, owned property deeds, and turn options",
        "Event handlers for rolling dice, purchasing properties, paying rent, and drawing cards"
      ]
    },
    {
      id: "app-logic",
      name: "Board Game Engine & Domain Logic",
      tech: "Java OOP Domain Model & Inheritance",
      icon: Cpu,
      summary: "Game rules engine handling turn order, property ownership, rent calculation, and player transactions using OOP.",
      responsibilities: [
        "Class hierarchy for game tiles (Properties, Utilities, Stations, Chance/Community cards)",
        "Turn state machine managing roll, move, evaluate tile, and trade actions",
        "Encapsulation of player state (money balance, asset inventory, in-jail flags)"
      ]
    },
    {
      id: "jdbc-driver",
      name: "JDBC Data Access Bridge",
      tech: "Java Database Connectivity (JDBC)",
      icon: Server,
      summary: "Driver interface managing parameterized SQL queries to authenticate players and persist board session state.",
      responsibilities: [
        "Secure user login and player registration query dispatch",
        "Parameterized PreparedStatements preventing SQL injection vulnerabilities",
        "Mapping database query results into Player and GameSession Java objects"
      ]
    },
    {
      id: "mysql-db",
      name: "MySQL Relational Database",
      tech: "MySQL Server / Relational Persistence",
      icon: Database,
      summary: "Relational tables storing user credentials, player statistics, game history, and leaderboards.",
      responsibilities: [
        "User table enforcing unique player accounts and password credentials",
        "Relational schema tracking games played, properties owned, and leaderboard standings",
        "Transactional consistency ensuring accurate balance and property updates across matches"
      ]
    }
  ];

  const currentLayer = architectureLayers[activeLayer];
  const CurrentIcon = currentLayer.icon;

  return (
    <div className="bytes-preview-container">
      <div className="bytes-intro">
        <span className="bytes-kicker">Desktop Game Architecture</span>
        <h3 className="bytes-heading">JavaFX &amp; MySQL Desktop Board Game Pipeline</h3>
        <p className="bytes-description">
          Business Bytes is structured as a multi-tier object-oriented desktop application. Explore the four tiers below to understand how player moves, board turns, and property transactions flow from JavaFX into MySQL via JDBC.
        </p>
      </div>

      {/* Layer Step Selector */}
      <div className="architecture-stack-grid" role="tablist" aria-label="Architecture tiers">
        {architectureLayers.map((layer, idx) => {
          const isActive = idx === activeLayer;
          const LayerIcon = layer.icon;

          return (
            <button
              key={layer.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`arch-layer-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveLayer(idx)}
            >
              <div className="arch-layer-icon-wrap">
                <LayerIcon size={18} />
              </div>
              <div className="arch-layer-text">
                <span className="arch-tier-label">Tier 0{idx + 1}</span>
                <span className="arch-tier-name">{layer.name}</span>
              </div>
              <span className="arch-tier-tech">{layer.tech}</span>
            </button>
          );
        })}
      </div>

      {/* Detailed Layer Inspection Box */}
      <div className="arch-detail-card" aria-live="polite">
        <div className="arch-detail-header">
          <div className="arch-header-left">
            <div className="arch-icon-large">
              <CurrentIcon size={22} />
            </div>
            <div>
              <span className="arch-detail-tier-tag">Layer 0{activeLayer + 1} Architecture Focus</span>
              <h4 className="arch-detail-title">{currentLayer.name}</h4>
            </div>
          </div>
          <span className="badge">{currentLayer.tech}</span>
        </div>

        <p className="arch-detail-summary">{currentLayer.summary}</p>

        <div className="arch-responsibilities-list">
          <span className="resp-heading">Technical Responsibilities:</span>
          {currentLayer.responsibilities.map((resp, rIdx) => (
            <div key={rIdx} className="resp-item">
              <CheckCircle2 size={15} className="resp-bullet" />
              <span>{resp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
