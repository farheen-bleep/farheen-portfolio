/**
 * Centralised Constellation Topology for Farheen Hawawala's Engineering Portfolio
 * Categories: Projects, Engineering Interests, Languages & Frameworks, Databases, DevOps & Tools
 */

export const curiosityCategories = {
  all: {
    id: "all",
    label: "All Nodes",
    color: "#30343B",
    description: "Overview of all technical nodes and relationships."
  },
  project: {
    id: "project",
    label: "Projects",
    color: "#50687E",
    ringColor: "#3B4E5F",
    description: "Practical applications and software projects."
  },
  interest: {
    id: "interest",
    label: "Engineering Interests",
    color: "#22262B",
    ringColor: "#15181B",
    description: "Core technical domains and career directions."
  },
  technology: {
    id: "technology",
    label: "Languages & Frameworks",
    color: "#3E5568",
    ringColor: "#2A3C4A",
    description: "Languages, web frameworks, and application toolkits."
  },
  database: {
    id: "database",
    label: "Databases",
    color: "#536B7C",
    ringColor: "#394B57",
    description: "Relational persistence and schema design."
  },
  devops: {
    id: "devops",
    label: "DevOps & Infrastructure",
    color: "#465D70",
    ringColor: "#304250",
    description: "Active learning in deployment, containers, and pipelines."
  }
};

export const curiosityNodes = [
  // ==========================================
  // 1. Projects
  // ==========================================
  {
    id: "procurehub",
    name: "ProcureHub",
    category: "project",
    projectSlug: "procurehub",
    x: 300,
    y: 190,
    r: 24,
    labelPos: "bottom",
    status: "In Development",
    roleNote: "Full-Stack Procurement Application",
    summary: "Role-based procurement workflow application designed to coordinate RFQs, vendor quotations, purchase orders, invoices, and payment tracking."
  },
  {
    id: "nexthire",
    name: "NextHire.AI",
    category: "project",
    projectSlug: "nexthire",
    x: 520,
    y: 155,
    r: 24,
    labelPos: "bottom",
    status: "Prototype (Rule-Based)",
    roleNote: "Resume Analysis Utility",
    summary: "Deterministic resume evaluation application built with Flask and SQLite, scoring candidates against an objective 100-point rubric."
  },
  {
    id: "costcraft",
    name: "CostCraft",
    category: "project",
    projectSlug: "costcraft",
    x: 865,
    y: 215,
    r: 24,
    labelPos: "bottom",
    status: "Concept & Planning",
    roleNote: "Home-Baker Product Costing",
    summary: "Recipe and ingredient costing concept designed to calculate accurate production expenses, packaging overheads, and sustainable retail pricing."
  },
  {
    id: "business-bytes",
    name: "Business Bytes",
    category: "project",
    projectSlug: "business-bytes",
    x: 525,
    y: 435,
    r: 24,
    labelPos: "bottom",
    status: "Coursework Project",
    roleNote: "Monopoly-Inspired Board Game",
    summary: "Monopoly-inspired desktop board game developed using Java, JavaFX, and MySQL with custom Canva-designed board assets and OOP architecture."
  },

  // ==========================================
  // 2. Engineering Interests
  // ==========================================
  {
    id: "devops-interest",
    name: "DevOps & Workflows",
    category: "interest",
    x: 210,
    y: 235,
    r: 22,
    labelPos: "bottom",
    status: "Active Exploration & Learning",
    roleNote: "Growing Career Focus",
    summary: "Curiosity about the software lifecycle: exploring how applications transition reliably from local development to production via automated pipelines."
  },
  {
    id: "backend-dev",
    name: "Backend Development",
    category: "interest",
    x: 395,
    y: 195,
    r: 22,
    labelPos: "top",
    status: "Core Competency",
    roleNote: "Server Architecture & APIs",
    summary: "Architecting RESTful services, database normalization, role-based access logic, and server-side contracts."
  },
  {
    id: "fullstack-dev",
    name: "Full-Stack Development",
    category: "interest",
    x: 570,
    y: 265,
    r: 22,
    labelPos: "bottom",
    status: "Core Competency",
    roleNote: "End-to-End Application Design",
    summary: "Connecting structured backend endpoints with responsive, accessible user interfaces for cohesive digital products."
  },
  {
    id: "ui-design",
    name: "UI & Interface Design",
    category: "interest",
    x: 770,
    y: 95,
    r: 22,
    labelPos: "top",
    status: "Core Focus",
    roleNote: "Thoughtful User Experience",
    summary: "Valuing clean information hierarchy, typography, restrained palettes, and accessible interfaces that reduce cognitive friction."
  },

  // ==========================================
  // 3. Technologies & Languages
  // ==========================================
  {
    id: "python",
    name: "Python",
    category: "technology",
    x: 370,
    y: 65,
    r: 16,
    labelPos: "top",
    status: "Core Language",
    roleNote: "Backend Scripting & Web APIs",
    summary: "Primary language for web services with Django REST Framework and Flask, data handling, and automation scripting."
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "technology",
    x: 800,
    y: 340,
    r: 16,
    labelPos: "bottom",
    status: "Core Language",
    roleNote: "Modern ES6+ & Client State",
    summary: "Client-side interactivity, asynchronous HTTP communication, component state management, and modern browser standards."
  },
  {
    id: "java",
    name: "Java",
    category: "technology",
    x: 630,
    y: 525,
    r: 16,
    labelPos: "bottom",
    status: "Academic Coursework",
    roleNote: "OOP & Desktop GUI",
    summary: "Object-oriented software principles, data structures, and desktop graphical interface programming in JavaFX."
  },
  {
    id: "drf",
    name: "Django REST Framework",
    category: "technology",
    x: 260,
    y: 95,
    r: 17,
    labelPos: "top",
    status: "Applied in ProcureHub",
    roleNote: "REST API Toolkit",
    summary: "Powerful framework for building robust web APIs, providing serializers, token authentication, and model viewsets."
  },
  {
    id: "flask-fw",
    name: "Flask",
    category: "technology",
    x: 480,
    y: 65,
    r: 16,
    labelPos: "top",
    status: "Applied in NextHire.AI",
    roleNote: "Lightweight Microframework",
    summary: "Lightweight WSGI Python web framework used for modular routing and candidate scoring computation."
  },
  {
    id: "react-fw",
    name: "React",
    category: "technology",
    x: 690,
    y: 200,
    r: 18,
    labelPos: "bottom",
    status: "Core Frontend Library",
    roleNote: "Component Architecture",
    summary: "Declarative UI component architecture, state management, client-side routing, and responsive design systems."
  },

  // ==========================================
  // 4. Databases
  // ==========================================
  {
    id: "sqlite",
    name: "SQLite",
    category: "database",
    x: 380,
    y: 320,
    r: 16,
    labelPos: "bottom",
    status: "Local Database Storage",
    roleNote: "Embedded Relational Engine",
    summary: "Lightweight embedded relational database used for local storage in ProcureHub and NextHire.AI."
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    x: 450,
    y: 520,
    r: 16,
    labelPos: "bottom",
    status: "Relational DBMS",
    roleNote: "Client-Server Relational DB",
    summary: "Relational database server exploring structured tables, relational foreign key constraints, and JDBC driver persistence."
  },

  // ==========================================
  // 5. DevOps & Infrastructure (Accurate Foundational Descriptions)
  // ==========================================
  {
    id: "linux",
    name: "Linux",
    category: "devops",
    x: 90,
    y: 140,
    r: 16,
    labelPos: "top",
    status: "Foundational Exploration",
    roleNote: "System & CLI Fundamentals",
    summary: "Basic CLI commands, permissions, processes and system administration fundamentals."
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    x: 80,
    y: 250,
    r: 18,
    labelPos: "bottom",
    status: "Foundational Exploration",
    roleNote: "Containerization Basics",
    summary: "Containerization fundamentals and introductory hands-on exploration."
  },
  {
    id: "jenkins",
    name: "Jenkins",
    category: "devops",
    x: 85,
    y: 360,
    r: 18,
    labelPos: "bottom",
    status: "Foundational Exploration",
    roleNote: "CI/CD Concepts",
    summary: "Foundational understanding of CI/CD and Jenkins concepts."
  },
  {
    id: "cicd",
    name: "CI/CD Workflows",
    category: "devops",
    x: 175,
    y: 370,
    r: 16,
    labelPos: "bottom",
    status: "Foundational Exploration",
    roleNote: "Continuous Integration Concepts",
    summary: "Foundational understanding of continuous integration and automated pipeline principles."
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    category: "devops",
    x: 160,
    y: 480,
    r: 16,
    labelPos: "bottom",
    status: "Foundational Exploration",
    roleNote: "Workflow Automation",
    summary: "Exploration of workflow automation, build and test jobs."
  }
];

export const curiosityLinks = [
  // ProcureHub connections
  { source: "procurehub", target: "drf" },
  { source: "procurehub", target: "react-fw" },
  { source: "procurehub", target: "sqlite" },
  { source: "procurehub", target: "backend-dev" },
  { source: "procurehub", target: "fullstack-dev" },

  // NextHire.AI connections
  { source: "nexthire", target: "flask-fw" },
  { source: "nexthire", target: "python" },
  { source: "nexthire", target: "sqlite" },
  { source: "nexthire", target: "backend-dev" },

  // CostCraft connections
  { source: "costcraft", target: "react-fw" },
  { source: "costcraft", target: "javascript" },
  { source: "costcraft", target: "ui-design" },
  { source: "costcraft", target: "fullstack-dev" },

  // Business Bytes connections
  { source: "business-bytes", target: "java" },
  { source: "business-bytes", target: "mysql" },
  { source: "business-bytes", target: "backend-dev" },

  // DevOps & Infrastructure connections
  { source: "devops-interest", target: "linux" },
  { source: "devops-interest", target: "docker" },
  { source: "devops-interest", target: "jenkins" },
  { source: "devops-interest", target: "cicd" },
  { source: "devops-interest", target: "backend-dev" },
  { source: "docker", target: "linux" },
  { source: "jenkins", target: "cicd" },
  { source: "cicd", target: "github-actions" },

  // Tech & Interest inter-connections
  { source: "python", target: "drf" },
  { source: "python", target: "flask-fw" },
  { source: "javascript", target: "react-fw" },
  { source: "fullstack-dev", target: "backend-dev" },
  { source: "fullstack-dev", target: "react-fw" },
  { source: "ui-design", target: "react-fw" }
];
