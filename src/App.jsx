import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import GetRide from "./pages/GetRide";
import AuthSuccess from "./authSuccess";
import Help from "./pages/Help";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/getride" element={<GetRide />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/help" element={<Help />}></Route>
      </Routes>
    </div>
  );
};

export default App;
