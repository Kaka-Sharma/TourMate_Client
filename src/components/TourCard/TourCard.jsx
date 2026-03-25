import React from "react";
import styles from "./TourCard.module.css";

const TourCard = ({ tour }) => {
  return (
    <div className={styles.card}>
      
      {/* Image */}
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

      {/* Info */}
      <div className={styles.info}>
        <h3 className={styles.title}>{tour?.title || "Untitled Tour"}</h3>

        <p className={styles.location}>📍 {tour?.location || "Unknown"}</p>

        <p className={styles.description}>
          {tour?.description
            ? tour.description.length > 100
              ? tour.description.slice(0, 100) + "..."
              : tour.description
            : "No description available"}
        </p>

        <div className={styles.details}>
          <span>⏱ {tour?.duration || 0} days</span>
          <span>💰 &#8377;{tour?.price || 0}</span>
          <span>⭐ {tour?.ratingAverage || "4.5"}</span>
        </div>
      </div>

    </div>
  );
};

export default TourCard;