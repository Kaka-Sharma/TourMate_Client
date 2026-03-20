import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Tours from "./pages/Tours/Tours";
import Footer from "./components/Footer/Footer";
import DashboardHome from "./pages/Dashboard/DashboardHome/DashboardHome";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/admin/dashboard" element={<DashboardHome/>}/>
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
