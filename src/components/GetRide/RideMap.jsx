import { MapPin, Clock, User } from "lucide-react";

const RideMap = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Left Form */}
      <div className="flex flex-col gap-4 border-gray-200 border-2 md:w-1/3 items-center rounded-2xl p-6 bg-white shadow-md">
        <h1 className="text-2xl md:text-4xl font-semibold mb-2">Get a ride</h1>

        <div className="relative w-full">
          {/* Icon */}
          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
            size={20}
          />

          {/* Input */}
          <input
            type="text"
            className="pl-12 pr-4 py-3 w-full border border-gray-200 bg-gray-100 rounded-3xl focus:outline-none text-center"
            placeholder="Pickup Location"
          />
        </div>

        <div className="relative w-full">
          {/* Icon */}
          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
            size={20}
          />

          {/* Input */}
          <input
            type="text"
            className="pl-12 pr-4 py-3 w-full border border-gray-200 bg-gray-100 rounded-3xl focus:outline-none text-center"
            placeholder="Dropoff Location"
          />
        </div>
        <div className="relative w-full">
          {/* Icon */}
          <Clock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
            size={20}
          />

          {/* Input */}
          <input
            type="text"
            className="pl-12 pr-4 py-3 w-full border border-gray-200 bg-gray-100 rounded-3xl focus:outline-none text-center"
            placeholder="Pickup now"
          />
        </div>
        <div className="relative w-full">
          {/* Icon */}
          <User
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
            size={20}
          />

          {/* Input */}
          <input
            type="text"
            className="pl-12 pr-4 py-3 w-full border border-gray-200 bg-gray-100 rounded-3xl focus:outline-none text-center"
            placeholder="For me"
          />
        </div>

        <select className="p-4 w-full border border-gray-200 bg-gray-100 rounded-3xl">
          <option>For Me</option>
          <option>For Someone Else</option>
        </select>

        <input
          type="text"
          className="p-4 w-full border border-gray-200 bg-gray-100 rounded-3xl text-center"
          placeholder="Search"
        />

        {/* CTA Button */}
        <button className="mt-4 px-6 py-3 bg-black text-white rounded-3xl w-full font-medium hover:bg-gray-900 transition">
          Book Ride
        </button>
      </div>

      {/* Right Map */}
      <div className="w-full md:w-2/3">
        <iframe
          src="https://www.google.com/maps/embed?..."
          className="w-full h-[400px] md:h-[750px] rounded-2xl"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default RideMap;
