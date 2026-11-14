/**
 * Centralised project case studies
 * Edit this file to update project summaries, tech stacks, and assets.
 * Truthful, conservative descriptions with no invented features or fake URLs.
 */
export const projectsData = [
  {
    id: "procurehub",
    slug: "procurehub",
    title: "ProcureHub",
    tagline: "Procurement Management Application",
    shortDescription:
      "A role-based procurement application designed to coordinate RFQs, vendor quotations, purchase orders, invoices, and payment tracking.",
    technologies: [
      "Django REST Framework",
      "React",
      "SQLite",
      "Tailwind CSS / Bootstrap",
      "Recharts",
      "Pandas",
      "JWT Authentication"
    ],
    status: "In Development",
    roles: [
      "Admin",
      "Procurement Officer",
      "Manager",
      "Vendor"
    ],
    workflowStages: [
      { step: "RFQ", description: "Request for Quotation initiated by procurement officer" },
      { step: "Quotations", description: "Vendors submit formal price and terms proposals" },
      { step: "Purchase Orders", description: "Manager reviews and generates approved PO" },
      { step: "Invoices", description: "Invoices matched against delivered goods and PO" },
      { step: "Payments", description: "Payment records reconciled with accounting status" }
    ],
    overview:
      "ProcureHub is designed to streamline internal procurement processes by replacing fragmented email and spreadsheet chains with structured, role-specific workflows.",
    problemStatement:
      "In many organizations, procurement involves disorganized communication between departments and suppliers, resulting in delayed approvals, untracked purchase orders, and payment discrepancies.",
    solution:
      "A centralized application providing defined user roles, pipeline status tracking from initial RFQ to final payment reconciliation, and authenticated API endpoints using Django REST Framework.",
    keyFeatures: [
      "Role-based access design supporting Admin, Procurement Officer, Manager, and Vendor workflows",
      "Structured RFQ issuance and vendor quotation submission workflows",
      "Purchase order generation and approval pipeline design",
      "Invoice tracking and payment record logging",
      "JWT-authenticated REST API architecture"
    ],
    githubUrl: "https://github.com/Yax-coder11/ProcureHub.git",
    liveUrl: null, // Placeholder: no live demo
    screenshots: [] // Placeholder: interface previews to be added
  },
  {
    id: "nexthire",
    slug: "nexthire",
    title: "NextHire.AI",
    tagline: "Candidate Resume Evaluation Tool",
    shortDescription:
      "A rule-based candidate resume analysis utility built with Flask and SQLite that evaluates profiles against academic and skill benchmarks.",
    technologies: [
      "Python",
      "Flask",
      "SQLite",
      "HTML/CSS",
      "JavaScript"
    ],
    status: "Prototype (Rule-Based)",
    scoringRubric: [
      { category: "Academic CGPA", maxPoints: 40, weight: "40%" },
      { category: "Technical Skills", maxPoints: 30, weight: "30%" },
      { category: "Project Experience", maxPoints: 20, weight: "20%" },
      { category: "Resume Completeness", maxPoints: 10, weight: "10%" }
    ],
    statusThresholds: [
      { status: "Ready", scoreRange: "80 and above", badgeColor: "success" },
      { status: "Partial", scoreRange: "60 to 79", badgeColor: "warning" },
      { status: "Needs Improvement", scoreRange: "Below 60", badgeColor: "neutral" }
    ],
    overview:
      "NextHire.AI provides a transparent, rule-grounded scoring methodology to evaluate student and candidate resumes against entry-level benchmark criteria.",
    problemStatement:
      "Initial screening of large candidate pools often lacks standardized evaluation benchmarks, making objective review difficult for entry-level applicants.",
    solution:
      "A transparent rubric scoring engine that processes applicant inputs across academic performance, relevant skills, projects, and structural completeness into clear readiness bands.",
    keyFeatures: [
      "Transparent 100-point rubric breakdown (CGPA: 40, Skills: 30, Projects: 20, Completeness: 10)",
      "Threshold categorization into Ready (>=80) and Partial (>=60) readiness brackets",
      "SQLite data persistence for candidate submissions",
      "Lightweight Flask web application with direct form processing"
    ],
    githubUrl: "https://github.com/Yax-coder11/NextHire.AI.git",
    liveUrl: null,
    screenshots: []
  },
  {
    id: "costcraft",
    slug: "costcraft",
    title: "CostCraft",
    tagline: "Home-Baker Product Costing Concept",
    shortDescription:
      "A recipe and ingredient costing application concept designed to help home bakers calculate accurate production costs and sustainable retail prices.",
    technologies: [
      "JavaScript",
      "React",
      "CSS"
    ],
    status: "Concept & Planning",
    overview:
      "CostCraft addresses a common challenge for small-scale and home bakeries: underestimating production overheads, unit ingredient costs, and packaging expenses when pricing finished goods.",
    problemStatement:
      "Home bakers often calculate product prices based solely on raw bulk ingredient costs, omitting micro-ingredients, packaging, wastage, and sustainable profit margins.",
    solution:
      "A recipe-level costing concept that calculates expenses per batch and individual portion to establish clear margin projections before goods go to market.",
    keyFeatures: [
      "Unit measurement and cost breakdown per recipe ingredient",
      "Batch production expense calculation model",
      "Packaging and overhead expense inclusion",
      "Suggested retail pricing based on target margin percentages"
    ],
    noteOnStatus:
      "Core calculation methodology formulated; automatic ingredient scaling and dynamic inventory sync are planned future features and not currently implemented.",
    githubUrl: "https://github.com/farheen-bleep/costcraft.git",
    liveUrl: null,
    screenshots: []
  },
  {
    id: "business-bytes",
    slug: "business-bytes",
    title: "Business Bytes",
    tagline: "Monopoly-Inspired Desktop Board Game",
    shortDescription:
      "A Monopoly-inspired desktop board game developed using Java and JavaFX, featuring player turns, property management, transactions, and MySQL database integration.",
    technologies: [
      "Java",
      "JavaFX",
      "MySQL",
      "JDBC",
      "OOP & Inheritance",
      "Canva (Asset Design)"
    ],
    status: "Coursework Project",
    overview:
      "Business Bytes is a Monopoly-inspired desktop board game developed using Java and JavaFX. The application models complete tabletop game mechanics—including player turns, transactions, property acquisitions, and custom game logic—with persistent player statistics and user authentication backed by MySQL.",
    problemStatement:
      "Building a stateful multiplayer board game requires coordinating turn-based mechanics, real-time balance calculations, asset ownership transfers, and reliable persistence within an interactive desktop interface.",
    solution:
      "Structured the game application using object-oriented programming, modular class hierarchies, and inheritance in Java. JavaFX provides the interactive board interface, while JDBC connects to a MySQL database for user authentication and session statistics. The physical game board and playing cards were personally designed in Canva to create an engaging visual identity.",
    keyFeatures: [
      "Developed a Monopoly-inspired desktop board game using Java and JavaFX",
      "Implemented player turns, transactions, property management, and interactive game logic",
      "Integrated MySQL for user authentication and storing player and game data",
      "Applied object-oriented programming concepts, modular design, and inheritance to structure the application",
      "Game board and game cards personally designed using Canva to craft a custom visual identity"
    ],
    boardDesign: {
      tool: "Canva",
      note: "Game board and game cards personally designed in Canva. UI styling is separate from the JavaFX application logic.",
      items: [
        {
          id: "board-layout",
          title: "Full Game Board Layout",
          type: "Board Design",
          description: "Top-down Monopoly-inspired board layout with custom property tiles, corner stations, and transit paths.",
          aspectRatio: "1/1",
          placeholderLabel: "Canva Asset: Full Game Board Design (Pending)"
        },
        {
          id: "property-cards",
          title: "Property Deeds & Assets",
          type: "Game Cards",
          description: "Deed cards detailing title ownership, rent tiers, mortgage values, and building upgrade rules.",
          aspectRatio: "3/4",
          placeholderLabel: "Canva Asset: Property Deeds (Pending)"
        },
        {
          id: "action-cards",
          title: "Chance & Community Cards",
          type: "Action Cards",
          description: "Custom event cards introducing game events, player fines, dividend payouts, and turn skips.",
          aspectRatio: "3/4",
          placeholderLabel: "Canva Asset: Action Cards (Pending)"
        }
      ]
    },
    githubUrl: null,
    liveUrl: null,
    screenshots: []
  }
];
