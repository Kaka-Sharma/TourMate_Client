import React from "react";
import styles from "./TourCard.module.css";

const TourCard = ({ tour }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {tour.images && tour.image[0] ? (
          <img
            src={tour.images[0].url}
            alt={tour.title}
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>No image</div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{tour.title}</h3>
        <p className={styles.location}>{tour.location}</p>
        <p className={styles.description}>
          {tour.description.length > 100
            ? tour.description.slice(0, 100) + "..."
            : tour.description}
        </p>
        <div className={styles.details}>
            <span>Duration: {tour.duration} days</span>
            <span>Price: ${tour.price}</span>
            <span>Rating: {tour.ratingAverage}</span>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
