import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlaylistsLayout from "../../components/layouts/PlaylistsLayout";
import "./playlists.css";

const MyPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      // Mock data - replace with API call
      const mockPlaylists = [
        {
          _id: "1",
          name: "Chill Vibes",
          description: "Relaxing tunes for your day",
          songCount: 15,
          coverImage: "https://via.placeholder.com/200",
        },
        {
          _id: "2",
          name: "Workout Mix",
          description: "High energy for your workout",
          songCount: 20,
          coverImage: "https://via.placeholder.com/200",
        },
        {
          _id: "3",
          name: "Road Trip",
          description: "Perfect for long drives",
          songCount: 25,
          coverImage: "https://via.placeholder.com/200",
        },
        {
          _id: "4",
          name: "Study Session",
          description: "Focus and concentrate",
          songCount: 12,
          coverImage: "https://via.placeholder.com/200",
        },
      ];

      setPlaylists(mockPlaylists);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PlaylistsLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </PlaylistsLayout>
    );
  }

  return (
    <PlaylistsLayout>
      <div className="playlists-page">
        <div className="playlists-header">
          <h1 className="playlists-title">Your Playlists</h1>
          <Link to="/playlists/create" className="btn btn-primary">
            + Create Playlist
          </Link>
        </div>

        {playlists.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h2>No playlists yet</h2>
            <p>Create your first playlist to start organizing your music</p>
            <Link to="/playlists/create" className="btn btn-primary">
              Create Playlist
            </Link>
          </div>
        ) : (
          <div className="playlists-grid">
            {playlists.map((playlist) => (
              <Link
                to={`/playlists/${playlist._id}`}
                key={playlist._id}
                className="playlist-card"
              >
                <div className="playlist-card-image">
                  <img src={playlist.coverImage} alt={playlist.name} />
                  <div className="playlist-card-overlay">
                    <span className="play-count">
                      {playlist.songCount} songs
                    </span>
                  </div>
                </div>
                <div className="playlist-card-info">
                  <h3 className="playlist-card-title">{playlist.name}</h3>
                  <p className="playlist-card-description">
                    {playlist.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PlaylistsLayout>
  );
};

export default MyPlaylists;
