import React, { useState } from "react";
import styles from "./Register.module.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await registerUser(name, email, password, confirmPassword)
      toast.success(res?.message || "Account created successfully");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Create Account</h2>
        <p>Join TourMate and explore the world!</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Submit</button>
        </form>
        <p className={styles.loginText}>
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
