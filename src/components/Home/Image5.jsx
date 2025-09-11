import { Link } from "react-router-dom";

const Image5 = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
      <div className="flex-1 flex justify-center md:justify-start">
        <img
          src="./image5.webp"
          alt="image5"
          className="w-full max-w-md md:max-w-lg rounded-2xl"
        />
      </div>

      <div className="flex flex-col gap-4 flex-1 text-center md:text-left">
        <h1 className="text-4xl font-semibold">
          Make money by renting out your car
        </h1>

        <div className="text-gray-700">
          Connect with thousands of drivers and earn more per week with Uber’s
          free fleet management tools.
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
          <Link to="/rental" className="w-full sm:w-auto">
            <button className="px-6 py-3 bg-black text-white rounded-2xl w-full sm:w-auto">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Image5;
