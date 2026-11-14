import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures page scroll is reset to top on route change,
 * preserving hash jumps when navigating with anchors.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

