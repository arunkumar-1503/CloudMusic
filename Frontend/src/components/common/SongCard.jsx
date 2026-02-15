import { Link } from 'react-router-dom';
import { useState } from 'react';
import './common.css';

const SongCard = ({ song }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    // API call to like/unlike
  };

  const togglePlay = (e) => {
    e.preventDefault();
    setIsPlaying(!isPlaying);
    // Global player logic will go here
  };

  return (
    <div className="song-card">
      <Link to={`/song/${song._id}`} className="song-card-link">
        <div className="song-card-image">
          <img 
            src={song.coverImage || 'https://via.placeholder.com/200'} 
            alt={song.title}
          />
          <button 
            className={`play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
        
        <div className="song-card-info">
          <h3 className="song-title">{song.title}</h3>
          <p className="song-artist">{song.artistName || 'Unknown Artist'}</p>
          
          <div className="song-meta">
            <span className="song-duration">{song.durationFormatted || '3:30'}</span>
            <button 
              className={`like-btn ${isLiked ? 'liked' : ''}`}
              onClick={toggleLike}
            >
              {isLiked ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SongCard;