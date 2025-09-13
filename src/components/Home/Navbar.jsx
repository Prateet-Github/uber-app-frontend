import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Wallet,
  Utensils,
  Building,
  Bike,
  HelpCircle,
  Activity,
} from "lucide-react";

import { useAuth } from "../../../context/authContext";

const Navbar = () => {
  const { user, signOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown if click happens outside

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/login">
                <button className="px-4 py-2 bg-white rounded-3xl text-black font-medium">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDown(!isDown)}
                className="bg-black text-white px-4 py-2 rounded-3xl font-medium"
              >
                <div className="flex items-center gap-4 text-black bg-white px-4 py-2 rounded-3xl">
                  <span>{user.username}</span>
                  <span>⬇</span>
                </div>
              </button>
              {isDown && (
                <div className="absolute right-0 mt-2  bg-white text-black rounded-lg shadow-lg  z-10 flex flex-col shadow-gray-600">
                  <div className="border-b border-gray-300 pb-8 flex flex-col gap-6 p-4">
                    <div className="flex justify-between  gap-2">
                      <div className="flex flex-col gap-2">
                        <div className="text-4xl font-semibold">
                          {user.username}
                        </div>
                        <div>5 ⭐️</div>
                      </div>
                      <div>
                        <img
                          src="./pfp.jpeg"
                          className="rounded-full size-12"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-between">
                      <div className="bg-gray-100 p-8 rounded-2xl cursor-pointer hover:bg-gray-200 flex flex-col items-center">
                        <HelpCircle size={20} />
                        <span>Help</span>
                      </div>
                      <div className="bg-gray-100 p-8 rounded-2xl cursor-pointer hover:bg-gray-200 flex flex-col items-center">
                        <Wallet size={20} />
                        <span>Wallet</span>
                      </div>
                      <div className="bg-gray-100 p-8 rounded-2xl cursor-pointer hover:bg-gray-200 flex flex-col items-center">
                        <Activity size={20} />
                        <span>Activity</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="cursor-pointer hover:bg-gray-200 py-4 px-3 flex items-center">
                      <User size={20} className="mr-2" />
                      <span>Manage account</span>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 py-4 px-3 flex items-center">
                      <Bike size={20} className="mr-2" />
                      <span>Ride</span>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 py-4 px-3 flex items-center">
                      <User size={20} className="mr-2" />
                      <span>Drive & Deliver</span>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 py-4 px-3 flex items-center">
                      <Utensils size={20} className="mr-2" />
                      <span>Uber Eats</span>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 py-4 px-3 flex items-center">
                      <Building size={20} className="mr-2" />
                      <span>Uber for Business</span>
                    </div>
                    <div className="border-t border-gray-300 pt-6 justify-center flex py-4">
                      <button
                        onClick={signOut}
                        className="text-red-500 px-30 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer"
                      >
                        Signout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
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
