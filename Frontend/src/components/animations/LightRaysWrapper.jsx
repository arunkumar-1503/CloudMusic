import { useEffect, useRef } from "react";
import "./animations.css";

const LightRaysWrapper = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add("light-rays-fallback");
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.classList.remove("light-rays-fallback");
      }
    };
  }, []);

  return (
    <div className="animation-container" ref={containerRef}>
      <div className="light-rays-animation"></div>
      <div className="content-overlay">{children}</div>
    </div>
  );
};

export default LightRaysWrapper;
