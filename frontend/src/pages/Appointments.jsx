import { useEffect, useState } from "react";

import {
  getAppointments,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  updateStatus,
} from "../services/appointmentService";

import AppointmentForm from "../components/AppointmentForm";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const [status, setStatus] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const loadAppointments = async () => {
    try {
      const data = await getAppointments(status);

      console.log("APPOINTMENTS:", data);

      // حماية إلا رجع object
      setAppointments(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("LOAD ERROR:", error);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [status]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus(id, newStatus);

      await loadAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedAppointment) {
        await updateAppointment(selectedAppointment.id, data);
      } else {
        await createAppointment(data);
      }

      setShowForm(false);

      setSelectedAppointment(null);

      loadAppointments();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Error");
    }
  };

  const handleCancel = async (id) => {
    if (!confirm("Cancel appointment ?")) return;

    try {
      await cancelAppointment(id);

      loadAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* FORM */}
      {showForm && (
        <div className="mb-8">
          <AppointmentForm
            appointment={selectedAppointment}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedAppointment(null);
            }}
          />
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>

          <p className="text-gray-500 mt-1">Manage patient appointments</p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setSelectedAppointment(null);
          }}
          className="
        bg-emerald-500
        hover:bg-emerald-600
        text-white
        px-6
        py-3
        rounded-xl
        shadow-md
        transition
        "
        >
          + New Appointment
        </button>
      </div>

      {/* FILTER CARD */}
      <div
        className="
      bg-white
      rounded-xl
      shadow-sm
      border
      p-5
      mb-6
    "
      >
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Filter by status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
        border
        border-gray-300
        rounded-lg
        px-4
        py-2
        w-full
        md:w-64
        focus:ring-2
        focus:ring-emerald-400
        outline-none
        "
        >
          <option value="">All Status</option>

          <option value="pending">Pending</option>

          <option value="confirmed">Confirmed</option>

          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* TABLE */}

      <div
        className="
      bg-white
      rounded-xl
      shadow-sm
      border
      overflow-hidden
    "
      >
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="p-4 text-left text-gray-600">Patient</th>

              <th className="p-4 text-left text-gray-600">Date</th>

              <th className="p-4 text-left text-gray-600">Status</th>

              <th className="p-4 text-left text-gray-600">Reason</th>

              <th className="p-4 text-center text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="
              border-b
              hover:bg-gray-50
              transition
              "
                >
                  <td className="p-4 font-medium text-gray-800">
                    {appointment.patient_name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {new Date(appointment.appointment_date).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <select
                      value={appointment.status}
                      onChange={(e) =>
                        handleStatusChange(appointment.id, e.target.value)
                      }
                      className={`
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    font-medium
                    border

                    ${
                      appointment.status === "confirmed"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : appointment.status === "cancelled"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "bg-yellow-100 text-yellow-700 border-yellow-200"
                    }

                  `}
                    >
                      <option value="pending">Pending</option>

                      <option value="confirmed">Confirmed</option>

                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4 text-gray-600">
                    {appointment.reason || "-"}
                  </td>

                  <td
                    className="
                p-4
                flex
                justify-center
                gap-2
              "
                  >
                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment);

                        setShowForm(true);
                      }}
                      className="
                  bg-blue-500
                  hover:bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  transition
                  "
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="
              text-center
              p-10
              text-gray-400
              "
                >
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
