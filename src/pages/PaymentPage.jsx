import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { latLng } from "leaflet";

const PaymentPage = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [rideDetails, setRideDetails] = useState(null);

  const token = localStorage.getItem("token");

  const getLocationName = async (lat, lng) => {
    try {
      const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=en`
    );
      const data = await res.json();
      return data.display_name || "Unknown Location";
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unknown Location";
    }
  };

  // Fetch ride payment details
  const fetchRideDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5001/api/rides/${rideId}/payment`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        // Artificial delay
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const ride = data.ride;

        // Convert pickup & drop to names
        const pickupName = await getLocationName(
          ride.pickup.lat,
          ride.pickup.lng
        );
        const dropName = await getLocationName(ride.drop.lat, ride.drop.lng);

        setRideDetails({
          ...ride,
          pickupName,
          dropName,
        });
      } else {
        toast.error(data.message || "Failed to fetch ride details");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching ride details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!rideId) return;
    fetchRideDetails();
  }, [rideId]);

  const handlePayment = () => {
    setPaymentProcessing(true);

    // Mock payment delay
    setTimeout(() => {
      setPaymentProcessing(false);
      toast.success("Payment Successful!");
      navigate("/"); // redirect to home or rides page
    }, 2000);
  };

  if (loading) return <Loading />;

  if (!rideDetails)
    return <p className="text-center mt-10">Ride details not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Ride Payment</h2>

        <div className="mb-6 space-y-2 text-gray-700">
          <p>
            <strong>Pickup:</strong> {rideDetails?.pickupName || "Unknown"}
          </p>
          <p>
            <strong>Drop:</strong> {rideDetails?.dropName || "Unknown"}
          </p>

          <p>
            <strong>Fare:</strong> ₹{rideDetails?.fare}
          </p>
          <p>
            <strong>Driver Name:</strong> {(rideDetails?.driver).toUpperCase()}
          </p>
          <p>
            <strong>Rider Name:</strong>{" "}
            {(rideDetails?.passenger).toUpperCase()}
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={paymentProcessing}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
        >
          {paymentProcessing
            ? "Processing Payment..."
            : `Pay ₹${rideDetails.fare}`}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
