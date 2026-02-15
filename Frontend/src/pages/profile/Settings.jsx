import { useState, useEffect } from "react";
import ProfileLayout from "../../components/layouts/ProfileLayout";
import "./profile.css";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Profile Settings
  const [profileForm, setProfileForm] = useState({
    username: "",
    email: "",
    bio: "",
    location: "",
    website: "",
  });

  // Password Settings
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    newFollower: true,
    newLike: true,
    newComment: true,
    playlistUpdates: false,
    newsletter: false,
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showActivity: true,
    showLikedSongs: true,
  });

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const fetchUserSettings = async () => {
    try {
      // Mock data - replace with API call
      setProfileForm({
        username: "musiclover",
        email: "user@example.com",
        bio: "Music enthusiast | Producer | DJ",
        location: "New York, NY",
        website: "https://musiclover.com",
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });
  };

  const handlePrivacyChange = (e) => {
    setPrivacy({
      ...privacy,
      [e.target.name]: e.target.checked,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile." });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }
    setLoading(true);
    try {
      // API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({ type: "success", text: "Password updated successfully!" });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update password." });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleNotificationsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({ type: "success", text: "Notification settings updated!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update settings." });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handlePrivacySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({ type: "success", text: "Privacy settings updated!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update settings." });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const sections = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "password", label: "Password", icon: "🔒" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "privacy", label: "Privacy", icon: "🛡️" },
    { id: "account", label: "Account", icon: "⚙️" },
  ];

  return (
    <ProfileLayout>
      <div className="settings-page">
        <div className="settings-header">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">
            Manage your account settings and preferences
          </p>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <div className="settings-layout">
          {/* Sidebar */}
          <div className="settings-sidebar">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`settings-nav-item ${activeSection === section.id ? "active" : ""}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-label">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="settings-content">
            {/* Profile Settings */}
            {activeSection === "profile" && (
              <form onSubmit={handleProfileSubmit} className="settings-form">
                <h2>Profile Settings</h2>

                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileForm.username}
                    onChange={handleProfileChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    rows="3"
                    placeholder="Tell us about yourself"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profileForm.location}
                    onChange={handleProfileChange}
                    placeholder="City, Country"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="website">Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={profileForm.website}
                    onChange={handleProfileChange}
                    placeholder="https://example.com"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            )}

            {/* Password Settings */}
            {activeSection === "password" && (
              <form onSubmit={handlePasswordSubmit} className="settings-form">
                <h2>Change Password</h2>

                <div className="input-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            )}

            {/* Notification Settings */}
            {activeSection === "notifications" && (
              <form
                onSubmit={handleNotificationsSubmit}
                className="settings-form"
              >
                <h2>Notification Preferences</h2>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={notifications.emailNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span>Email Notifications</span>
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="newFollower"
                      checked={notifications.newFollower}
                      onChange={handleNotificationChange}
                    />
                    <span>New followers</span>
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="newLike"
                      checked={notifications.newLike}
                      onChange={handleNotificationChange}
                    />
                    <span>New likes on your songs</span>
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="newComment"
                      checked={notifications.newComment}
                      onChange={handleNotificationChange}
                    />
                    <span>New comments</span>
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="playlistUpdates"
                      checked={notifications.playlistUpdates}
                      onChange={handleNotificationChange}
                    />
                    <span>Playlist updates</span>
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={notifications.newsletter}
                      onChange={handleNotificationChange}
                    />
                    <span>Newsletter and updates</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Preferences"}
                </button>
              </form>
            )}

            {/* Privacy Settings */}
            {activeSection === "privacy" && (
              <form onSubmit={handlePrivacySubmit} className="settings-form">
                <h2>Privacy Settings</h2>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="profilePublic"
                      checked={privacy.profilePublic}
                      onChange={handlePrivacyChange}
                    />
                    <span>Make profile public</span>
                  </label>
                  <p className="checkbox-help">
                    Public profiles can be seen by everyone
                  </p>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="showActivity"
                      checked={privacy.showActivity}
                      onChange={handlePrivacyChange}
                    />
                    <span>Show listening activity</span>
                  </label>
                  <p className="checkbox-help">
                    Let others see what you're listening to
                  </p>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="showLikedSongs"
                      checked={privacy.showLikedSongs}
                      onChange={handlePrivacyChange}
                    />
                    <span>Show liked songs</span>
                  </label>
                  <p className="checkbox-help">
                    Display your liked songs on your profile
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Preferences"}
                </button>
              </form>
            )}

            {/* Account Settings */}
            {activeSection === "account" && (
              <div className="settings-form">
                <h2>Account Management</h2>

                <div className="danger-zone">
                  <h3>Danger Zone</h3>

                  <div className="danger-item">
                    <div className="danger-info">
                      <h4>Delete Account</h4>
                      <p>Permanently delete your account and all data</p>
                    </div>
                    <button className="btn btn-danger">Delete Account</button>
                  </div>

                  <div className="danger-item">
                    <div className="danger-info">
                      <h4>Download Data</h4>
                      <p>Get a copy of your personal data</p>
                    </div>
                    <button className="btn btn-secondary">Request Data</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Settings;
