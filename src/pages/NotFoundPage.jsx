import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className="container section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{
        textAlign: 'center',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-12) var(--space-8)',
        maxWidth: '520px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-4)'
      }}>
        <Compass size={40} style={{ color: 'var(--color-accent)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)' }}>
          404 / Page Not Found
        </span>
        <h2>Page Does Not Exist</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
          The requested path does not exist on this portfolio. Return to the main page to explore case studies and credentials.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
          <ArrowLeft size={16} />
          <span>Return Home</span>
        </Link>
      </div>
    </main>
  );
}

