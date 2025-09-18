import MobileApp from "../components/GetRide/MobileApp";
import DesktopApp from "../components/GetRide/DesktopApp";

const GetRide = () => {
    return (
    <div className="h-screen w-full bg-white overflow-hidden">
      <div className="md:hidden h-full">
        <MobileApp />
      </div>
      <div className="hidden md:block h-full">
        <DesktopApp />
      </div>
    </div>
  );
};
export default GetRide;
