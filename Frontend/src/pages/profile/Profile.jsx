import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileLayout from "../../components/layouts/ProfileLayout";
import SongCard from "../../components/common/SongCard";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userSongs, setUserSongs] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("songs");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Mock data - replace with API call
      const mockUser = {
        id: "1",
        username: "musiclover",
        email: "user@example.com",
        profilePicture: "https://via.placeholder.com/150",
        bio: "Music enthusiast | Producer | DJ",
        location: "New York, NY",
        website: "https://musiclover.com",
        joinedDate: "2024-01-15",
        role: "artist",
        stats: {
          songs: 12,
          playlists: 5,
          followers: 1234,
          following: 567,
        },
      };

      const mockSongs = [
        {
          _id: "1",
          title: "My First Track",
          artistName: "musiclover",
          duration: 245,
        },
        {
          _id: "2",
          title: "Summer Vibes",
          artistName: "musiclover",
          duration: 198,
        },
        {
          _id: "3",
          title: "Night Drive",
          artistName: "musiclover",
          duration: 312,
        },
      ];

      const mockPlaylists = [
        { _id: "1", name: "My Favorites", songCount: 15 },
        { _id: "2", name: "Production Works", songCount: 8 },
      ];

      setUser(mockUser);
      setUserSongs(mockSongs);
      setUserPlaylists(mockPlaylists);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <ProfileLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div className="profile-page">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-cover">
            <div className="profile-cover-image"></div>
          </div>

          <div className="profile-info">
            <div className="profile-avatar">
              <img src={user.profilePicture} alt={user.username} />
            </div>

            <div className="profile-details">
              <h1 className="profile-name">{user.username}</h1>
              <p className="profile-email">{user.email}</p>

              {user.bio && <p className="profile-bio">{user.bio}</p>}

              <div className="profile-meta">
                {user.location && (
                  <span className="meta-item">📍 {user.location}</span>
                )}
                {user.website && (
                  <span className="meta-item">🔗 {user.website}</span>
                )}
                <span className="meta-item">
                  📅 Joined {new Date(user.joinedDate).toLocaleDateString()}
                </span>
                {user.role === "artist" && (
                  <span className="meta-item artist-badge">🎤 Artist</span>
                )}
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn btn-primary">Edit Profile</button>
              <button className="btn btn-secondary">Share</button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{user.stats.songs}</span>
            <span className="stat-label">Songs</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user.stats.playlists}</span>
            <span className="stat-label">Playlists</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user.stats.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user.stats.following}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === "songs" ? "active" : ""}`}
            onClick={() => setActiveTab("songs")}
          >
            Songs
          </button>
          <button
            className={`tab-btn ${activeTab === "playlists" ? "active" : ""}`}
            onClick={() => setActiveTab("playlists")}
          >
            Playlists
          </button>
          <button
            className={`tab-btn ${activeTab === "liked" ? "active" : ""}`}
            onClick={() => setActiveTab("liked")}
          >
            Liked
          </button>
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          {activeTab === "songs" && (
            <div className="songs-grid">
              {userSongs.map((song) => (
                <SongCard key={song._id} song={song} />
              ))}
            </div>
          )}

          {activeTab === "playlists" && (
            <div className="playlists-mini-grid">
              {userPlaylists.map((playlist) => (
                <Link
                  to={`/playlists/${playlist._id}`}
                  key={playlist._id}
                  className="playlist-mini-card"
                >
                  <div className="playlist-mini-image">
                    <img
                      src="https://via.placeholder.com/100"
                      alt={playlist.name}
                    />
                  </div>
                  <div className="playlist-mini-info">
                    <h4>{playlist.name}</h4>
                    <p>{playlist.songCount} songs</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === "liked" && (
            <div className="empty-state">
              <p>
                View your liked songs in the{" "}
                <Link to="/liked">Liked Songs</Link> page
              </p>
            </div>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
