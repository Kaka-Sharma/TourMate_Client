import React from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <header>
      <div className={styles.topHeader}>
        <div className={styles.topRight}>
          <button className={styles.login} onClick={handleLogin}>
            Login
          </button>
          <button className={styles.register} onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>

      <div className={styles.mainHeader}>
        <div className={styles.logo}>
          <h2 className={styles.tour}>
            Tour<span className={styles.mate}>Mate</span>
          </h2>
        </div>

        <nav className={styles.navLinks}>
          <Link to="/">Home</Link>
          <Link to="/tours">Tours</Link>
          <Link to="/booking">Booking</Link>
        </nav>

        <div className={styles.searchBox}>
          <button className={styles.searchBtn}>
            <FiSearch className={styles.searchIcon} />
          </button>
          <input type="text" placeholder="Search destinations..." />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
