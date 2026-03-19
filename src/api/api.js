import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api", // base url
  withCredentials: true, // include cookie
});

// Login
const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Login Failed" };
  }
};

// Register
const registerUser = async (name, email, password) => {
  try {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration Failed" };
  }
};

// get user profile
const getProfile = async () => {
  try {
    const res = await api.get("/users/profile");
    return res.data.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
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
    throw error.response?.data || { message: "Upload failed" };
  }
};

// remove profile picture
const removeAvatar = async () => {
  try {
    const res = await api.delete("/users/profile/avatar");
    return res.data.data;
  } catch (error) {
    throw error.response?.data;
  }
};

// get tours
const getTours = async () => {
  try {
    const res = await api.get("/tour");
    return res.data.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export {
  api,
  loginUser,
  registerUser,
  getProfile,
  updateAvatar,
  removeAvatar,
  getTours,
};
