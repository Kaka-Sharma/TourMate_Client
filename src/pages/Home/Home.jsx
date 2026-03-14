import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Explore the World with TourMate</h1>
          <p>Discover amazing destinations and book unforgettable tours.</p>

          <div className={styles.heroSearch}>
            <input type="text" placeholder="Search destinations..." />
            <button>Search</button>
          </div>
        </div>
      </section>

      {/* Popular Tours */}
      <section className={styles.popular}>
        <h2>Popular Tours</h2>

        <div className={styles.tourGrid}>
          <div className={styles.card}>
            <img src="/images/paris.jpg" alt="Paris" />
            <h3>Paris</h3>
            <p>Starting from $499</p>
          </div>

          <div className={styles.card}>
            <img src="/images/bali.jpg" alt="Bali" />
            <h3>Bali</h3>
            <p>Starting from $399</p>
          </div>

          <div className={styles.card}>
            <img src="/images/dubai.jpg" alt="Dubai" />
            <h3>Dubai</h3>
            <p>Starting from $599</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.features}>
        <h2>Why Choose TourMate</h2>

        <div className={styles.featureGrid}>
          <div>
            <h3>Best Price</h3>
            <p>Affordable travel packages worldwide.</p>
          </div>

          <div>
            <h3>Secure Booking</h3>
            <p>Your booking is safe with our secure system.</p>
          </div>

          <div>
            <h3>24/7 Support</h3>
            <p>Our team is always ready to help you.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;