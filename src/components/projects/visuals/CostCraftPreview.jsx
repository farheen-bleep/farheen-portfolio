import React, { useState } from 'react';
import { Calculator, PieChart, Package, Sparkles, AlertCircle, TrendingUp, Layers } from 'lucide-react';
import './CostCraftPreview.css';

export default function CostCraftPreview() {
  const [marginPercent, setMarginPercent] = useState(40); // 40% target margin

  // Sample batch model for 12 artisanal cupcakes
  const ingredients = [
    { name: "Organic Flour (300g)", category: "Dry Goods", cost: 0.90 },
    { name: "Grass-Fed Butter (200g)", category: "Dairy", cost: 2.40 },
    { name: "Cane Sugar (250g)", category: "Sweeteners", cost: 0.75 },
    { name: "Farm Fresh Eggs (3 units)", category: "Dairy/Poultry", cost: 1.20 },
    { name: "Pure Vanilla Bean Extract (10ml)", category: "Flavorings", cost: 1.80 }
  ];

  const packagingOverhead = [
    { name: "Custom Bakery Window Box", type: "Packaging", cost: 1.50 },
    { name: "Unbleached Baking Liners (x12)", type: "Packaging", cost: 0.40 },
    { name: "Baking Utilities & Energy Allowance", type: "Overhead Buffer", cost: 0.85 }
  ];

  const rawIngredientsCost = ingredients.reduce((sum, item) => sum + item.cost, 0);
  const packagingCost = packagingOverhead.reduce((sum, item) => sum + item.cost, 0);
  const totalBatchCost = rawIngredientsCost + packagingCost;
  const batchSize = 12;
  const costPerUnit = totalBatchCost / batchSize;

  // Pricing based on margin formula: Selling Price = Cost / (1 - Margin%)
  const sellingPricePerUnit = costPerUnit / (1 - marginPercent / 100);
  const totalBatchRevenue = sellingPricePerUnit * batchSize;
  const projectedProfit = totalBatchRevenue - totalBatchCost;

  return (
    <div className="costcraft-preview-container">
      <div className="costcraft-intro">
        <span className="costcraft-kicker">Concept &amp; Formulation Visual</span>
        <h3 className="costcraft-heading">Home-Baker Recipe Costing &amp; Margin Model</h3>
        <p className="costcraft-description">
          A conceptual model demonstrating how CostCraft helps small-scale bakers calculate actual cost of goods sold (COGS) by factoring micro-ingredients, packaging, and overhead into sustainable retail pricing.
        </p>
      </div>

      <div className="costcraft-layout-grid">
        {/* Left: Recipe Cost Breakdown */}
        <div className="recipe-breakdown-card">
          <div className="card-header-bar">
            <div>
              <span className="batch-label">Sample Batch Model</span>
              <h4 className="recipe-title">Vanilla Bean Cupcakes (Batch of 12)</h4>
            </div>
            <span className="badge badge-outline">Batch Size: 12</span>
          </div>

          {/* Raw Ingredients Table */}
          <div className="cost-table-section">
            <span className="table-section-title">Raw Ingredients (${rawIngredientsCost.toFixed(2)})</span>
            <ul className="cost-item-list">
              {ingredients.map((ing) => (
                <li key={ing.name} className="cost-item-row">
                  <span className="item-name">{ing.name}</span>
                  <span className="item-cost">${ing.cost.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Packaging & Overhead Table */}
          <div className="cost-table-section">
            <span className="table-section-title">Packaging &amp; Overhead (${packagingCost.toFixed(2)})</span>
            <ul className="cost-item-list">
              {packagingOverhead.map((pkg) => (
                <li key={pkg.name} className="cost-item-row">
                  <span className="item-name">{pkg.name}</span>
                  <span className="item-cost">${pkg.cost.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cost Summary Subtotal */}
          <div className="batch-cost-subtotal">
            <span>Total Production Cost (COGS):</span>
            <strong className="subtotal-figure">${totalBatchCost.toFixed(2)}</strong>
          </div>
        </div>

        {/* Right: Interactive Margin & Pricing Calculator */}
        <div className="pricing-calculator-card">
          <div className="card-header-bar">
            <div>
              <span className="batch-label">Pricing Projections</span>
              <h4 className="recipe-title">Margin Calculator</h4>
            </div>
            <TrendingUp size={18} className="calculator-icon" />
          </div>

          {/* Slider for Target Margin */}
          <div className="margin-slider-box">
            <div className="slider-header-row">
              <span className="slider-title">Target Profit Margin</span>
              <span className="slider-value-badge">{marginPercent}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="65"
              step="5"
              value={marginPercent}
              onChange={(e) => setMarginPercent(Number(e.target.value))}
              className="margin-range-slider"
              aria-label="Target Profit Margin percentage"
            />
            <div className="slider-range-labels">
              <span>20% (Low Margin)</span>
              <span>40% (Standard)</span>
              <span>65% (Artisanal)</span>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="pricing-metrics-grid">
            <div className="metric-box">
              <span className="metric-label">Unit Cost (COGS)</span>
              <span className="metric-value">${costPerUnit.toFixed(2)}</span>
              <span className="metric-sub">per finished cupcake</span>
            </div>

            <div className="metric-box highlight-metric">
              <span className="metric-label">Suggested Retail Price</span>
              <span className="metric-value-large">${sellingPricePerUnit.toFixed(2)}</span>
              <span className="metric-sub">per finished cupcake</span>
            </div>

            <div className="metric-box">
              <span className="metric-label">Batch Gross Revenue</span>
              <span className="metric-value">${totalBatchRevenue.toFixed(2)}</span>
              <span className="metric-sub">for 12 units</span>
            </div>

            <div className="metric-box">
              <span className="metric-label">Projected Net Profit</span>
              <span className="metric-value profit-value">+${projectedProfit.toFixed(2)}</span>
              <span className="metric-sub">after all overheads</span>
            </div>
          </div>

          {/* Concept Scope Transparency Notice */}
          <div className="concept-notice-box">
            <AlertCircle size={16} className="concept-notice-icon" />
            <div>
              <span className="concept-notice-title">Concept &amp; Roadmap Note</span>
              <p className="concept-notice-text">
                The core unit costing and margin model above reflects the formulated concept. Automatic recipe scaling and live inventory tracking are planned future modules and not yet implemented.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

