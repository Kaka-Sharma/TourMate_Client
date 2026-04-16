import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTour } from "../../api/api";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./TourDetails.module.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaRupeeSign } from "react-icons/fa";

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await getTour(id);
        setTour(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch tour");
        navigate("/"); 
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id, navigate]);

  if (loading || authLoading) return <Spinner />; 
  if (!tour) return <p>Tour not found</p>;

  const handleBooking = () => {
    if (!user) {
      toast.info("Please login to book a tour");
      navigate("/login");
      return;
    }
    navigate(`/booking/${tour._id}`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {tour.title} {tour.isPopular && <span className={styles.popular}>🔥 Popular</span>}
      </h1>

      {tour.images && tour.images.length > 0 && (
        <Slider {...sliderSettings} className={styles.slider}>
          {tour.images.map((img) => (
            <img key={img.public_id} src={img.url} alt={tour.title} className={styles.image} />
          ))}
        </Slider>
      )}

      <div className={styles.info}>
        <p><strong>Description:</strong> {tour.description}</p>
        <p><strong>Location:</strong> {tour.location}</p>
        <p><strong>Price:</strong> <FaRupeeSign className={styles.rupee}/>{tour.price}</p>
        <p><strong>Duration:</strong> {tour.duration} days</p>
        <p><strong>Max Group Size:</strong> {tour.maxGroupSize}</p>
        <p><strong>Difficulty:</strong> {tour.difficulty}</p>
        <p><strong>Rating:</strong> {tour.ratingAverage} ({tour.ratingsQuantity} reviews)</p>
        <p><strong>Created by:</strong> {tour.createdBy?.name}</p>
      </div>

      <button className={styles.bookBtn} onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default TourDetails;