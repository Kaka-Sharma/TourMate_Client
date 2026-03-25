import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { FiSearch } from "react-icons/fi";
import { MdExplore } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { getPopularTours } from "../../api/api"; // ✅ use this

const Home = () => {
  const [popularTours, setPopularTours] = useState([]);

  useEffect(() => {
    const fetchPopularTours = async () => {
      try {
        const data = await getPopularTours(); // ✅ direct API
        setPopularTours(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopularTours();
  }, []);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            <MdExplore className={styles.heroIcon} />
            Explore the World with TourMate
          </h1>
          <p>Discover amazing destinations and book unforgettable tours.</p>

          <div className={styles.heroSearch}>
            <button className={styles.heroSearchBtn}>
              <FiSearch className={styles.heroSearchIcon} />
            </button>
            <input type="text" placeholder="Search destinations..." />
          </div>
        </div>
      </section>

      <section className={styles.popular}>
        <h2>
          <FaMapMarkedAlt /> Popular Tours
        </h2>

        <div className={styles.tourGrid}>
          {popularTours.length === 0 ? (
            <p>No popular tours found</p>
          ) : (
            popularTours.map((tour) => (
              <div key={tour._id} className={styles.card}>
                <img
                  src={tour.images?.[0]?.url} // ✅ fixed
                  alt={tour.title}
                />
                <h3>
                  {tour.title} ⭐ {/* 🔥 nice touch */}
                </h3>
                <p>Starting from ₹{tour.price}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className={styles.features}>
        <h2>
          <MdExplore /> Why Choose TourMate
        </h2>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FaMapMarkedAlt className={styles.featureIcon} />
            <h3>Best Price</h3>
            <p>Affordable travel packages worldwide.</p>
          </div>

          <div className={styles.featureCard}>
            <BsShieldCheck className={styles.featureIcon} />
            <h3>Secure Booking</h3>
            <p>Your booking is safe with our secure system.</p>
          </div>

          <div className={styles.featureCard}>
            <MdSupportAgent className={styles.featureIcon} />
            <h3>24/7 Support</h3>
            <p>Our team is always ready to help you.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;