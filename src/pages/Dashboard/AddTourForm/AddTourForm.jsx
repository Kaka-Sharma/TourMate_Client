import React from "react";
import { useState } from "react";
import styles from "./AddTourForm.module.css";
import { api } from "../../../api/api";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
const AddTourForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPopular, setIsPopular] = useState(false);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      // append text fields
      data.append("title", title);
      data.append("description", description);
      data.append("location", location);
      data.append("price", price);
      data.append("duration", duration);
      data.append("maxGroupSize", maxGroupSize);
      data.append("difficulty", difficulty);
      data.append("isPopular", JSON.stringify(isPopular));
      // append images
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      await api.post("/tour", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Tour created successfully");

      // reset form

      setTitle("");
      setDescription("");
      setLocation("");
      setPrice("");
      setDuration("");
      setMaxGroupSize("");
      setDifficulty("easy");
      setImages([]);
      setIsPopular(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create tour");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <h2>Add New Tour</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tour Title"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        ></textarea>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (days)"
          required
        />

        <input
          type="number"
          value={maxGroupSize}
          onChange={(e) => setMaxGroupSize(e.target.value)}
          placeholder="Max Group Size"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose Difficulty
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={isPopular}
            onChange={(e) => setIsPopular(e.target.checked)}
          />
          Mark as Popular Tour <FaStar />
        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        {images.length > 0 && (
          <div className={styles.previewContainer}>
            {Array.from(images).map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                className={styles.preview}
              />
            ))}
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? <span className={styles.btnLoader}></span> : "Create Tour"}
        </button>
      </form>
    </div>
  );
};

export default AddTourForm;
