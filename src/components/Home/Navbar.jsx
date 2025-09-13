import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo + Left Menu */}
        <div className="flex items-center gap-8">
          <div className="text-3xl font-bold">Uber</div>
          <div className="hidden md:flex gap-6">
            <Link to="/getride" className="hover:underline">
              Ride
            </Link>
            <Link to="/earn" className="hover:underline">
              Earn
            </Link>
            <Link to="/business" className="hover:underline">
              Business
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </div>
        </div>

        {/* Right Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/language" className="hover:underline">
            EN
          </Link>
          <Link to="/help" className="hover:underline">
            Help
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 bg-white rounded-3xl text-black font-medium">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-black p-4 rounded-lg">
          <Link to="/ride" className="hover:underline">
            Ride
          </Link>
          <Link to="/earn" className="hover:underline">
            Earn
          </Link>
          <Link to="/business" className="hover:underline">
            Business
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <hr className="border-gray-700" />
          <Link to="/language" className="hover:underline">
            EN
          </Link>
          <Link to="/help" className="hover:underline">
            Help
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/signup" className="hover:underline">
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
