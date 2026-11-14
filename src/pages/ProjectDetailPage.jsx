import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { projectsData } from '../data/projects';
import ProjectDetailLayout from '../components/projects/ProjectDetailLayout';
import './ProjectDetailPage.css';

export default function ProjectDetailPage() {
  const { slug } = useParams();

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="container section project-not-found">
        <div className="not-found-card">
          <AlertCircle size={40} className="not-found-icon" />
          <h2>Project Case Study Not Found</h2>
          <p>
            The project route <code>/projects/{slug}</code> could not be found. Please return to the engineering portfolio overview.
          </p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </main>
    );
  }

  return <ProjectDetailLayout project={project} />;
}
