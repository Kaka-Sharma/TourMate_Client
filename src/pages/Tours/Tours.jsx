import React, { useEffect, useState } from "react";
import styles from "./Tours.module.css";
import { getTours } from "../../api/api";
import TourCard from "../../components/TourCard/TourCard";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search");

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const res = await getTours({
          search,
          page,
          limit: 9,
        });

        setTours(res.data || []);
        setTotalPages(res.totalPages || 1);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [search, page]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>
        <FaMapMarkedAlt className={styles.map} />
        Explore Tours
      </h2>

      {loading ? (
        <div className={styles.loader}></div>
      ) : tours.length > 0 ? (
        <>
          <div className={styles.container}>
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <p>No tours available.</p>
        </div>
      )}
    </div>
  );
};

export default Tours;