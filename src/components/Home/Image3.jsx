import { Link } from "react-router-dom";

const Image3 = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
      <div className="flex-1 flex justify-center md:justify-start">
        <img
          src="./image3.webp"
          alt=""
          className="w-full max-w-md md:max-w-lg rounded-2xl"
        />
      </div>

      <div className="flex flex-col gap-4 flex-1 text-center md:text-left">
        <h1 className="text-4xl font-semibold">
          Drive when you want, make what you need
        </h1>

        <div className="text-gray-700">
          Make money on your schedule with deliveries or rides—or both. You can
          use your own car or choose a rental through Uber.
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
          <Link to="/signup" className="w-full sm:w-auto">
            <button className="px-6 py-3 bg-black text-white rounded-2xl w-full sm:w-auto">
              Get started
            </button>
          </Link>
          <Link to="/login" className="text-gray-700 hover:underline">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Image3;
