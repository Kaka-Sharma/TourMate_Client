import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createBooking, getTour, updateBooking } from "../../api/api";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./Booking.module.css";
import { FaRupeeSign } from "react-icons/fa";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const editData = location.state;

  const isEditMode = !!editData;
  const [tour, setTour] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (editData) {
      setGuests(editData.guests);
    }
  }, [editData]);
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await getTour(id);
        setTour(data);
      } catch (error) {
        toast.error(error.message || "Failed to load tour");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id, navigate]);

  const handleBooking = async () => {
    try {
      if (isEditMode) {
        await updateBooking(editData.bookingId, { guests });
        toast.success("Booking Updated");
      } else {
        await createBooking(id, { guests });
        toast.success("Booking successful");
      }
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Booking failed");
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className={styles.container}>
      <h2>{!isEditMode ? "Confirm Your Booking" : "Update Booking"}</h2>

      <div className={styles.card}>
        <h3>{tour?.title}</h3>
        <p>
          Price per person: <FaRupeeSign className={styles.rupee1} />
          {tour?.price}
        </p>

        <div className={styles.inputGroup}>
          <label>Number of Guests</label>
          <input
            type="number"
            value={guests}
            min="1"
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </div>

        <h4>
          Total: <FaRupeeSign className={styles.rupee} />
          {tour?.price * guests}
        </h4>

        <button className={styles.bookBtn} onClick={handleBooking}>
          {isEditMode ? "Update Booking" : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default Booking;
