import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Tours from "./pages/Tours/Tours";
import TourDetails from "./pages/TourDetails/TourDetails";

import DashboardLayout from "./pages/Dashboard/DashboardLayout/DashboardLayout";
import ManageTours from "./pages/Dashboard/ManageTours/ManageTours";
import ManageBookings from "./pages/Dashboard/ManageBookings/ManageBookings";
import ManageUsers from "./pages/Dashboard/ManageUsers/ManageUsers";
import DashboardHome from "./pages/Dashboard/DashboardHome/DashboardHome";
import AddTourForm from "./pages/Dashboard/AddTourForm/AddTourForm";

import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or spinner

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/" />;
  return children;
};

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tour/:id" element={<TourDetails />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="add-tour" element={<AddTourForm />} />
          <Route path="edit-tour/:id" element={<AddTourForm />} />
          <Route path="tours" element={<ManageTours />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
