import { LogOut, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "User",
    role: "staff",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getMe();

        console.log("AUTH ME:", response);

        setUser(response.user);

        localStorage.setItem("user", JSON.stringify(response.user));
      } catch (error) {
        console.error("AUTH ME ERROR:", error);
      }
    };

    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        <p className="text-sm text-gray-500">Welcome back 👋</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center text-white">
            <UserCircle2 size={24} />
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-gray-800">{user?.fullName}</p>

            <p className="text-sm capitalize text-gray-500">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
