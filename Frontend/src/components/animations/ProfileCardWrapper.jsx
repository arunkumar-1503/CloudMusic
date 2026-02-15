import { useEffect, useRef } from 'react';
import './animations.css';

const ProfileCardWrapper = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('profile-card-fallback');
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.classList.remove('profile-card-fallback');
      }
    };
  }, []);

  return (
    <div className="animation-container" ref={containerRef}>
      <div className="profile-card-animation"></div>
      <div className="content-overlay">
        {children}
      </div>
    </div>
  );
};

export default ProfileCardWrapper;