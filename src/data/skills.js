/**
 * Categorised technical skills
 * Note: No fabricated proficiency percentages.
 * DevOps & Infrastructure items are explicitly documented with honest exposure levels.
 */
export const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    description: "Core languages used across academic projects, scripting, and backend development.",
    skills: [
      { name: "Java", note: "Object-oriented programming, JavaFX" },
      { name: "Python", note: "Backend services, data handling, scripting" },
      { name: "JavaScript", note: "Modern ES6+, DOM, React integrations" },
      { name: "SQL", note: "Relational queries, schema design" }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Building responsive, semantic, and accessible user interfaces.",
    skills: [
      { name: "HTML5", note: "Semantic structures, accessibility" },
      { name: "CSS3", note: "Modern flexbox, grid, design tokens" },
      { name: "React", note: "Component architectures, state, hooks" }
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Architecting server-side endpoints, routing, and data contracts.",
    skills: [
      { name: "Django REST Framework", note: "REST APIs, JWT authentication, serializers" },
      { name: "Flask", note: "Lightweight microservices, route handling" },
      { name: "REST APIs", note: "HTTP methods, payload validation, status codes" }
    ]
  },
  {
    id: "databases",
    title: "Databases & Persistence",
    description: "Relational data modeling, table constraints, and queries.",
    skills: [
      { name: "SQLite", note: "Embedded development databases" },
      { name: "MySQL", note: "Relational data management, JDBC connectivity" }
    ]
  },
  {
    id: "tools",
    title: "Tools & Development",
    description: "Version control, collaboration, and data analysis utilities.",
    skills: [
      { name: "Git", note: "Branching, commit history, merge flows" },
      { name: "GitHub", note: "Repositories, pull requests, issue tracking" },
      { name: "Power BI", note: "Data visualization and report modeling" }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Infrastructure (Active Learning)",
    description: "Foundational exploration of deployment workflows, environments, and continuous delivery.",
    skills: [
      { name: "Linux", note: "Basic CLI commands, permissions, processes and system administration fundamentals" },
      { name: "Docker", note: "Containerization fundamentals and introductory hands-on exploration" },
      { name: "Jenkins", note: "Foundational understanding of CI/CD and Jenkins concepts" },
      { name: "CI/CD", note: "Continuous integration principles and automated verification workflows" },
      { name: "GitHub Actions", note: "Exploration of workflow automation, build and test jobs" },
      { name: "Cloud Fundamentals", note: "Foundational understanding of compute and storage" }
    ]
  }
];

