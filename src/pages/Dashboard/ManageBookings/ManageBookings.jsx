import React, { useEffect, useState } from "react";
import styles from "./ManageBookings.module.css";
import { toast } from "react-toastify";
import { FaRupeeSign, FaTrash } from "react-icons/fa";
import Spinner from "../../../components/Spinner/Spinner";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import {
  getBookings,
  approveBooking,
  rejectBooking,
  completeBooking,
  deleteBooking,
} from "../../../api/api";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleApprove = async (id) => {
    try {
      const updated = await approveBooking(id);

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, ...updated } : b)),
      );

      toast.success("Booking approved");
    } catch (error) {
      toast.error(error.message || "Approve failed");
    }
  };

  const handleReject = async (id) => {
    try {
      const updated = await rejectBooking(id);

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, ...updated } : b)),
      );

      toast.success("Booking rejected");
    } catch (error) {
      toast.error(error.message || "Reject failed");
    }
  };

  const handleDelete = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBooking(selectedBooking._id);

      setBookings((prev) => prev.filter((b) => b._id !== selectedBooking._id));

      toast.success("Booking deleted");
    } catch (error) {
      toast.error(error.message || "Delete failed");
    } finally {
      setShowModal(false);
      setSelectedBooking(null);
    }
  };

  const handleComplete = async (id) => {
    try {
      const updated = await completeBooking(id);

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: updated.status } : b)),
      );

      toast.success("Booking completed");
    } catch (error) {
      toast.error(error.message || "Failed");
    }
  };

  if (loading) {
    return (
      <div className={styles.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  const renderActions = (booking) => {
    if (booking.status === "approved") {
      return (
        <button
          className={styles.completeBtn}
          onClick={() => handleComplete(booking._id)}
        >
          Mark Completed
        </button>
      );
    }

    if (booking.status === "pending") {
      return (
        <div className={styles.actionBtns}>
          <button
            className={styles.approveBtn}
            onClick={() => handleApprove(booking._id)}
          >
            Approve
          </button>

          <button
            className={styles.rejectBtn}
            onClick={() => handleReject(booking._id)}
          >
            Reject
          </button>
        </div>
      );
    }

    if (booking.status === "completed" || booking.status === "rejected") {
      return (
        <button
          className={styles.deleteBtn}
          onClick={() => handleDelete(booking)}
        >
          <FaTrash /> Delete
        </button>
      );
    }

    return null;
  };

  return (
    <div className={styles.container}>
      <h2>Manage Bookings</h2>

      {bookings.length === 0 ? (
        <p className={styles.empty}>No bookings found</p>
      ) : (
        <div className={styles.grid}>
          {bookings.map((booking) => (
            <div key={booking._id} className={styles.card}>
              <h3>{booking.tour?.title}</h3>

              <p>
                <strong>User:</strong> {booking.user?.name}
              </p>
              <p>
                <strong>Email:</strong> {booking.user?.email}
              </p>

              <p>
                <strong>Guests:</strong> {booking.guests}
              </p>

              <p>
                <strong>Total:</strong> <FaRupeeSign className={styles.rupee} />
                {booking.totalPrice}
              </p>
              <div className={styles.complete}>
                <span className={`${styles.status} ${styles[booking.status]}`}>
                  {booking.status}
                </span>

                {renderActions(booking)}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <ConfirmModal
          message={`Delete booking for "${selectedBooking?.tour?.title}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ManageBookings;
