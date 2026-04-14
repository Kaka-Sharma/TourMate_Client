import React from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../api/api";
import Logo from '../../assets/TourmateLogo.png'
const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

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

  return (
    <header>
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
        <div className={styles.logo}>
          <h2 className={styles.tour}>
            {/* Tour<span className={styles.mate}>Mate</span> */}
            <img src={Logo} alt="Logo"/>
          </h2>
        </div>

        <nav className={styles.navLinks}>
          <Link to="/">Home</Link>
          <Link to="/tours">Tours</Link>
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
