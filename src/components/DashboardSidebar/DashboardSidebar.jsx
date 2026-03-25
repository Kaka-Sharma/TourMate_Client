import React from "react";
import styles from "./DashboardSidebar.module.css";
import { NavLink } from "react-router-dom";
import {
  FaClipboardList,
  FaHome,
  FaMapMarkedAlt,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

const DashboardSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>TourMate</h2>
        <p>Admin Panel</p>
      </div>
      <nav className={styles.nav}>
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/tours/admin"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <FaMapMarkedAlt />
        </NavLink>
        <NavLink
          to="admin/users"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <FaUsers />
        </NavLink>
        <NavLink
          to="/admin/bookings"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <FaClipboardList />
        </NavLink>
      </nav>
      <div className={styles.bottom}>
        <button className={styles.logout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
