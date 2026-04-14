import React, { useEffect, useState } from "react";
import styles from "./Tours.module.css";
import { getTours } from "../../api/api";
import TourCard from "../../components/TourCard/TourCard";
import {FaMapMarkedAlt} from 'react-icons/fa'
const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await getTours();

        if (Array.isArray(res)) {
          setTours(res);
        } else {
          setTours([]);
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}><FaMapMarkedAlt className={styles.map}/>Explore Tours</h2>

      {loading ? (
        <div className={styles.loader}></div>
      ) : tours.length > 0 ? (
        <div className={styles.container}>
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No tours available.</p>
        </div>
      )}
    </div>
  );
};

export default Tours;