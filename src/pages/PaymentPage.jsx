import { useState } from "react";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      if (formattedValue.length > 19)
        formattedValue = formattedValue.slice(0, 19);
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(.{2})/, "$1/");
      if (formattedValue.length > 5)
        formattedValue = formattedValue.slice(0, 5);
    }

    // Limit CVV to 3 digits
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing delay
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      // Show success toast if you have react-hot-toast
      // toast.success("Payment Successful!");

      // Reset form after a delay
      setTimeout(() => {
        setPaymentSuccess(false);
        setFormData({
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          cardholderName: "",
        });
      }, 3000);
    }, 3000);
  };

  if (paymentSuccess) {
    toast.success("Payment Succesfull");
    navigate("/");
    // return (
    //   <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
    //     <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
    //       <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
    //         <svg
    //           className="w-8 h-8 text-green-600"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M5 13l4 4L19 7"
    //           ></path>
    //         </svg>
    //       </div>
    //       <h2 className="text-2xl font-bold text-gray-800 mb-2">
    //         Payment Successful!
    //       </h2>
    //       <p className="text-gray-600">
    //         Your transaction has been processed successfully.
    //       </p>
    //     </div>
    //   </div>
    // );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {loading && <Loading />}

      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Secure Payment
          </h1>
          <p className="text-gray-600">Complete your transaction safely</p>
        </div>

        <form
          onSubmit={handlePayment}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          {/* Cardholder Name */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Card Number */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          {/* Expiry and CVV Row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono"
                placeholder="123"
                required
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              <span className="text-sm text-blue-800">
                Your payment information is encrypted and secure
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

          {/* Payment Methods */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 mb-3">We accept</p>
            <div className="flex justify-center space-x-3">
              <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                VISA
              </div>
              <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                MC
              </div>
              <div className="w-10 h-6 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">
                AMEX
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
