import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { FiSearch } from "react-icons/fi";
import { MdExplore } from "react-icons/md";
import { FaMapMarkedAlt, FaRupeeSign } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { getPopularTours } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [popularTours, setPopularTours] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/tour/${id}`);
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/tours?search=${search}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const fetchPopularTours = async () => {
    try {
      setLoading(true);

      const res = await getPopularTours({
        page,
        limit: 8,
      });

      setPopularTours(res.data || []);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      console.error("Error fetching popular tours:", error);
      setPopularTours([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularTours();
  }, [page]);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            <MdExplore className={styles.heroIcon} />
            Explore the World with TourMate
          </h1>
          <p>Discover amazing destinations and book unforgettable tours.</p>

          <div className={styles.heroSearch}>
            <button
              className={styles.heroSearchBtn}
              onClick={handleSearch}
            >
              <FiSearch className={styles.heroSearchIcon} />
            </button>

            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </section>

      <section className={styles.popular}>
        <h2>
          <FaMapMarkedAlt /> Popular Tours
        </h2>

        {loading ? (
          <div className={styles.loader}></div>
        ) : popularTours.length === 0 ? (
          <p>No popular tours found</p>
        ) : (
          <>
            <div className={styles.tourGrid}>
              {popularTours.map((tour) => (
                <div
                  key={tour._id}
                  className={styles.card}
                  onClick={() => handleClick(tour._id)}
                >
                  <img
                    src={tour.images?.[0]?.url}
                    alt={tour.title}
                  />
                  <h3>{tour.title}</h3>
                  <p>
                    Starting from{" "}
                    <FaRupeeSign className={styles.rupee} />
                    {tour.price}
                  </p>
                </div>
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
        )}
      </section>

      <section className={styles.features}>
        <h2>
          <MdExplore className={styles.exploreIcon} /> Why Choose TourMate
        </h2>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FaMapMarkedAlt className={styles.featureIcon} />
            <h3>Best Price</h3>
            <p>Affordable travel packages worldwide.</p>
          </div>

          <div className={styles.featureCard}>
            <BsShieldCheck className={styles.featureIcon} />
            <h3>Secure Booking</h3>
            <p>Your booking is safe with our secure system.</p>
          </div>

          <div className={styles.featureCard}>
            <MdSupportAgent className={styles.featureIcon} />
            <h3>24/7 Support</h3>
            <p>Our team is always ready to help you.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;