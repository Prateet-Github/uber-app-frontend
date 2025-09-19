import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import GetRide from "./pages/GetRide";
import AuthSuccess from "./authSuccess";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Driver from "./pages/Driver";
import Tab1 from "./components/DriverTabs/Tab1";
import Tab2 from "./components/DriverTabs/Tab2";
import Tab3 from "./components/DriverTabs/Tab3";
import Pending from "./components/DriverTabs/Pending";
import Admin from "./pages/Admin";
import DriverDashboard from "./pages/DriverDashboard";
import AdminLogin from "./pages/AdminLogin";
import PaymentPage from "./pages/PaymentPage";
import Loading from "./pages/Loading";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/getride" element={<GetRide />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/help" element={<Help />}></Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/driver" element={<Driver></Driver>}></Route>
        <Route path="/tab1" element={<Tab1></Tab1>}></Route>
        <Route path="/tab2" element={<Tab2></Tab2>}></Route>
        <Route path="/tab3" element={<Tab3></Tab3>}></Route>
        <Route path="/pending" element={<Pending></Pending>}></Route>
        <Route path="/admin" element={<Admin></Admin>}></Route>
        <Route
          path="/driverdashboard"
          element={<DriverDashboard></DriverDashboard>}
        ></Route>
        <Route path="/adminlogin" element={<AdminLogin></AdminLogin>}></Route>
        <Route path="/payment" element={<PaymentPage></PaymentPage>}></Route>
        <Route path="/loading" element={<Loading></Loading>}></Route>
      </Routes>
    </div>
  );
};

export default App;
