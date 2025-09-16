import { Calendar, Clock, Briefcase } from "lucide-react";

const Plan = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 md:p-8">
        <h1 className="text-4xl font-semibold mb-8">Plan for later</h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left card with illustration */}
          <div className="flex-1 bg-gradient-to-br from-teal-300 to-teal-400 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-8 leading-tight">
                Get your ride right
                <br />
                with Uber Reserve
              </h3>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-black mb-4">
                  Choose date and time
                </h4>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <label className="block text-sm text-black mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value="Sep 11"
                        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
                        readOnly
                      />
                      <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-600" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm text-black mb-2">
                      Time
                    </label>
                    <div className="relative">
                      <select className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-black font-medium focus:outline-none focus:ring-2 focus:ring-black appearance-none">
                        <option>6:35 PM</option>
                      </select>
                      <Clock className="absolute right-3 top-3 w-5 h-5 text-gray-600 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <button className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors">
                  Next
                </button>
              </div>
            </div>

            {/* Phone and watch illustration */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8 lg:translate-x-4">
              <div className="relative">
                {/* Phone mockup */}
                <div className="w-48 h-80 bg-white rounded-3xl shadow-2xl border-8 border-gray-800 relative overflow-hidden">
                  <div className="absolute inset-4 bg-gray-100 rounded-2xl">
                    <div className="p-4 space-y-3">
                      <div className="w-full h-3 bg-gray-300 rounded"></div>
                      <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
                      <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
                      <div className="mt-6 space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                          <div className="w-16 h-2 bg-gray-300 rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                          <div className="w-20 h-2 bg-gray-300 rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                          <div className="w-12 h-2 bg-gray-300 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Watch mockup */}
                <div className="absolute -bottom-8 -left-12 w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center shadow-xl">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                    <div className="relative">
                      <div className="w-12 h-12 border-2 border-white rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-white transform -translate-x-1/2 -translate-y-full origin-bottom rotate-45"></div>
                      <div className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-orange-400 transform -translate-x-1/2 -translate-y-full origin-bottom -rotate-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right benefits section */}
          <div className="flex-1 lg:max-w-md">
            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-8">
              Benefits
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-black rounded-sm flex items-center justify-center mt-1">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg text-gray-800">
                  Choose your exact pickup time up to 90 days in advance.
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-black rounded-sm flex items-center justify-center mt-1">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg text-gray-800">
                  Extra wait time included to meet your ride.
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-black rounded-sm flex items-center justify-center mt-1">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg text-gray-800">
                  Cancel at no charge up to 60 minutes in advance.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a href="#" className="text-black underline hover:text-gray-600">
                See terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
