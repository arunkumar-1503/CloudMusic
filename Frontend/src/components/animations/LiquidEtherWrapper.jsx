import { useEffect, useRef } from "react";
import "./animations.css";

const LiquidEtherWrapper = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add("liquid-ether-fallback");
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.classList.remove("liquid-ether-fallback");
      }
    };
  }, []);

  return (
    <div className="animation-container" ref={containerRef}>
      <div className="liquid-ether-animation"></div>
      <div className="content-overlay">{children}</div>
    </div>
  );
};

export default LiquidEtherWrapper;
