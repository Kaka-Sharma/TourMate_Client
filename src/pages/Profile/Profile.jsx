import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaRupeeSign, FaUser } from "react-icons/fa";
import Spinner from "../../components/Spinner/Spinner";
import {
  getProfile,
  removeAvatar,
  updateAvatar,
  getMyBookings,
  deleteBooking,
  updateBooking,
} from "../../api/api";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [editingBooking, setEditingBooking] = useState(null);
  const [updatedGuests, setUpdatedGuests] = useState(1);

  const fileInputRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);

        if (userData.role === "user") {
          const bookingData = await getMyBookings();
          setBookings(bookingData);
        }
      } catch (error) {
        toast.error(error.message || "Failed to load profile");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setMenuOpen(false);
    }
  };

  const updateProfile = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const res = await updateAvatar(file);
      setUser(res);
      setPreview(null);
      setFile(null);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeProfilePhoto = async () => {
    setRemoving(true);

    try {
      const res = await removeAvatar();
      setUser(res);
      toast.success("Profile photo removed");
    } catch (error) {
      toast.error(error.message || "Remove failed");
    } finally {
      setRemoving(false);
    }
  };

  const handleDeleteBooking = (id) => {
    setSelectedBooking(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBooking(selectedBooking);
      setBookings((prev) => prev.filter((b) => b._id !== selectedBooking));
      toast.success("Booking cancelled");
    } catch (error) {
      toast.error(error.message || "Delete failed");
    } finally {
      setShowModal(false);
      setSelectedBooking(null);
    }
  };

  const handleEditBooking = (booking) => {
    navigate(`/booking/${booking.tour._id}`, {
      state: {
        bookingId: booking._id,
        guests: booking.guests,
      },
    });
  };

  const handleUpdateBooking = async () => {
    try {
      const updated = await updateBooking(editingBooking, {
        guests: updatedGuests,
      });

      setBookings((prev) =>
        prev.map((b) => (b._id === editingBooking ? { ...b, ...updated } : b)),
      );

      toast.success("Booking updated");
      setEditingBooking(null);
    } catch (error) {
      toast.error(error.message || "Update failed");
    }
  };

  if (loading)
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );

  return (
    <div
      className={styles.container}
      style={{
        "--profile-bg": preview
          ? `url(${preview})`
          : user?.avatar
            ? `url(${user.avatar})`
            : "none",
      }}
    >
      <div className={styles.profileCard}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <div
          ref={wrapperRef}
          className={styles.avatarWrapper}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
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

          {(uploading || removing) && (
            <div className={styles.avatarOverlay}>
              <div className={styles.spinner}></div>
            </div>
          )}

          <div className={styles.editIcon}>
            <FaCamera />
          </div>

          {menuOpen && (
            <div className={styles.avatarMenu}>
              <div
                className={styles.menuItem}
                onClick={() => fileInputRef.current.click()}
              >
                Change Photo
              </div>

              {user.avatar && (
                <div className={styles.menuItem} onClick={removeProfilePhoto}>
                  {removing ? "Removing..." : "Remove Photo"}
                </div>
              )}
            </div>
          )}
        </div>

        {preview && (
          <button
            className={styles.updateBtn}
            onClick={updateProfile}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save Avatar"}
          </button>
        )}

        <p>
          <strong></strong> {user.name}
        </p>
        <p>
          <strong></strong> {user.email}
        </p>

        {user?.role === "admin" && <span className={styles.role}>Admin</span>}
      </div>

      {user?.role === "user" && (
        <div className={styles.bookingSection}>
          <h3>My Bookings</h3>
          {bookings.length === 0 ? (
            <p>No bookings yet</p>
          ) : (
            <div className={styles.bookingGrid}>
              {bookings.map((booking) => (
                <div key={booking._id} className={styles.bookingCard}>
                  <h4>{booking.tour?.title}</h4>

                  {editingBooking === booking._id ? (
                    <input
                      type="number"
                      min="1"
                      value={updatedGuests}
                      onChange={(e) => setUpdatedGuests(e.target.value)}
                    />
                  ) : (
                    <p>Guests: {booking.guests}</p>
                  )}

                  <p>
                    Total: <FaRupeeSign className={styles.rupee} />
                    {booking.totalPrice}
                  </p>

                  <p className={`${styles.status} ${styles[booking.status]}`}>
                    Status: {booking.status}
                  </p>

                  {booking.status === "pending" && (
                    <>
                      {editingBooking === booking._id ? (
                        <>
                          <button
                            className={styles.updateBtn}
                            onClick={handleUpdateBooking}
                          >
                            Save
                          </button>

                          <button
                            className={styles.cancelBtn}
                            onClick={() => setEditingBooking(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <div className={styles.buttons}>
                            <button
                              className={styles.editBtn}
                              onClick={() => handleEditBooking(booking)}
                            >
                              Edit
                            </button>

                            <button
                              className={styles.cancelBtn}
                              onClick={() => handleDeleteBooking(booking._id)}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showModal && (
        <ConfirmModal
          message="Are you sure you want to cancel this booking?"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Profile;
