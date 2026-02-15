import LightRaysWrapper from "../animations/LightRaysWrapper";
import Navbar from "../common/Navbar";
import "./layouts.css";

const HomeLayout = ({ children }) => {
  return (
    <LightRaysWrapper>
      <div className="home-layout">
        <Navbar />
        <main className="home-main">
          <div className="home-content-wrapper fade-in">{children}</div>
        </main>
      </div>
    </LightRaysWrapper>
  );
};

export default HomeLayout;
