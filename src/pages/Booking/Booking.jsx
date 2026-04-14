import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking, getTour } from "../../api/api";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./Booking.module.css";
import { FaRupeeSign } from "react-icons/fa";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(true);

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
      await createBooking(id, { guests });
      toast.success("Booking successful");
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
      <h2>Confirm Your Booking</h2>

      <div className={styles.card}>
        <h3>{tour?.title}</h3>
        <p>Price per person: ₹{tour?.price}</p>

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
          Total: <FaRupeeSign />
          {tour?.price * guests}
        </h4>

        <button className={styles.bookBtn} onClick={handleBooking}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Booking;
