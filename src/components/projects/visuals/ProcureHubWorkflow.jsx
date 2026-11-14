import React, { useState } from 'react';
import { FileCheck, CheckCircle2, UserCheck, Receipt, DollarSign, Send, Info } from 'lucide-react';
import './ProcureHubWorkflow.css';

export default function ProcureHubWorkflow() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stages = [
    {
      step: "01",
      code: "RFQ",
      title: "Request for Quotation",
      role: "Procurement Officer",
      roleType: "Internal Role",
      icon: Send,
      action: "Initiate procurement requirement with item specifications and delivery timelines.",
      details: [
        "Procurement officer specifies required quantities, delivery deadlines, and item parameters",
        "Role-based authorization verifies officer identity before quotation broadcast",
        "Target workflow coordinates formal RFQ dispatch to participating vendor contacts"
      ]
    },
    {
      step: "02",
      code: "QUOTATION",
      title: "Vendor Quotations",
      role: "Vendor",
      roleType: "External Role",
      icon: FileCheck,
      action: "Vendors review RFQ specifications and submit commercial proposals.",
      details: [
        "Vendor portal design enables quotation entry with unit price and tax terms",
        "Access control model designed to keep bids private between competing suppliers",
        "Submission timeline tracking to ensure evaluation against defined deadlines"
      ]
    },
    {
      step: "03",
      code: "PURCHASE ORDER",
      title: "PO Approval & Issuance",
      role: "Manager",
      roleType: "Internal Role",
      icon: UserCheck,
      action: "Department manager evaluates submitted quotations and authorizes the purchase order.",
      details: [
        "Manager dashboard provides side-by-side comparison of supplier quotes and lead times",
        "Multi-stage approval workflow ensures organizational spending oversight",
        "Generates formal Purchase Order records linking quotation terms to the order"
      ]
    },
    {
      step: "04",
      code: "INVOICE",
      title: "Goods Receipt & Invoice",
      role: "Procurement & Vendor",
      roleType: "Collaborative Step",
      icon: Receipt,
      action: "Planned reconciliation verifying delivered quantities against billed invoice line items.",
      details: [
        "Planned three-way verification model: matching purchase orders against received goods and vendor bills",
        "Design specification includes discrepancy flagging when quantities or billing rates differ",
        "Invoice status updates tracked within Django REST Framework endpoints"
      ]
    },
    {
      step: "05",
      code: "PAYMENT",
      title: "Payment Tracking",
      role: "Admin & Accounts",
      roleType: "Internal Role",
      icon: DollarSign,
      action: "Disbursement milestone logging and reconciliation against accounting status.",
      details: [
        "Payment status milestones logged against corresponding invoice and PO numbers",
        "Status synchronization intended across internal officer and vendor dashboard views",
        "Planned audit trail design to maintain transaction transparency from inquiry to payment"
      ]
    }
  ];

  const currentStage = stages[activeStepIndex];
  const IconComponent = currentStage.icon;

  return (
    <div className="procure-workflow-container">
      <div className="workflow-intro">
        <span className="workflow-kicker">Target Pipeline Specification</span>
        <h3 className="workflow-heading">5-Stage Role-Based Procurement Workflow</h3>
        <p className="workflow-description">
          ProcureHub is currently in active development. The pipeline below outlines the planned sequence and role-based permissions designed to manage corporate procurement from initial inquiry to final payment tracking.
        </p>
      </div>

      {/* Horizontal Pipeline Stepper */}
      <div className="workflow-stepper" role="tablist" aria-label="Procurement pipeline stages">
        {stages.map((stage, idx) => {
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;
          const StepIcon = stage.icon;

          return (
            <button
              key={stage.code}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`stepper-node ${isActive ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''}`}
              onClick={() => setActiveStepIndex(idx)}
            >
              <div className="stepper-indicator">
                <span className="stepper-num">{stage.step}</span>
                <StepIcon size={16} className="stepper-icon" />
              </div>
              <div className="stepper-label-block">
                <span className="stepper-code">{stage.code}</span>
                <span className="stepper-role">{stage.role}</span>
              </div>
              {idx < stages.length - 1 && (
                <div className="stepper-connector-line" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <div className="stage-detail-box" aria-live="polite">
        <div className="stage-detail-header">
          <div className="stage-header-title-row">
            <div className="stage-icon-badge">
              <IconComponent size={20} />
            </div>
            <div>
              <span className="stage-step-tag">Pipeline Step {currentStage.step} of 05</span>
              <h4 className="stage-title">{currentStage.title}</h4>
            </div>
          </div>

          <div className="stage-role-badge">
            <span className="role-label">Designated Role</span>
            <span className="role-name">{currentStage.role} ({currentStage.roleType})</span>
          </div>
        </div>

        <p className="stage-action-summary">{currentStage.action}</p>

        <div className="stage-spec-list">
          {currentStage.details.map((detail, dIdx) => (
            <div key={dIdx} className="stage-spec-item">
              <CheckCircle2 size={15} className="spec-bullet-icon" />
              <span>{detail}</span>
            </div>
          ))}
        </div>

        <div className="workflow-honesty-note">
          <Info size={13} className="honesty-icon" />
          <span>Core RFQ, PO, and authentication models are implemented; advanced reconciliation and automated notifications represent planned pipeline extensions.</span>
        </div>
      </div>
    </div>
  );
}
