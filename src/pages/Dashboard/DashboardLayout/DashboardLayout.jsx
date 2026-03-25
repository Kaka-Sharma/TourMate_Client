import React from "react";
import styles from "./DashboardLayout.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { logoutUser } from "../../../api/api";
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
          <span className={styles.tour}>Tour</span>
          <span className={styles.mate}>Mate</span>
        </h2>
        <nav>
          <NavLink to="/admin" end>
            Dashboard
          </NavLink>
          <NavLink to="/admin/add-tour">Add Tour</NavLink>
          <NavLink to="/admin/tours">Manage Tours</NavLink>
          <NavLink to="/admin/bookings">Manage Bookings</NavLink>
          <NavLink to="/admin/users">Manage Users</NavLink>
        </nav>
      </aside>
      <div className={styles.main}>
        <header className={styles.topbar}>
          <h3>Welcome, {user?.name}</h3>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
