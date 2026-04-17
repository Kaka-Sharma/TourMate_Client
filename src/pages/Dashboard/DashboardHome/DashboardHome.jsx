import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { getBookings, getTours } from "../../../api/api";
import { getUsers } from "../../../api/api";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";

const DashboardHome = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [tours, users, bookings] = await Promise.all([
          getTours({page: 1, limit: 1}),
          getUsers(),
          getBookings(),
        ]);

        const totalTour = tours.total || 0

        const totalUsers = users.length

        const revenue = bookings.reduce(
          (acc, item) => acc + (item.totalPrice || 0),
          0,
        );

        setStats([
          { title: "Total Tours", value: totalTour },
          { title: "Total Users", value: totalUsers },
          {
            title: "Revenue",
            value: (
              <>
                <div className={styles.iconContainer}>
                  <FaRupeeSign className={styles.rupee} />
                  {revenue}
                </div>
              </>
            ),
          },
        ]);
      } catch (error) {
        toast.error(error.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Dashboard Overview</h2>

      <div className={styles.cards}>
        {stats.map((item, i) => {
          return (
            <div className={styles.card} key={i}>
              <h3>{item.value}</h3>
              <p>{item.title}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.sir}>
        <h3>Welcome Sir</h3>
        <p>
          Manage tours, users, and bookings from this dashboard. Keep your
          platform updated and running smoothly.
        </p>
      </div>
    </div>
  );
};
export default DashboardHome;
