import axios from "axios";

const VITE_NOMINATIM_URL = import.meta.env.VITE_NOMINATIM_URL;

export const geocodeLocation = async (query, token) => {
  try {
    const res = await axios.post(
      `${VITE_NOMINATIM_URL}/geocode`,
      { query }, 
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Geocode error:", err.response?.data || err.message);
    return [];
  }
};

export const reverseGeocode = async (lat, lon, token) => {
  try {
    const res = await axios.post(
      `${VITE_NOMINATIM_URL}/reverse`,
      { lat, lon },
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Reverse geocode error:", err.response?.data || err.message);
    return null;
  }
};