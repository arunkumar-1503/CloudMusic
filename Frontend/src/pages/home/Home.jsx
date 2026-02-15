import { useState, useEffect } from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import SongCard from "../../components/common/SongCard";
import "./home.css";

const Home = () => {
  const [featuredSongs, setFeaturedSongs] = useState([]);
  const [recentSongs, setRecentSongs] = useState([]);
  const [popularSongs, setPopularSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      // Mock data - replace with API call in Phase 4
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
        {
          _id: "4",
          title: "Like a Rolling Stone",
          artistName: "Bob Dylan",
          duration: 365,
        },
        {
          _id: "5",
          title: "Smells Like Teen Spirit",
          artistName: "Nirvana",
          duration: 301,
        },
        {
          _id: "6",
          title: "Hotel California",
          artistName: "Eagles",
          duration: 391,
        },
      ];

      setFeaturedSongs(mockSongs.slice(0, 4));
      setRecentSongs(mockSongs.slice(2, 6));
      setPopularSongs(mockSongs.slice(0, 6));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <HomeLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="home-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="gradient-text">Music Cloud</span>
            </h1>
            <p className="hero-subtitle">
              Stream millions of songs, create playlists, and discover new music
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Start Listening</button>
              <button className="btn btn-secondary">Browse Library</button>
            </div>
          </div>
        </section>

        {/* Featured Songs */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Featured Today</h2>
            <a href="/songs" className="section-link">
              View all →
            </a>
          </div>
          <div className="songs-grid">
            {featuredSongs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Recently Added</h2>
            <a href="/songs" className="section-link">
              View all →
            </a>
          </div>
          <div className="songs-grid">
            {recentSongs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        </section>

        {/* Popular Now */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Popular Now</h2>
            <a href="/songs" className="section-link">
              View all →
            </a>
          </div>
          <div className="songs-grid">
            {popularSongs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to start your musical journey?</h2>
            <p>Join millions of listeners and artists on Music Cloud</p>
            <button className="btn btn-primary">Get Started Free</button>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
};

export default Home;
