import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaylistsLayout from "../../components/layouts/PlaylistsLayout";
import "./playlists.css";

const CreatePlaylist = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: true,
  });
  const [coverFile, setCoverFile] = useState(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isPublic: e.target.checked,
    });
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

    if (!formData.name) {
      setError("Please enter a playlist name");
      return;
    }

    setCreating(true);

    try {
      // API call will go here in Phase 4
      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigate("/playlists");
    } catch (err) {
      setError("Failed to create playlist. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <PlaylistsLayout>
      <div className="create-playlist-page">
        <div className="create-playlist-header">
          <h1 className="create-playlist-title">Create New Playlist</h1>
          <p className="create-playlist-subtitle">
            Organize your music your way
          </p>
        </div>

        <form className="create-playlist-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-row">
            <div className="form-col">
              {/* Cover Image Upload */}
              <div className="cover-upload">
                <input
                  type="file"
                  id="cover"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="file-input"
                />
                <label htmlFor="cover" className="cover-label">
                  {coverFile ? (
                    <img
                      src={URL.createObjectURL(coverFile)}
                      alt="Cover preview"
                      className="cover-preview"
                    />
                  ) : (
                    <>
                      <span className="cover-icon">🖼️</span>
                      <span className="cover-text">Add Cover Image</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="form-col">
              {/* Playlist Details */}
              <div className="input-group">
                <label htmlFor="name">Playlist Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Chill Vibes, Workout Mix"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="What's this playlist about?"
                  rows="3"
                />
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={handleCheckboxChange}
                  />
                  <span>Make playlist public</span>
                </label>
                <p className="checkbox-help">
                  Public playlists can be seen by everyone
                </p>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/playlists")}
              disabled={creating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={creating}
            >
              {creating ? "Creating..." : "Create Playlist"}
            </button>
          </div>
        </form>
      </div>
    </PlaylistsLayout>
  );
};

export default CreatePlaylist;
