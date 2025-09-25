import axios from "axios";

const VITE_NOMINATIM_URL= import.meta.env.VITE_NOMINATIM_URL;

// Cache to store previous geocoding results

const geocodeCache = new Map();
const reverseCache = new Map();

export const geocodeLocation = async(query,token) =>{
  if (!query) return [];

  if (geocodeCache.has(query)) {
    console.log("⚡ From cache:", query);
    return geocodeCache.get(query);
  }

  try {
    const res = await axios.post(`${VITE_NOMINATIM_URL}/geocode`,
       {query },
       {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        }},
      );

      geocodeCache.set(query, res.data);
      return res.data;
  } catch (error) {
    console.error("Error fetching geocode data:", error);
    return [];
  }
}

export const reverseGeocode = async (lat, lon, token) => {
  const key = `${lat},${lon}`;
  if (reverseCache.has(key)) {
    console.log("⚡ From cache:", key);
    return reverseCache.get(key);
  }

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
    reverseCache.set(key, res.data);
    return res.data;
  } catch (err) {
    console.error("Reverse geocode error:", err.response?.data || err.message);
    return null;
  }
};