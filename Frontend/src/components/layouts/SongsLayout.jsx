import GalaxyWrapper from "../animations/GalaxyWrapper";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import "./layouts.css";

const SongsLayout = ({ children }) => {
  return (
    <GalaxyWrapper>
      <div className="songs-layout">
        <Navbar />
        <div className="layout-container">
          <Sidebar />
          <main className="layout-main">
            <div className="songs-content-wrapper fade-in">{children}</div>
          </main>
        </div>
      </div>
    </GalaxyWrapper>
  );
};

export default SongsLayout;
