const Tab1 = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/tab2";
  };

  return (
    <div className="flex  items-center justify-center min-h-screen p-10">
      <div className="text-center max-w-xl  rounded-2xl p-10 shadow-md">
        <h1 className="text-4xl font-bold mb-10">
          First, confirm the location you want to earn in
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 flex flex-col gap-10"
        >
          {/* Option 1 */}
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
              className="block border rounded-2xl p-4 cursor-pointer 
                 peer-checked:border-blue-500 peer-checked:bg-blue-50"
            >
              <h1 className="font-bold mb-1">Keep my current location</h1>
              <p className="text-gray-600 text-sm">Primary earning location</p>
              <p className="text-base">Delhi NCR</p>
              <p className="text-gray-500 text-sm">Can earn in: All of Delhi</p>
            </label>
          </div>

          {/* Option 2 */}
          <div>
            <input
              type="radio"
              id="mumbai"
              name="location"
              className="hidden peer"
            />
            <label
              htmlFor="mumbai"
              className="block border rounded-2xl p-4 cursor-pointer 
                 peer-checked:border-blue-500 peer-checked:bg-blue-50"
            >
              <h1 className="font-bold mb-1">Switch to Mumbai</h1>
              <p className="text-gray-600 text-sm">Primary earning location</p>
              <p className="text-base">Mumbai</p>
              <p className="text-gray-500 text-sm">
                Can earn in: All of Mumbai
              </p>
            </label>
          </div>

          <div className="pt-20">
            <button
              type="submit"
              className="p-4 bg-black text-white rounded-2xl w-full font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tab1;
