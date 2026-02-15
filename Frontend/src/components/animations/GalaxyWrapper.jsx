import { useEffect, useRef } from "react";
import "./animations.css";

const GalaxyWrapper = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add("galaxy-fallback");
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.classList.remove("galaxy-fallback");
      }
    };
  }, []);

  return (
    <div className="animation-container" ref={containerRef}>
      <div className="galaxy-animation"></div>
      <div className="content-overlay">{children}</div>
    </div>
  );
};

export default GalaxyWrapper;
