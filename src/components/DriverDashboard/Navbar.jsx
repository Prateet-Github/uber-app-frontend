import { useAuth } from "../../../context/authContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div>
      <nav className="w-full bg-black text-white flex justify-between items-center p-4 static top-0">
        <h1 className="text-4xl p-2">Uber</h1>
        <button className="bg-white text-black px-4 py-2 rounded-2xl">
          {user?.username}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
