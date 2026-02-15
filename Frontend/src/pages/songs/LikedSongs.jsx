import { useState, useEffect } from "react";
import SongsLayout from "../../components/layouts/SongsLayout";
import SongCard from "../../components/common/SongCard";
import "./songs.css";

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLikedSongs();
  }, []);

  const fetchLikedSongs = async () => {
    try {
      // Mock data - replace with API call
      const mockSongs = [
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
      ];

      setLikedSongs(mockSongs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching liked songs:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SongsLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </SongsLayout>
    );
  }

  return (
    <SongsLayout>
      <div className="liked-songs-page">
        <div className="page-header">
          <div className="header-icon">❤️</div>
          <div className="header-info">
            <h1 className="page-title">Liked Songs</h1>
            <p className="page-stats">
              {likedSongs.length} {likedSongs.length === 1 ? "song" : "songs"}
            </p>
          </div>
        </div>

        {likedSongs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎵</div>
            <h2>No liked songs yet</h2>
            <p>Songs you like will appear here</p>
            <button className="btn btn-primary">Browse Songs</button>
          </div>
        ) : (
          <div className="songs-grid">
            {likedSongs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        )}
      </div>
    </SongsLayout>
  );
};

export default LikedSongs;
