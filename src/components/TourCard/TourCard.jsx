import React from "react";
import styles from "./TourCard.module.css";
import { useNavigate } from "react-router-dom";
import { FaClock, FaLocationArrow, FaRupeeSign } from "react-icons/fa";

const TourCard = ({ tour }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/tour/${tour._id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {tour?.images?.length > 0 ? (
          <img
            src={tour.images[0]?.url}
            alt={tour.title}
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>No image</div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{tour?.title || "Untitled Tour"}</h3>

        <p className={styles.location}>
          <FaLocationArrow /> {tour?.location || "Unknown"}
        </p>

        <p className={styles.description}>
          {tour?.description
            ? tour.description.length > 100
              ? tour.description.slice(0, 100) + "..."
              : tour.description
            : "No description available"}
        </p>

        <div className={styles.details}>
          <span>
            <FaClock /> {tour?.duration || 0} days
          </span>
          <span>
            <FaRupeeSign className={styles.rupee} />
            {tour?.price || 0}
          </span>
        </div>

        <button className={styles.viewBtn} onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default TourCard;
