import React from 'react';
import { RotateCcw } from 'lucide-react';
import { curiosityCategories } from '../../data/curiosityMap';
import './MapLegend.css';

export default function MapLegend({ activeCategory, onSelectCategory, onReset, hasSelection }) {
  const categories = Object.entries(curiosityCategories);

  return (
    <div className="map-legend-bar">
      <div className="legend-pills-group" role="tablist" aria-label="Filter Constellation by Category">
        {categories.map(([key, cat]) => {
          const isSelected = activeCategory === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`legend-pill ${isSelected ? 'is-active' : ''}`}
              onClick={() => onSelectCategory(key)}
            >
              {key !== 'all' && (
                <span
                  className="legend-color-dot"
                  style={{ backgroundColor: cat.color }}
                  aria-hidden="true"
                />
              )}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {(hasSelection || activeCategory !== 'all') && (
        <button
          type="button"
          className="legend-reset-btn"
          onClick={onReset}
          title="Reset highlighting and filters"
        >
          <RotateCcw size={13} />
          <span>Reset Map</span>
        </button>
      )}
    </div>
  );
}

