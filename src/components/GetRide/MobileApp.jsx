import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {
  LocationMarkers,
  LocationSearch,
  FitBoundsHandler,
  FareAlgo,
} from "./LocationSearch";
import Navbar from "./Navbar";

function MobileApp() {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [route, setRoute] = useState([]);
  const [info, setInfo] = useState(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  useEffect(() => {
    if (pickup && drop) {
      const fetchRoute = async () => {
        setIsLoadingRoute(true);
        try {
          const url = `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}?geometries=geojson&overview=full`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.routes && data.routes.length > 0) {
            const routeData = data.routes[0];
            const coords = routeData.geometry.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ]);
            setRoute(coords);

            setInfo({
              distance: (routeData.distance / 1000).toFixed(1),
              duration: Math.round(routeData.duration / 60),
            });
          }
        } catch (err) {
          console.error("Error fetching route:", err);
        } finally {
          setIsLoadingRoute(false);
        }
      };
      fetchRoute();
    } else {
      setRoute([]);
      setInfo(null);
    }
  }, [pickup, drop]);

  const clearAll = () => {
    setPickup(null);
    setDrop(null);
    setRoute([]);
    setInfo(null);
  };

  return (
    <div className="h-screen w-full bg-white overflow-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden h-full flex flex-col">
        <Navbar></Navbar>
        {/* Mobile Header with Search */}
        <div className="bg-white shadow-sm z-[1000] relative">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-900">
                Plan your trip
              </h1>
              {(pickup || drop) && (
                <button
                  onClick={clearAll}
                  className="text-sm font-medium text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-3">
              <LocationSearch
                label="Pickup"
                placeholder="Enter pickup location"
                onSelect={setPickup}
                allowCurrentLocation={true}
                icon="🟢"
                value={pickup?.display || ""}
              />

              <LocationSearch
                label="Destination"
                placeholder="Where to?"
                onSelect={setDrop}
                icon="🔴"
                value={drop?.display || ""}
              />
            </div>
          </div>
        </div>

        {/* Mobile Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={[28.6139, 77.209]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationMarkers
              pickup={pickup}
              setPickup={setPickup}
              drop={drop}
              setDrop={setDrop}
            />
            {route.length > 0 && (
              <>
                <Polyline
                  positions={route}
                  color="#000000"
                  weight={6}
                  opacity={0.8}
                />
                <FitBoundsHandler route={route} />
              </>
            )}
          </MapContainer>

          {/* Mobile Instructions Overlay */}
        </div>

        {/* Mobile Bottom Route Info */}
        {(info || isLoadingRoute) && (
          <div className="bg-white border-t border-gray-200 p-4 shadow-2xl">
            {isLoadingRoute ? (
              <div className="flex items-center justify-center py-4 text-gray-500">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                <span className="font-medium">Finding route...</span>
              </div>
            ) : (
              info && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-black">
                        {info.duration} min • {info.distance} km
                      </div>
                      <div className="text-sm text-gray-600">
                        Fastest route • Light traffic
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">
                        ₹ {FareAlgo(info.distance, info.duration)}
                      </div>
                      <div className="text-xs text-gray-500">estimate</div>
                    </div>
                  </div>
                  <button className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold text-lg">
                    Request Ride
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileApp;
