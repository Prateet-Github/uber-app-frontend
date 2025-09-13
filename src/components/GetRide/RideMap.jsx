import { MapPin, Clock, User } from "lucide-react";

const RideMap = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-8 mb-8">
      <div className="flex flex-col gap-5 md:w-1/3 p-6 bg-white rounded-3xl shadow-lg h-full">
        <h1 className="text-3xl md:text-4xl font-semibold">Book a Ride</h1>

        {/* Pickup */}
        <div className="relative w-full">
          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Pickup Location"
          />
        </div>

        {/* Dropoff */}
        <div className="relative w-full">
          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Dropoff Location"
          />
        </div>

        {/* Time */}
        <div className="relative w-full">
          <Clock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Now"
          />
        </div>

        {/* Passengers / For Me */}
        <div className="relative w-full">
          <select className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black">
            <option>For Me</option>
            <option>For Someone Else</option>
          </select>
        </div>

        {/* CTA */}
        <button className="mt-4 w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-900 transition">
          Book Ride
        </button>
      </div>

      {/* Right Map */}
      <div className="w-full md:w-2/3">
        <iframe
          src="https://www.google.com/maps/embed?..."
          className="w-full h-[300px] sm:h-[400px] md:h-[calc(100vh-9rem)] rounded-3xl shadow-lg"
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
