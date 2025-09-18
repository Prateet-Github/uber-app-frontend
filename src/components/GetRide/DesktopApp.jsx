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

function DesktopApp() {
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
      <div className="hidden lg:flex h-full flex-col">
        <Navbar></Navbar>

        {/* Desktop Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          <div className="w-96 xl:w-[400px] bg-white flex-shrink-0 flex flex-col border-r border-gray-200">
            {/* Desktop Header */}
            <div className="px-6 py-5 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  Plan your trip
                </h1>
                {(pickup || drop) && (
                  <button
                    onClick={clearAll}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Search Section */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-4">
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

              {/* Desktop Route Information */}
              {(info || isLoadingRoute) && (
                <div className="border-t border-gray-100 p-6">
                  {isLoadingRoute ? (
                    <div className="flex items-center justify-center py-8 text-gray-500">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                      <span className="font-medium">Finding best route...</span>
                    </div>
                  ) : (
                    info && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Route Overview
                        </h3>

                        <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-black">
                                {info.duration}
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                minutes
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="text-3xl font-bold text-black">
                                {info.distance}
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                kilometers
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">
                                ₹ {FareAlgo(info.distance, info.duration)}
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                estimated
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-sm text-gray-600 mb-4">
                              Fastest route • Light traffic
                            </div>
                            <button className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors">
                              Request Ride
                            </button>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500">
                          * Prices and times are estimates and may vary based on
                          traffic and demand
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Map Container */}
          <div className="flex-1 relative">
            <MapContainer
              center={[28.6139, 77.209]}
              zoom={13}
              scrollWheelZoom={true}
              className="w-full h-full z-0"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopApp;
