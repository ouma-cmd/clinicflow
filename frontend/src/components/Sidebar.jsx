import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  HeartPulse,
  UserCog,
} from "lucide-react";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Patients",
      path: "/patients",
      icon: Users,
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: CalendarDays,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-8 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
            <HeartPulse size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">ClinicFlow</h2>

            <p className="text-sm text-gray-400">Medical Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100 hover:text-emerald-600"
                }`
              }
            >
              <Icon size={22} />

              <span className="font-medium">{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 px-6 py-5">
        <p className="text-xs text-gray-400">© 2026 ClinicFlow</p>

        <p className="text-xs text-gray-300 mt-1">Version 1.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;
