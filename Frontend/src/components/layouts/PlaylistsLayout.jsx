import LiquidEtherWrapper from "../animations/LiquidEtherWrapper";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import "./layouts.css";

const PlaylistsLayout = ({ children }) => {
  return (
    <LiquidEtherWrapper>
      <div className="playlists-layout">
        <Navbar />
        <div className="layout-container">
          <Sidebar />
          <main className="layout-main">
            <div className="playlists-content-wrapper fade-in">{children}</div>
          </main>
        </div>
      </div>
    </LiquidEtherWrapper>
  );
};

export default PlaylistsLayout;
