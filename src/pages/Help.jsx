import {
  Car,
  Utensils,
  Building,
  Bike,
  Briefcase,
  Truck,
  Globe,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function UberHelpPage() {
  const supportCategories = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Riders",
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Driving & Delivering",
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Uber Eats",
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Merchants & Restaurants",
    },
    {
      icon: <Bike className="w-8 h-8" />,
      title: "Bikes & Scooters",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Uber for Business",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Freight",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left side - Uber logo */}
          <div className="text-3xl font-bold">Uber</div>

          {/* Right side - Language and Login */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span className="text-sm">EN</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="text-sm">
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-black mb-8">
            Welcome to Uber Support
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're here to help. Looking for customer service contact
            information? Explore support resources for the relevant products
            below to find the best way to reach out about your issue.
          </p>
        </div>

        {/* Support Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-6xl mx-auto">
          {supportCategories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer group"
            >
              <div className="text-gray-700 mb-4 group-hover:text-black transition-colors">
                {category.icon}
              </div>
              <h3 className="text-sm font-medium text-center text-gray-800 group-hover:text-black transition-colors">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Spacer */}
      <div className="h-32"></div>
    </div>
  );
}
