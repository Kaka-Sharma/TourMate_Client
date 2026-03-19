import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Login.module.css";
import { loginUser } from "../../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(email, password);

      toast.success(res?.message || "Login Successful");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Login Failed");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Login</h2>
        <p>To explore TourMate</p>

        <form onSubmit={handleSubmit} className={styles.loginForm} autoComplete="off">
          <input
            type="email"
            name="random_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            autoComplete="off"
          />
          <input
            type="password"
            name="random_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="new-password"
            required
          />
          <button className={styles.loginSubmitBtn} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
