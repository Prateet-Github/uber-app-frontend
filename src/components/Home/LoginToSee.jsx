import { Link } from "react-router-dom";

const LoginToSee = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
      {/* Left Section */}
      <div className="flex flex-col gap-4 flex-1 text-center md:text-left">
        <h1 className="text-4xl font-semibold">
          Login to see your account details
        </h1>

        <div className="text-gray-700">
          View past trips, tailored suggestions, support resources, and more.
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link to="/login">
            <button className="px-6 py-3 bg-black text-white rounded-2xl w-full sm:w-auto">
              Login
            </button>
          </Link>
          <Link to="/signup" className="text-gray-700 hover:underline">
            Create an account
          </Link>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="flex-1 flex justify-center md:justify-end">
        <img
          src="./loginToSee.svg"
          alt="Login Preview"
          className="w-full max-w-md md:max-w-lg rounded-2xl"
        />
      </div>
    </div>
  );
};

export default LoginToSee;
