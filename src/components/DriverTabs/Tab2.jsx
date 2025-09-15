import { User } from "lucide-react";

const Tab2 = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // For example, you can get the selected location and proceed
    // const selectedLocation = e.target.location.value;
    // console.log("Selected Location:", selectedLocation);
    // Redirect or perform other actions as needed
    window.location.href = "/tab3"; // Example redirection
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="max-w-xl w-full rounded-2xl p-8 shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-6">
          Now, choose how you want to earn with Uber
        </h1>

        {/* Fixed height + scrollable form */}
        <form
          onSubmit={handleSubmit}
          
        >
          {/* Option 1 */}
       <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
           <div>
            <input
              type="radio"
              id="delhi"
              name="location"
              className="hidden peer"
              required
            />
            <label
              htmlFor="delhi"
              className="block border rounded-2xl py-2 px-4 peer-checked:border-4 cursor-pointer transition 
                 peer-checked:border-black peer-checked:bg-gray-100"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left section (blue chip with icon + text) */}
                <div className="flex items-center gap-1 bg-blue-600 text-white rounded-xl px-4 py-1.5">
                  <User size={18} />
                  <button className="font-medium">Trips</button>
                </div>

                {/* Right section (image) */}
                <div className="flex-shrink-0">
                  <img
                    src="./ride.png"
                    alt="Ride"
                    className="size-20 object-contain"
                  />
                </div>
              </div>

              <h1 className="font-bold mb-1">Bike</h1>
              <h1>
                <span>Vehicle</span>: You wish to drive a motorcycle or cooter
              </h1>
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="b"
              name="location"
              className="hidden peer"
            />
            <label
              htmlFor="b"
              className="block border rounded-2xl py-2 px-4 peer-checked:border-4 cursor-pointer transition 
                 peer-checked:border-black peer-checked:bg-gray-100"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left section (blue chip with icon + text) */}
                <div className="flex items-center gap-1 bg-blue-600 text-white rounded-xl px-4 py-1.5">
                  <User size={18} />
                  <button className="font-medium">Trips</button>
                </div>

                {/* Right section (image) */}
                <div className="flex-shrink-0">
                  <img
                    src="./ride.png"
                    alt="Ride"
                    className="size-20 object-contain"
                  />
                </div>
              </div>

              <h1 className="font-bold mb-1">Bike</h1>
              <h1>
                <span>Vehicle</span>: You wish to drive a motorcycle or cooter
              </h1>
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="c"
              name="location"
              className="hidden peer"
            />
            <label
              htmlFor="c"
              className="block border rounded-2xl py-2 px-4 peer-checked:border-4 cursor-pointer transition 
                 peer-checked:border-black peer-checked:bg-gray-100"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left section (blue chip with icon + text) */}
                <div className="flex items-center gap-1 bg-blue-600 text-white rounded-xl px-4 py-1.5">
                  <User size={18} />
                  <button className="font-medium">Trips</button>
                </div>

                {/* Right section (image) */}
                <div className="flex-shrink-0">
                  <img
                    src="./ride.png"
                    alt="Ride"
                    className="size-20 object-contain"
                  />
                </div>
              </div>

              <h1 className="font-bold mb-1">Bike</h1>
              <h1>
                <span>Vehicle</span>: You wish to drive a motorcycle or cooter
              </h1>
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="d"
              name="location"
              className="hidden peer"
            />
            <label
              htmlFor="d"
              className="block border rounded-2xl py-2 px-4 peer-checked:border-4 cursor-pointer transition 
                 peer-checked:border-black peer-checked:bg-gray-100"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left section (blue chip with icon + text) */}
                <div className="flex items-center gap-1 bg-blue-600 text-white rounded-xl px-4 py-1.5">
                  <User size={18} />
                  <button className="font-medium">Trips</button>
                </div>

                {/* Right section (image) */}
                <div className="flex-shrink-0">
                  <img
                    src="./ride.png"
                    alt="Ride"
                    className="size-20 object-contain"
                  />
                </div>
              </div>

              <h1 className="font-bold mb-1">Bike</h1>
              <h1>
                <span>Vehicle</span>: You wish to drive a motorcycle or cooter
              </h1>
            </label>
          </div>
       </div>
           <div className="mt-6">
          <button
            type="submit"
            className="p-4 bg-black text-white rounded-2xl w-full font-semibold hover:bg-gray-800 transition"
          >
            Continue
          </button>
        </div>
        </form>

        {/* Sticky Continue button */}
    
      </div>
    </div>
  );
};

export default Tab2;
