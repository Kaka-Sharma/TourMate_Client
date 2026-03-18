import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      setMessage(res.data?.message || "Login Successful");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Login Failed");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Login</h2>
        <p>To explore TourMate</p>

        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.success}>{message}</p>}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button className={styles.loginSubmitBtn} type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
