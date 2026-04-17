import React from "react";
import styles from "./Footer.module.css";
import Logo from "../../assets/TourmateLogo.png";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.logoContainer}>
            <div>
              <h2 className={styles.brandName}>
                Tour<span className={styles.mate}>Mate</span>
              </h2>
              <h2 className={styles.logo}>
                <img src={Logo} alt="TourMate Logo" />
              </h2>
            </div>

            <p className={styles.text}>
              Discover unforgettable travel experiences with us. Plan your next
              adventure easily and explore the world like never before.
            </p>
          </div>
        </div>
        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/tours">Tours</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Contact Us</h3>
          <div className={styles.icons}>
            <p>
              <FaMapMarkerAlt className={styles.mapIcon} /> Punjab, India
            </p>
            <p>
              <FaEnvelope className={styles.emailIcon} /> support@tourmate.com
            </p>
            <p>
              <FaPhone className={styles.phoneIcon} /> +91 87986 *****
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Follow Us</h3>
          <div className={styles.socials}>
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        &copy;2026 TourMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
