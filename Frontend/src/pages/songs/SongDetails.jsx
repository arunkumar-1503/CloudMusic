import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SongsLayout from "../../components/layouts/SongsLayout";
import SongCard from "../../components/common/SongCard";
import "./songs.css";

const SongDetails = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [relatedSongs, setRelatedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchSongDetails();
  }, [id]);

  const fetchSongDetails = async () => {
    try {
      // Mock data - replace with API call
      const mockSong = {
        _id: id,
        title: "Bohemian Rhapsody",
        artistName: "Queen",
        artist: { _id: "1", username: "Queen" },
        album: "A Night at the Opera",
        duration: 354,
        plays: 1500000,
        likes: 500000,
        releaseDate: "1975-10-31",
        genre: "rock",
        lyrics: `Is this the real life?
Is this just fantasy?
Caught in a landslide,
No escape from reality...`,
        coverImage: "https://via.placeholder.com/500",
        audioUrl: "https://example.com/song.mp3",
      };

      const mockRelated = [
        {
          _id: "2",
          title: "We Will Rock You",
          artistName: "Queen",
          duration: 122,
        },
        {
          _id: "3",
          title: "Another One Bites the Dust",
          artistName: "Queen",
          duration: 215,
        },
        {
          _id: "4",
          title: "Under Pressure",
          artistName: "Queen",
          duration: 247,
        },
      ];

      setSong(mockSong);
      setRelatedSongs(mockRelated);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching song:", error);
      setLoading(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // API call to like/unlike
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Global player logic will go here
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  if (loading || !song) {
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
      <div className="song-details-page">
        {/* Hero Section */}
        <div className="song-hero">
          <div className="song-hero-content">
            <div className="song-cover-large">
              <img src={song.coverImage} alt={song.title} />
            </div>

            <div className="song-info-large">
              <span className="song-badge">Single</span>
              <h1 className="song-title-large">{song.title}</h1>
              <p className="song-artist-large">by {song.artistName}</p>

              <div className="song-stats">
                <span>🎵 {formatNumber(song.plays)} plays</span>
                <span>❤️ {formatNumber(song.likes)} likes</span>
                <span>📅 {new Date(song.releaseDate).getFullYear()}</span>
                <span>⏱️ {formatDuration(song.duration)}</span>
              </div>

              <div className="song-actions">
                <button
                  className={`btn btn-primary btn-large ${isPlaying ? "playing" : ""}`}
                  onClick={handlePlay}
                >
                  {isPlaying ? "⏸️ Pause" : "▶️ Play"}
                </button>

                <button
                  className={`btn btn-secondary btn-icon ${isLiked ? "liked" : ""}`}
                  onClick={handleLike}
                >
                  {isLiked ? "❤️" : "🤍"}
                </button>

                <button className="btn btn-secondary btn-icon">
                  📋 Add to Playlist
                </button>

                <button className="btn btn-secondary btn-icon">📤 Share</button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="song-content">
          <div className="song-main">
            {/* Lyrics Section */}
            <section className="song-section">
              <h2 className="section-title">Lyrics</h2>
              <div className="lyrics-box">
                <pre className="lyrics-text">{song.lyrics}</pre>
              </div>
            </section>

            {/* About Section */}
            <section className="song-section">
              <h2 className="section-title">About</h2>
              <div className="about-grid">
                <div className="about-item">
                  <span className="about-label">Artist</span>
                  <span className="about-value">{song.artistName}</span>
                </div>
                <div className="about-item">
                  <span className="about-label">Album</span>
                  <span className="about-value">{song.album}</span>
                </div>
                <div className="about-item">
                  <span className="about-label">Genre</span>
                  <span className="about-value">{song.genre}</span>
                </div>
                <div className="about-item">
                  <span className="about-label">Released</span>
                  <span className="about-value">
                    {new Date(song.releaseDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="song-sidebar">
            {/* Artist Card */}
            <div className="artist-card">
              <h3>About the Artist</h3>
              <div className="artist-info">
                <div className="artist-avatar">
                  <img
                    src="https://via.placeholder.com/100"
                    alt={song.artistName}
                  />
                </div>
                <div className="artist-details">
                  <h4>{song.artistName}</h4>
                  <p>{formatNumber(song.plays)} monthly listeners</p>
                </div>
              </div>
              <button className="btn btn-secondary btn-full">
                View Artist
              </button>
            </div>

            {/* Related Songs */}
            <div className="related-songs">
              <h3>You might also like</h3>
              <div className="related-list">
                {relatedSongs.map((related) => (
                  <div key={related._id} className="related-item">
                    <img
                      src="https://via.placeholder.com/50"
                      alt={related.title}
                    />
                    <div className="related-info">
                      <h4>{related.title}</h4>
                      <p>{related.artistName}</p>
                    </div>
                    <button className="play-mini">▶️</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SongsLayout>
  );
};

export default SongDetails;
