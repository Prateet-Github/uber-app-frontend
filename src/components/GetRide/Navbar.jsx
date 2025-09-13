import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left Menu (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <div className="text-3xl font-bold">Uber</div>
          <div className="flex gap-6">
            <Link to="/getride" className="hover:underline">
              Ride
            </Link>
            <Link to="/rent" className="hover:underline">
              Rent
            </Link>
            <Link to="/eat" className="hover:underline">
              Eat
            </Link>
          </div>
        </div>

        {/* Right Menu (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 bg-black rounded-3xl text-white font-medium">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile: Only Uber Logo and Login Button */}
        <div className="md:hidden w-full flex justify-between">
          <div className="text-3xl font-bold">Uber</div>
          <Link to="/login">
            <button className="px-4 py-2 bg-black rounded-3xl text-white font-medium">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
