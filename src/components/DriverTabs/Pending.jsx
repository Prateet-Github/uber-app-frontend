import { Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Pending = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Clock size={60} className="text-yellow-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">
          Request Pending
        </h1>
        <p className="text-gray-600 mb-6">
          Your request to become a driver is currently under review.  
          We'll notify you once it has been approved.
        </p>

        {/* Status Indicator */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-yellow-600 font-medium">
            <Clock size={20} /> Pending Review
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <CheckCircle size={20} /> Verification in Progress
          </div>
        </div>

        {/* Back to Home */}
        <Link to="/">
          <button className="w-full bg-black text-white py-3 rounded-3xl font-medium hover:bg-gray-800 transition-colors">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Pending;