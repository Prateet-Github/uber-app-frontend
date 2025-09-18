import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const MainContent = () => {
  const [city, setCity] = useState("");
  const [buttonText, setButtonText] = useState("Fetching location...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();

            const locationName =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "Unknown Location";

            setCity(locationName); // ✅ update state
            setButtonText("Current Location :");
          } catch (err) {
            console.error("Reverse geocoding error:", err);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to get your location. Please try again.");
        }
      );
    }
  });

  return (
    <div className="max-w-6xl my-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      {/* Left Section */}
      <div className="flex flex-col items-start gap-6 w-full">
        <div className="flex">
          <button className="py-2 px-1 rounded-lg hover:underline cursor-pointer">
            {buttonText}
          </button>

          <span>
            {city && (
              <p className="text-gray-700 px-1 py-2 rounded-lg">
                <span className="font-semibold">{city}</span>
              </p>
            )}
          </span>
        </div>

        <h1 className="text-4xl font-semibold">Go anywhere with Uber</h1>

        <input
          type="text"
          placeholder="Pickup Location"
          className="w-full p-4 bg-gray-100 rounded-2xl"
        />
        <input
          type="text"
          placeholder="Dropoff Location"
          className="w-full p-4 bg-gray-100 rounded-2xl"
        />

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <input
            type="date"
            className="flex-1 bg-gray-100 p-4 rounded-2xl cursor-pointer"
          />
          <input
            type="time"
            className="flex-1 bg-gray-100 p-4 rounded-2xl cursor-pointer"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
          <button className="px-6 py-3 bg-black text-white rounded-2xl w-full sm:w-auto">
            See prices
          </button>
          <Link
            to="/login"
            className="cursor-pointer hover:underline text-gray-700"
          >
            Login to see your activity
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full flex justify-center md:justify-end">
        <img
          src="./home.webp"
          alt="home"
          className="w-full max-w-md md:max-w-full rounded-2xl"
        />
      </div>
    </div>
  );
};

export default MainContent;
