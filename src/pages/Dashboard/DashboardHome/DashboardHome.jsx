import React from "react";
import styles from "./Dashboard.module.css";

const DashboardHome = () => {
  const stats = [
    { title: "Total Tours", value: 12 },
    { title: "Total Users", value: 45 },
    { title: "Bookings", value: 28 },
    { title: "Revenue", value: "$12,500" },
  ];
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
        <p>Manage tours, users, and bookings from this dashboard. Keep your
          platform updated and running smoothly.</p>
      </div>
    </div>
  );
};
export default DashboardHome;
