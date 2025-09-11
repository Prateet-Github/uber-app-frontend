import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/newsroom"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Newsroom
                </Link>
              </li>
              <li>
                <Link
                  to="/investors"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Investors
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/ride"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Ride
                </Link>
              </li>
              <li>
                <Link
                  to="/drive"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Drive
                </Link>
              </li>
              <li>
                <Link
                  to="/deliver"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Deliver
                </Link>
              </li>
              <li>
                <Link
                  to="/eat"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Uber Eats
                </Link>
              </li>
              <li>
                <Link
                  to="/business"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Uber for Business
                </Link>
              </li>
              <li>
                <Link
                  to="/freight"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Uber Freight
                </Link>
              </li>
            </ul>
          </div>

          {/* Global citizenship */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Global citizenship</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/safety"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Safety
                </Link>
              </li>
              <li>
                <Link
                  to="/diversity"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Diversity and Inclusion
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Travel</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/airports"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Airports
                </Link>
              </li>
              <li>
                <Link
                  to="/cities"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cities
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Apps */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 mb-8">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <Link
              to="/facebook"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            <Link
              to="/twitter"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </Link>
            <Link
              to="/youtube"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <span className="sr-only">YouTube</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>
            <Link
              to="/linkedin"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
            <Link
              to="/instagram"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.987 11.988 11.987c6.618 0 11.985-5.369 11.985-11.987C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.8L7.48 14.45c.35.664.724.98 1.32.98.335 0 .602-.17.802-.51.2-.338.301-.802.301-1.392V9.684h1.65v3.844c0 1.17-.301 2.046-.9 2.628-.602.582-1.431.873-2.489.873l.285-.041zM16.414 17c-1.297 0-2.448-.73-3.016-1.8l2.047-.738c.35.664.724.98 1.32.98.335 0 .602-.17.802-.51.2-.338.301-.802.301-1.392V9.684h1.65v3.844c0 1.17-.301 2.046-.9 2.628-.602.582-1.431.873-2.489.873l.285-.041z" />
              </svg>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/app-store"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <img
                src="./appstore.svg"
                alt="Download on the App Store"
                className="h-10"
              />
            </Link>
            <Link
              to="/play-store"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <img
                src="./playstore.svg"
                alt="Get it on Google Play"
                className="h-12"
              />
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="text-2xl font-bold">Uber</div>
            <div className="text-gray-400">© 2025 Uber. Made by Prateet</div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/privacy"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Privacy
            </Link>
            <Link
              to="/accessibility"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Accessibility
            </Link>
            <Link
              to="/terms"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Terms
            </Link>
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clipRule="evenodd"
                />
              </svg>
              <select className="bg-transparent text-gray-300 text-sm border-none focus:outline-none cursor-pointer">
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="bn">বাংলা</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
