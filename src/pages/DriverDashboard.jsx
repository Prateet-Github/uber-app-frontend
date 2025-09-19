import Dashboard from "../components/DriverDashboard/Dashboard";
import Navbar from "../components/DriverDashboard/Navbar";

const DriverDashboard = () => {
  return (
    <div className="h-screen w-full bg-white overflow-hidden">
      <Navbar></Navbar>
      <Dashboard></Dashboard>
    </div>
  );
};

export default DriverDashboard;
