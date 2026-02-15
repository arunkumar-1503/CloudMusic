import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SongsLayout from "../../components/layouts/SongsLayout";
import "./songs.css";

const UploadSong = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    lyrics: "",
    releaseDate: "",
  });
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  const genres = [
    "pop",
    "rock",
    "jazz",
    "classical",
    "hiphop",
    "electronic",
    "rnb",
    "country",
    "folk",
    "other",
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    } else {
      setError("Please select a valid audio file");
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCoverFile(file);
    } else {
      setError("Please select a valid image file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!audioFile) {
      setError("Please select an audio file");
      return;
    }

    if (!formData.title) {
      setError("Please enter a song title");
      return;
    }

    setUploading(true);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    try {
      // API call will go here in Phase 4
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Redirect to songs page
      navigate("/songs");
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      clearInterval(interval);
    }
  };

  return (
    <SongsLayout>
      <div className="upload-page">
        <div className="upload-header">
          <h1 className="upload-title">Upload Your Music</h1>
          <p className="upload-subtitle">
            Share your music with the world. Fill in the details below.
          </p>
        </div>

        <form className="upload-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          {/* Audio File Upload */}
          <div className="upload-section">
            <h2 className="section-title">Audio File</h2>
            <div className="file-upload-area">
              <input
                type="file"
                id="audio"
                accept="audio/*"
                onChange={handleAudioChange}
                className="file-input"
              />
              <label htmlFor="audio" className="file-label">
                <span className="file-icon">🎵</span>
                <span className="file-text">
                  {audioFile ? audioFile.name : "Click to select audio file"}
                </span>
                <span className="file-info">MP3, WAV, AAC (max 10MB)</span>
              </label>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="upload-section">
            <h2 className="section-title">Cover Image (Optional)</h2>
            <div className="file-upload-area">
              <input
                type="file"
                id="cover"
                accept="image/*"
                onChange={handleCoverChange}
                className="file-input"
              />
              <label htmlFor="cover" className="file-label">
                <span className="file-icon">🖼️</span>
                <span className="file-text">
                  {coverFile ? coverFile.name : "Click to select cover image"}
                </span>
                <span className="file-info">JPEG, PNG, WebP (max 5MB)</span>
              </label>
            </div>
          </div>

          {/* Song Details */}
          <div className="upload-section">
            <h2 className="section-title">Song Details</h2>
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="title">Song Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter song title"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="artist">Artist Name</label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleInputChange}
                  placeholder="Enter artist name"
                />
              </div>

              <div className="input-group">
                <label htmlFor="album">Album</label>
                <input
                  type="text"
                  id="album"
                  name="album"
                  value={formData.album}
                  onChange={handleInputChange}
                  placeholder="Enter album name"
                />
              </div>

              <div className="input-group">
                <label htmlFor="genre">Genre</label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                >
                  <option value="">Select genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="releaseDate">Release Date</label>
                <input
                  type="date"
                  id="releaseDate"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Lyrics */}
          <div className="upload-section">
            <h2 className="section-title">Lyrics (Optional)</h2>
            <div className="input-group">
              <textarea
                id="lyrics"
                name="lyrics"
                value={formData.lyrics}
                onChange={handleInputChange}
                placeholder="Enter song lyrics..."
                rows="6"
              />
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="progress-text">Uploading... {uploadProgress}%</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Song"}
            </button>
          </div>
        </form>
      </div>
    </SongsLayout>
  );
};

export default UploadSong;
