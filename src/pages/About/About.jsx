import React from "react";
import styles from "./About.module.css";
import featureImg from "/BackGround2.png";
import {
  FaMapMarkedAlt,
  FaShieldAlt,
  FaRupeeSign,
  FaUsers,
  FaPlaneDeparture,
} from "react-icons/fa";

const About = () => {
  return (
    <div className={styles.container1}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <p>
            Your trusted travel companion for discovering amazing destinations
            and booking unforgettable experiences.
          </p>
        </section>

        <div className={styles.about}>
          <section className={styles.section}>
            <h2>Explore The World With Tour<span className={styles.mate}>Mate</span></h2>
            <p>
              TourMate is a modern tour booking platform designed to make travel
              planning simple, fast, and enjoyable. We connect travelers with
              curated tours across the world, ensuring a smooth and secure
              booking experience.
            </p>
          </section>
        </div>
      </div>

      <div className={styles.featureContainer}>
        <div className={styles.featuredImg}>
          <img src={featureImg} className={styles.featureImg} alt="" />
        </div>
        <section className={styles.features}>
          <h2>Why Choose Us</h2>

          <div className={styles.grid}>
            <div className={styles.card}>
              <FaMapMarkedAlt className={styles.icon} />
              <h3>Best Destinations</h3>
              <p>Explore handpicked tours from top travel locations.</p>
            </div>

            <div className={styles.card}>
              <FaRupeeSign className={styles.icon} />
              <h3>Affordable Prices</h3>
              <p>We ensure budget-friendly packages for everyone.</p>
            </div>

            <div className={styles.card}>
              <FaShieldAlt className={styles.icon} />
              <h3>Secure Booking</h3>
              <p>Your data and payments are always safe with us.</p>
            </div>

            <div className={styles.card}>
              <FaUsers className={styles.icon} />
              <h3>24/7 Support</h3>
              <p>Our team is always ready to help you anytime.</p>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.mission}>
        <h2>Our Mission</h2>
        <p>
          To make travel accessible and stress-free for everyone by providing a
          reliable platform for discovering, booking, and managing tours
          effortlessly.
        </p>
      </section>

      <section className={styles.footerNote}>
        <h3>
          Start your journey with TourMate today{" "}
          <span className={styles.planeContainer}>
            <FaPlaneDeparture className={styles.plane} />
          </span>
        </h3>
      </section>
    </div>
  );
};

export default About;
