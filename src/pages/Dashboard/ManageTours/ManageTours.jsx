import React, { useEffect, useState } from "react";
import { deleteTour, getTours, toggleTour } from "../../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./ManageTours.module.css";
import {
  FaRegArrowAltCircleRight,
  FaEdit,
  FaRegArrowAltCircleLeft,
  FaStar,
  FaTrash,
} from "react-icons/fa";

const ManageTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("grid");
  const [currentIndex, setCurrentIndex] = useState({});

  const navigate = useNavigate();

  // Fetch all tours
  const fetchTours = async () => {
    try {
      const data = await getTours(); // use getTours, not getTour
      setTours(data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Navigate to edit tour
  const handleEditTour = (id) => {
    navigate(`/admin/edit-tour/${id}`);
  };

  // Delete tour
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;

    try {
      await deleteTour(id);
      toast.success("Tour deleted successfully");
      setTours((prev) => prev.filter((tour) => tour._id !== id));
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };

  // Toggle popularity
  const handleToggle = async (id) => {
    try {
      const updatedTour = await toggleTour(id);
      setTours((prev) =>
        prev.map((tour) =>
          tour._id === id
            ? { ...tour, isPopular: updatedTour.isPopular }
            : tour,
        ),
      );
    } catch (error) {
      toast.error(error.message || "Failed to update popularity");
    }
  };

  // handler to multiple images
  const handleNext = (id, length) => {
    setCurrentIndex((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % length,
    }));
  };

  const handlePrev = (id, length) => {
    setCurrentIndex((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + length) % length,
    }));
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading Tours...</p>
      </div>
    );
  }

  const handleGrid = () => {
    setView("grid");
  };
  const handleList = () => {
    setView("list");
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Tours</h2>
      <div className={styles.topBar}>
        <button
          className={`${view === "grid"} ${styles.gridBtn}`}
          onClick={handleGrid}
        >
          Card
        </button>
        <button
          className={`${styles.listBtn} ${view === "list"}`}
          onClick={handleList}
        >
          List
        </button>
      </div>
      {tours.length === 0 ? (
        <p>No tours available.</p>
      ) : (
        <div className={view === "grid" ? styles.grid : styles.list}>
          {tours.map((tour) => (
            <div
              key={tour._id}
              className={view === "grid" ? styles.card : styles.listCard}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={tour.images?.[currentIndex[tour._id] || 0]?.url}
                  alt={tour.title}
                  className={styles.image}
                />

                {tour.images?.length > 1 && (
                  <>
                    <button
                      className={styles.prevBtn}
                      onClick={() => handlePrev(tour._id, tour.images.length)}
                    >
                      <FaRegArrowAltCircleLeft className={styles.arrow} />
                    </button>
                    <button
                      className={styles.nextBtn}
                      onClick={() => handleNext(tour._id, tour.images.length)}
                    >
                      <FaRegArrowAltCircleRight className={styles.arrow} />
                    </button>
                  </>
                )}
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{tour.title}</h3>
                <p className={styles.location}>{tour.location}</p>
                <p className={styles.price}>&#8377;{tour.price}</p>
                <div className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEditTour(tour._id)}
                  >
                    {view === "grid" ? <FaEdit /> : "Edit"}
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(tour._id)}
                  >
                    {view === "grid" ? <FaTrash /> : "Delete"}
                  </button>
                  <button
                    className={`${tour.isPopular ? styles.unmarkBtn : styles.markBtn} ${
                      tour.isPopular ? styles.active : ""
                    }`}
                    onClick={() => handleToggle(tour._id)}
                  >
                    {view === "grid" && tour.isPopular ? (
                      <>
                        Remove from Popular
                        <FaStar className={styles.starIcon} />
                      </>
                    ) : tour.isPopular ? (
                      <>
                        Remove from Popular <FaStar />
                      </>
                    ) : (
                      <>
                        Mark as Popular <FaStar />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageTours;
