import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "admin";

  const [stats, setStats] = useState({
    patients: {
      total: 0,
    },
    appointments: {
      today: 0,
      confirmed: 0,
      pending: 0,
      cancelled: 0,
    },
  });

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await api.get("/dashboard");

        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getStats();
  }, []);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>

      <p className="text-gray-500 mb-6">Welcome back, {user?.fullName}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Patients */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 h-40">
          <p className="text-gray-500">👥 Patients</p>

          <h2 className="text-4xl font-bold mt-4 text-gray-800">
            {stats.patients.total}
          </h2>
        </div>

        {/* Today's appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 h-40">
          <p className="text-gray-500">📅 Today Appointments</p>

          <h2 className="text-4xl font-bold mt-4 text-gray-800">
            {stats.appointments.today}
          </h2>
        </div>

        {/* Confirmed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 h-40">
          <p className="text-gray-500">✅ Confirmed</p>

          <h2 className="text-4xl font-bold mt-4 text-green-600">
            {stats.appointments.confirmed}
          </h2>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 h-40">
          <p className="text-gray-500">⏳ Pending</p>

          <h2 className="text-4xl font-bold mt-4 text-yellow-500">
            {stats.appointments.pending}
          </h2>
        </div>

        {/* Cancelled - Admin only */}
        {isAdmin && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 h-40">
            <p className="text-gray-500">❌ Cancelled</p>

            <h2 className="text-4xl font-bold mt-4 text-red-500">
              {stats.appointments.cancelled}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
