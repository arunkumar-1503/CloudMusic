import LightPillarWrapper from "../animations/LightPillarWrapper";
import "./layouts.css";

const AuthLayout = ({ children }) => {
  return (
    <LightPillarWrapper>
      <div className="auth-layout">
        <div className="auth-container">
          <div className="auth-card fade-in">{children}</div>
        </div>
      </div>
    </LightPillarWrapper>
  );
};

export default AuthLayout;
