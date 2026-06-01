import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../api/api";
import Logo from "../../assets/TourmateLogo.png";
import { FaPlaneDeparture } from "react-icons/fa";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const [search, setSearch] = useState("");

  const isLoggedIn = !!user;

  const handleRegister = () => navigate("/register");
  const handleLogin = () => navigate("/login");
  const handleProfile = () => navigate("/profile");

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/tours?search=${search}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <h2 className={styles.tour}>
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </h2>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.topHeader}>
            <div className={styles.topRight}>
              {loading ? null : !isLoggedIn ? (
                <>
                  <button className={styles.login} onClick={handleLogin}>
                    Login
                  </button>
                  <button className={styles.register} onClick={handleRegister}>
                    Register
                  </button>
                </>
              ) : (
                <>
                  <button className={styles.profile} onClick={handleProfile}>
                    Profile
                  </button>
                  <button className={styles.logout} onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={styles.mainHeader}>
            <nav className={styles.navLinks}>
              <Link to="/">Home</Link>
              <Link to="/tours">Tours</Link>
              <Link to="about">About Us</Link>
            </nav>

            <div className={styles.searchBox}>
              <button className={styles.searchBtn} onClick={handleSearch}>
                <FiSearch className={styles.searchIcon} />
              </button>
              <input
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      </header>
      <div className={styles.bottomStripe}>
        <div className={styles.marquee}>
          <div className={styles.marqueeContent}>
            <div className={styles.movingText}>
              ✈ Explore • Discover • Adventure • Travel Smart with TourMate •
              Beach Tours • Mountain Trips • Luxury Hotels • Flight Booking •
            </div>

            <div className={styles.movingText}>
              ✈ Explore • Discover • Adventure • Travel Smart with TourMate •
              Beach Tours • Mountain Trips • Luxury Hotels • Flight Booking •
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
