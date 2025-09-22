import Navbar from "../components/Home/Navbar";
import MainContent from "../components/Home/MainContent";
import Suggestion from "../components/Home/Suggestion";
import LoginToSee from "../components/Home/LoginToSee";
import Plan from "../components/Home/Plan";
import Image3 from "../components/Home/Image3";
import Image4 from "../components/Home/Image4";
import Image5 from "../components/Home/Image5";
import Footer from "../components/Home/Footer";
import { useAuth } from "../../context/authContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar />

      <MainContent />

      <Suggestion />

      {!user && <LoginToSee />}

      <Plan></Plan>

      {user?.role !== "driver" && (
        <>
          <Image3 />
          <Image4 />
          <Image5 />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
