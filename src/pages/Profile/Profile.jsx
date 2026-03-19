import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaUser } from "react-icons/fa";
import { getProfile, removeAvatar, updateAvatar } from "../../api/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // spinner
  const [menuOpen, setMenuOpen] = useState(false); // dropdown menu toggle
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res);
      } catch (error) {
        console.error(error);
        setError(error.message || "Failed to fetch profile. Please login.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  // file selection
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setMenuOpen(false); // close menu after selection
    }
  };

  // update profile picture
  const updateProfile = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await updateAvatar(file);
      setUser(res);
      setPreview(null);
      setFile(null);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
  };

  // remove profile picture
  const removeProfilePhoto = async () => {
    try {
      const res = await removeAvatar();
      setUser(res);
      setPreview(null);
      setMenuOpen(false);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to remove profile picture");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.avatarWrapper}`)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.profileContainer}>
      <h2>Hello, {user?.name}</h2>

      <div className={styles.profileCard}>
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Avatar */}
        <div
          className={styles.avatarWrapper}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {user.avatar || preview ? (
            <img
              src={preview || user.avatar}
              alt="Avatar"
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarDefault}>
              <FaUser size={50} />
            </div>
          )}

          {uploading && (
            <div className={styles.avatarOverlay}>
              <div className={styles.spinner}></div>
            </div>
          )}
          <div className={styles.editIcon}>
            <FaCamera />
          </div>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className={styles.avatarMenu}>
              <div
                className={styles.menuItem}
                onClick={() => fileInputRef.current.click()}
              >
                Change Profile Picture
              </div>
              {user.avatar && (
                <div className={styles.menuItem} onClick={removeProfilePhoto}>
                  Remove Profile Picture
                </div>
              )}
            </div>
          )}
        </div>

        {/* Save Button */}
        {preview && (
          <button
            className={styles.updateBtn}
            onClick={updateProfile}
            disabled={uploading}
          >
            {uploading ? "uploading..." : "Save New Avatar"}
          </button>
        )}

        <p>
          <strong>Name</strong> <span>{user.name}</span>
        </p>
        <p>
          <strong>Email</strong> <span>{user.email}</span>
        </p>
        <p>
          <strong>Role</strong>{" "}
          <span className={styles.roleBadge}>{user.role}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
