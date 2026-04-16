import React, { useEffect, useState } from "react";
import { deleteTour, getTours, toggleTour } from "../../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./ManageTours.module.css";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal"; // adjust path if needed

import {
  FaRegArrowAltCircleRight,
  FaEdit,
  FaRegArrowAltCircleLeft,
  FaStar,
  FaTrash,
  FaRupeeSign,
} from "react-icons/fa";

const ManageTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("grid");
  const [currentIndex, setCurrentIndex] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState(null);

  const navigate = useNavigate();

  const fetchTours = async () => {
    try {
      const data = await getTours();
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

  const handleEditTour = (id) => {
    navigate(`/admin/edit-tour/${id}`);
  };

  const openDeleteModal = (id) => {
    setSelectedTourId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTour(selectedTourId);
      toast.success("Tour deleted successfully");

      setTours((prev) =>
        prev.filter((tour) => tour._id !== selectedTourId)
      );

      setShowModal(false);
      setSelectedTourId(null);
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedTourId(null);
  };

  const handleToggle = async (id) => {
    try {
      const updatedTour = await toggleTour(id);
      setTours((prev) =>
        prev.map((tour) =>
          tour._id === id
            ? { ...tour, isPopular: updatedTour.isPopular }
            : tour
        )
      );
    } catch (error) {
      toast.error(error.message || "Failed to update popularity");
    }
  };

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

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Tours</h2>

      <div className={styles.topBar}>
        <button
          className={`${view === "grid" ? styles.active : ""} ${styles.gridBtn}`}
          onClick={() => setView("grid")}
        >
          Card
        </button>

        <button
          className={`${view === "list" ? styles.active : ""} ${styles.listBtn}`}
          onClick={() => setView("list")}
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
                      onClick={() =>
                        handlePrev(tour._id, tour.images.length)
                      }
                    >
                      <FaRegArrowAltCircleLeft />
                    </button>

                    <button
                      className={styles.nextBtn}
                      onClick={() =>
                        handleNext(tour._id, tour.images.length)
                      }
                    >
                      <FaRegArrowAltCircleRight />
                    </button>
                  </>
                )}
              </div>

              <div className={styles.content}>
                <h3 className={styles.title}>{tour.title}</h3>
                <p className={styles.location}>{tour.location}</p>
                <p className={styles.price}><FaRupeeSign className={styles.rupee}/>{tour.price}</p>

                <div className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEditTour(tour._id)}
                  >
                    {view === "grid" ? <FaEdit /> : "Edit"}
                  </button>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => openDeleteModal(tour._id)}
                  >
                    {view === "grid" ? <FaTrash /> : "Delete"}
                  </button>

                  <button
                    className={`${
                      tour.isPopular ? styles.unmarkBtn : styles.markBtn
                    } ${tour.isPopular ? styles.active : ""}`}
                    onClick={() => handleToggle(tour._id)}
                  >
                    {tour.isPopular ? (
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

      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this tour?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ManageTours;