import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../../context/authContext";
import {
  Menu,
  X,
  User,
  Wallet,
  HelpCircle,
  Activity,
  GraduationCap,
  IndianRupee,
} from "lucide-react";

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
    <nav className="p-4 sticky top-0 z-50 border-b">
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
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/login">
                <button className="px-4 py-2 rounded-3xl bg-black  text-white font-medium">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDown(!isDown)}
                className="bg-white text-black px-4 py-2 rounded-3xl font-medium"
              >
                <div className="flex items-center gap-4 text-white bg-black px-4 py-2 rounded-3xl">
                  <span>{user.username}</span>
                  <span>⬇</span>
                </div>
              </button>
              {isDown && (
                <div className="absolute right-0 mt-2  p-4 bg-white text-black rounded-lg shadow-lg  z-10 flex flex-col shadow-gray-600">
                  <div className="border-gray-300 pb-6 flex flex-col gap-6">
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
                      <div className="bg-gray-100 p-8 rounded-2xl cursor-pointer flex flex-col items-center">
                        <HelpCircle size={20} />
                        <span>Help</span>
                      </div>
                      <div className="bg-gray-100 p-8 rounded-2xl cursor-pointer flex flex-col items-center">
                        <Wallet size={20} />
                        <span>Wallet</span>
                      </div>
                      <div className="bg-gray-100 p-8 rounded-2xl cursor-pointer flex flex-col items-center">
                        <Activity size={20} />
                        <span>Activity</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-2xl py-4 px-3 flex items-center justify-between">
                      <div className="ml-2">Uber Cash</div>

                      <div className="flex items-center">
                        <IndianRupee size={20} />
                        <p className="font-bold">100.00</p>
                      </div>
                    </div>
                    <div className="cursor-pointer  py-4 px-3 flex items-center">
                      <User size={20} className="mr-2" />
                      <span>Manage account</span>
                    </div>
                    <div className="cursor-pointer py-4 px-3 flex items-center">
                      <GraduationCap size={20} className="mr-2" />
                      <span>Promotions</span>
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
