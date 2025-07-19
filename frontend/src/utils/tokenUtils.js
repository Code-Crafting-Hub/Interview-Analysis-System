// utils/tokenUtils.js

import axios from "axios";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("rtoken");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (!refreshToken) return null;

  try {
    const response = await axios.post(`${backendUrl}token/refresh/`, {
      refresh: refreshToken,
    });
    
    const newAccessToken = response.data.access;
    localStorage.setItem("atoken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Refresh token failed", error);
    return null;
  }
};
