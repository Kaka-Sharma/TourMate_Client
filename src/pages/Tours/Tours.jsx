import React, { useEffect, useState } from "react";
import styles from "./Tours.module.css";
import { getTours } from "../../api/api";
import TourCard from "../../components/TourCard/TourCard";

const Tours = () => {
  const [tours, setTours] = useState([
    {
      _id: "1",
      title: "Sample Tour",
      location: "Sample Location",
      description: "This is a sample tour description for testing purposes.",
      duration: 5,
      price: 3000,
      ratingAverage: 4,
    },
    {
      _id: "1",
      title: "Sample Tour",
      location: "Sample Location",
      description: "This is a sample tour description for testing purposes.",
      duration: 5,
      price: 3000,
      ratingAverage: 4,
    },
    {
      _id: "1",
      title: "Sample Tour",
      location: "Sample Location",
      description: "This is a sample tour description for testing purposes.",
      duration: 5,
      price: 3000,
      ratingAverage: 4,
    },
    {
      _id: "1",
      title: "Sample Tour",
      location: "Sample Location",
      description: "This is a sample tour description for testing purposes.",
      duration: 5,
      price: 3000,
      ratingAverage: 4,
    },
    {
      _id: "1",
      title: "Sample Tour",
      location: "Sample Location",
      description: "This is a sample tour description for testing purposes.",
      duration: 5,
      price: 3000,
      ratingAverage: 4,
    },
  ]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await getTours();
         if (Array.isArray(res) && res.length > 0) {
        setTours(res);
      }
        setLoading(false);
      } catch (error) {
        console.error(error || "Error fetching tours:");
        setLoading(false);
      }
    };
    fetchTours();
  }, []);
  if(loading) return <p>Loading...</p>
  return (
    <div className={styles.container}>
      {tours.length > 0 ? (
        tours.map((tour) => <TourCard key={tour._id} tour={tour} />)
      ) : (
        <p>No tours available</p>
      )}
    </div>
  );
};

export default Tours;
