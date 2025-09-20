import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [rideDetails, setRideDetails] = useState(null);

  const token = localStorage.getItem("token");

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
        setRideDetails(data.ride);
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
            <strong>Pickup:</strong> {rideDetails.pickup?.display || "Unknown"}
          </p>
          <p>
            <strong>Drop:</strong> {rideDetails.drop?.display || "Unknown"}
          </p>
          <p>
            <strong>Driver:</strong> {rideDetails.driver || "N/A"}
          </p>
          <p>
            <strong>Fare:</strong> ₹{rideDetails.fare}
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
