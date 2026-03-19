import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()

  //  Check login when navbar loads
  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, [location]);
  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true },
      );

      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header>
      <div className={styles.topHeader}>
        <div className={styles.topRight}>
          {!isLoggedIn ? (
            <React.Fragment>
              <button className={styles.login} onClick={handleLogin}>
                Login
              </button>
              <button className={styles.register} onClick={handleRegister}>
                Register
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button className={styles.profile} onClick={handleProfile}>
                Profile
              </button>
              <button className={styles.logout} onClick={handleLogout}>
                Logout
              </button>
            </React.Fragment>
          )}
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
