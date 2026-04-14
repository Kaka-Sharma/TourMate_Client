import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // base url
  withCredentials: true, // include cookie
});

const handleError = (error, defaultMessage) => {
  return error.response?.data || { message: defaultMessage };
};

// Login
const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    throw handleError(error, "Login Failed");
  }
};

// Logout
const logoutUser = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error) {
    throw handleError(error, "Logout Failed");
  }
};

// Register
const registerUser = async (name, email, password) => {
  try {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
  } catch (error) {
    throw handleError(error, "Registration Failed");
  }
};

// get user profile
const getProfile = async () => {
  try {
    const res = await api.get("/users/profile");
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to fetch profile");
  }
};

// update profile picture
const updateAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await api.put("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data;
  } catch (error) {
    throw handleError(error, "Upload failed");
  }
};

// remove profile picture
const removeAvatar = async () => {
  try {
    const res = await api.delete("/users/profile/avatar");
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Remove failed");
  }
};

// get tours
const getTours = async (params = {}) => {
  try {
    const res = await api.get("/tour", { params });
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to fetch tours");
  }
};

// get single tour
const getTour = async (id) => {
  try {
    const res = await api.get(`/tour/${id}`);
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to fetch tour");
  }
};

// get popular tours
const getPopularTours = async () => {
  try {
    const res = await api.get("/tour/popular");
    return res.data.data || [];
  } catch (error) {
    throw handleError(error, "Failed to fetch popular tours");
  }
};

// create tour
const createTour = async (formData) => {
  try {
    const res = await api.post("/tour", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to create tour");
  }
};

// toggle tour
const toggleTour = async (id) => {
  try {
    const res = await api.put(`/tour/toggle-popular/${id}`);
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to toggle tour");
  }
};

// update tour
const updateTour = async (id, formData) => {
  try {
    const res = await api.put(`/tour/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to update tour");
  }
};

// delete tour
const deleteTour = async (id) => {
  try {
    const res = await api.delete(`/tour/${id}`);
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to delete tour");
  }
};

// create booking
const createBooking = async (tourId, bookingData) => {
  try {
    const res = await api.post("/booking", {
      tour: tourId,
      ...bookingData,
    });
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to create booking");
  }
};

// get all bookings (admin)
const getBookings = async () => {
  try {
    const res = await api.get("/booking");
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to fetch bookings");
  }
};

// get single booking
const getBooking = async (id) => {
  try {
    const res = await api.get(`/booking/${id}`);
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to fetch booking");
  }
};

// get my booking (logged-in user)
const getMyBookings = async () => {
  try {
    const res = await api.get("/booking/my");
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to fetch my bookings");
  }
};

// update booking
const updateBooking = async (id, data) => {
  try {
    const res = await api.put(`/booking/${id}`, data);
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to update booking");
  }
};

// delete booking
const deleteBooking = async (id) => {
  try {
    const res = await api.delete(`/booking/${id}`);
    return res.data.data;
  } catch (error) {
    throw handleError(error, "Failed to delete booking");
  }
};

export {
  api,
  loginUser,
  logoutUser,
  registerUser,
  getProfile,
  updateAvatar,
  removeAvatar,
  createTour,
  getTour,
  getTours,
  updateTour,
  getPopularTours,
  toggleTour,
  deleteTour,
  createBooking,
  getBookings,
  getBooking,
  getMyBookings,
  updateBooking,
  deleteBooking,
};
