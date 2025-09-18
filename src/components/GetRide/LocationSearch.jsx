import { useState, useEffect } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";

//  Autocomplete search box
export function LocationSearch({
  onSelect,
  allowCurrentLocation,
  icon,
  value,
  placeholder,
}) {
  const [query, setQuery] = useState(value || "");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  const handleSearch = async (value) => {
    setQuery(value);
    if (value.length > 2) {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=5&addressdetails=1`
        );
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            display: "Current Location",
          };
          onSelect(coords);
          setQuery("Current Location");
          setResults([]);
          setIsLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to get your location. Please try again.");
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <div className="relative">
      <div
        className={`flex items-center bg-white border-2 rounded-xl px-4 py-4 transition-all duration-200 ${
          isFocused ? "border-black shadow-lg" : "border-black"
        }`}
      >
        <div
          className="w-3 h-3 rounded-full mr-4 flex-shrink-0"
          style={{ backgroundColor: icon === "🟢" ? "#10b981" : "#ef4444" }}
        ></div>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="flex-1 outline-none text-gray-900 placeholder-gray-500 font-medium"
        />
        {allowCurrentLocation && (
          <button
            onClick={handleCurrentLocation}
            disabled={isLoading}
            className="ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            📍
          </button>
        )}
        {isLoading && (
          <div className="ml-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {results.length > 0 && (
        <div className="absolute z-[9999] w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
          {results.map((place, index) => (
            <div
              key={place.place_id}
              onClick={() => {
                onSelect({
                  lat: parseFloat(place.lat),
                  lng: parseFloat(place.lon),
                  display: place.display_name.split(",")[0],
                });
                setQuery(place.display_name.split(",")[0]);
                setResults([]);
              }}
              className={`px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                index !== results.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  📍
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {place.display_name.split(",")[0]}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {place.display_name.split(",").slice(1, 3).join(", ")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

//  Map marker handling
export function LocationMarkers({ pickup, setPickup, drop, setDrop }) {
  useMapEvents({
    click(e) {
      if (!pickup) {
        setPickup(e.latlng);
      } else if (!drop) {
        setDrop(e.latlng);
      } else {
        setPickup(e.latlng);
        setDrop(null);
      }
    },
  });

  return (
    <>
      {pickup && (
        <Marker position={pickup}>
          <Popup>Pickup Location</Popup>
        </Marker>
      )}
      {drop && (
        <Marker position={drop}>
          <Popup>Destination</Popup>
        </Marker>
      )}
    </>
  );
}

//  Auto-fit to route bounds
export function FitBoundsHandler({ route }) {
  const map = useMap();
  useEffect(() => {
    if (route && route.length > 0) {
      map.fitBounds(route, { padding: [50, 50] });
    }
  }, [route, map]);
  return null;
}

//  Fare calculation algorithm
export const FareAlgo = (distance, duration) => {
  // Base fare
  let fare = 10.0;

  // Distance fare (10 per km)
  fare += distance * 30;

  // Time fare (10 per minute)
  fare += duration * 0.2;

  // Surge pricing (e.g., 1.5x during peak hours)
  const currentHour = new Date().getHours();
  if (currentHour >= 7 && currentHour <= 9) {
    fare *= 1.5; // Morning rush hour
  } else if (currentHour >= 17 && currentHour <= 19) {
    fare *= 1.5; // Evening rush hour
  }

  return fare.toFixed(2);
};
