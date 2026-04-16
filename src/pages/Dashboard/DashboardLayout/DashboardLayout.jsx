import React from "react";
import styles from "./DashboardLayout.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { logoutUser } from "../../../api/api";
import Logo from "../../../assets/TourmateLogo.png";
import {
  FaHome,
  FaMapMarkedAlt,
  FaClipboardList,
  FaUsers,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>
          <p className={styles.tour}>Tour<span className={styles.mate}>Mate</span></p>
          <img src={Logo} alt="Logo" />{" "}
        </h2>

        <nav className={styles.nav}>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <FaHome /> <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/add-tour"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <FaPlus /> <span>Add Tour</span>
          </NavLink>

          <NavLink
            to="/admin/tours"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <FaMapMarkedAlt /> <span>Manage Tours</span>
          </NavLink>

          <NavLink
            to="/admin/bookings"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <FaClipboardList /> <span>Bookings</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <FaUsers /> <span>Users</span>
          </NavLink>
        </nav>

        <button className={styles.logout} onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <h3>Welcome, {user?.name}</h3>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
