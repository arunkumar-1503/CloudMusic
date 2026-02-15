import { useEffect, useRef } from 'react';
import './animations.css';

// Note: Replace with actual import once package is installed
// import { LightPillar } from '@react-bits/LightPillar-JS-CSS';
// import '@react-bits/LightPillar-JS-CSS/dist/style.css';

const LightPillarWrapper = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // This is where we'll initialize the actual LightPillar animation
    // For now, we'll add a CSS-based fallback
    if (containerRef.current) {
      containerRef.current.classList.add('light-pillar-fallback');
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.classList.remove('light-pillar-fallback');
      }
    };
  }, []);

  return (
    <div className="animation-container" ref={containerRef}>
      <div className="light-pillar-animation"></div>
      <div className="content-overlay">
        {children}
      </div>
    </div>
  );
};

export default LightPillarWrapper;