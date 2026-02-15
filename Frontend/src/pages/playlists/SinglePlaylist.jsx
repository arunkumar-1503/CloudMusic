import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PlaylistsLayout from "../../components/layouts/PlaylistsLayout";
import SongCard from "../../components/common/SongCard";
import "./playlists.css";

const SinglePlaylist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  const fetchPlaylist = async () => {
    try {
      // Mock data - replace with API call
      const mockPlaylist = {
        _id: id,
        name: "Chill Vibes",
        description: "Relaxing tunes for your day",
        isPublic: true,
        coverImage: "https://via.placeholder.com/300",
        songs: [
          {
            _id: "1",
            title: "Bohemian Rhapsody",
            artistName: "Queen",
            duration: 354,
          },
          {
            _id: "2",
            title: "Stairway to Heaven",
            artistName: "Led Zeppelin",
            duration: 482,
          },
          {
            _id: "3",
            title: "Imagine",
            artistName: "John Lennon",
            duration: 183,
          },
          {
            _id: "4",
            title: "Hotel California",
            artistName: "Eagles",
            duration: 391,
          },
        ],
        createdAt: "2024-01-15",
        updatedAt: "2024-02-01",
      };

      setPlaylist(mockPlaylist);
      setEditForm({
        name: mockPlaylist.name,
        description: mockPlaylist.description,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      // API call to update playlist
      setPlaylist({
        ...playlist,
        ...editForm,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      try {
        // API call to delete playlist
        navigate("/playlists");
      } catch (error) {
        console.error("Error deleting playlist:", error);
      }
    }
  };

  const handleRemoveSong = async (songId) => {
    if (window.confirm("Remove this song from the playlist?")) {
      try {
        // API call to remove song
        setPlaylist({
          ...playlist,
          songs: playlist.songs.filter((song) => song._id !== songId),
        });
      } catch (error) {
        console.error("Error removing song:", error);
      }
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const totalDuration =
    playlist?.songs?.reduce((total, song) => total + (song.duration || 0), 0) ||
    0;

  if (loading || !playlist) {
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
      <div className="single-playlist-page">
        {/* Playlist Header */}
        <div className="playlist-hero">
          <div className="playlist-hero-content">
            <div className="playlist-cover-large">
              <img src={playlist.coverImage} alt={playlist.name} />
            </div>

            <div className="playlist-info-large">
              <span className="playlist-badge">Playlist</span>

              {isEditing ? (
                <div className="edit-fields">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="edit-name-input"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    className="edit-description-input"
                    rows="2"
                  />
                  <div className="edit-actions">
                    <button
                      onClick={handleSaveEdit}
                      className="btn btn-primary btn-small"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn btn-secondary btn-small"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="playlist-title-large">{playlist.name}</h1>
                  {playlist.description && (
                    <p className="playlist-description">
                      {playlist.description}
                    </p>
                  )}
                </>
              )}

              <div className="playlist-stats">
                <span>👤 Created by You</span>
                <span>🎵 {playlist.songs.length} songs</span>
                <span>⏱️ {Math.floor(totalDuration / 60)} min total</span>
                <span>{playlist.isPublic ? "🌍 Public" : "🔒 Private"}</span>
              </div>

              <div className="playlist-actions">
                <button className="btn btn-primary btn-large">
                  ▶️ Play All
                </button>
                <button className="btn btn-secondary btn-large">
                  🔀 Shuffle
                </button>
                {!isEditing && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="btn btn-secondary btn-icon"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn btn-secondary btn-icon"
                    >
                      🗑️
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Songs List */}
        <div className="playlist-songs">
          <h2 className="section-title">Songs in this playlist</h2>

          {playlist.songs.length === 0 ? (
            <div className="empty-state">
              <p>No songs in this playlist yet</p>
              <Link to="/songs" className="btn btn-primary">
                Browse Songs
              </Link>
            </div>
          ) : (
            <div className="songs-list">
              <div className="songs-list-header">
                <span className="col-number">#</span>
                <span className="col-title">Title</span>
                <span className="col-artist">Artist</span>
                <span className="col-duration">Duration</span>
                <span className="col-actions"></span>
              </div>

              {playlist.songs.map((song, index) => (
                <div key={song._id} className="song-list-item">
                  <span className="col-number">{index + 1}</span>
                  <span className="col-title">{song.title}</span>
                  <span className="col-artist">{song.artistName}</span>
                  <span className="col-duration">
                    {formatDuration(song.duration)}
                  </span>
                  <span className="col-actions">
                    <button className="action-btn" title="Play">
                      ▶️
                    </button>
                    <button
                      className="action-btn"
                      title="Remove from playlist"
                      onClick={() => handleRemoveSong(song._id)}
                    >
                      ❌
                    </button>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PlaylistsLayout>
  );
};

export default SinglePlaylist;
