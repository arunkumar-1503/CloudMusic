import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./common.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <span className="logo-gradient">Music Cloud</span>
          </Link>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>
        </div>

        <div className="navbar-right">
          {user ? (
            <>
              <Link to="/upload" className="nav-link">
                <span className="nav-icon">📤</span>
                <span className="nav-text">Upload</span>
              </Link>

              <div className="profile-menu">
                <button className="profile-btn">
                  <img
                    src={
                      user.profilePicture || "https://via.placeholder.com/32"
                    }
                    alt={user.username}
                    className="profile-img"
                  />
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <Link to="/playlists" className="dropdown-item">
                    Playlists
                  </Link>
                  <Link to="/liked" className="dropdown-item">
                    Liked Songs
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
