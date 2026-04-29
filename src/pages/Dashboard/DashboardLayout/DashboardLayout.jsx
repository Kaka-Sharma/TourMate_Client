import React, { useState } from "react";
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
  FaBars,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // ✅ added

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
      
      {/* ✅ Overlay (mobile) */}
      {open && (
        <div
          className={styles.sidebarOverlay}
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* ✅ Sidebar */}
      <aside
        className={`${styles.sidebar} ${
          open ? styles.activeSidebar : ""
        }`}
      >
        <h2 className={styles.logo}>
          <p className={styles.tour}>
            Tour<span className={styles.mate}>Mate</span>
          </p>
          <img src={Logo} alt="Logo" />
        </h2>

        <nav className={styles.nav}>
          <NavLink
            to="/admin"
            end
            onClick={() => setOpen(false)} 
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            <FaHome /> <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/add-tour"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            <FaPlus /> <span>Add Tour</span>
          </NavLink>

          <NavLink
            to="/admin/tours"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            <FaMapMarkedAlt /> <span>Manage Tours</span>
          </NavLink>

          <NavLink
            to="/admin/bookings"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            <FaClipboardList /> <span>Bookings</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
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
          
          <button
            className={styles.menuBtn}
            onClick={() => setOpen(true)}
          >
            <FaBars/>
          </button>

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