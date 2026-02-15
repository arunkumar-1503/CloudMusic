import { NavLink } from "react-router-dom";
import "./common.css";

const Sidebar = () => {
  const menuItems = [
    { path: "/", icon: "🏠", label: "Home" },
    { path: "/songs", icon: "🎵", label: "Songs" },
    { path: "/playlists", icon: "📋", label: "Playlists" },
    { path: "/liked", icon: "❤️", label: "Liked Songs" },
    { path: "/profile", icon: "👤", label: "Profile" },
    { path: "/upload", icon: "📤", label: "Upload" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="now-playing">
          <div className="now-playing-indicator"></div>
          <span>Now Playing</span>
        </div>
        <div className="sidebar-player">{/* Mini player will go here */}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
