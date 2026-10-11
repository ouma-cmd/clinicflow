import { useEffect, useState } from "react";

import {
  getAppointments,
  createAppointment,
  updateAppointment,
  cancelAppointment,
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

      console.log("APPOINTMENTS FROM API:", data);

      setAppointments(data);
    } catch (error) {
      console.error("LOAD ERROR:", error);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [status]);

  const handleSubmit = async (data) => {
    try {
      if (selectedAppointment) {
        await updateAppointment(
          selectedAppointment.id,

          data,
        );
      } else {
        await createAppointment(data);
      }

      setShowForm(false);

      setSelectedAppointment(null);

      await loadAppointments();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Error");
    }
  };

  const handleCancel = async (id) => {
    if (!confirm("Cancel appointment ?")) return;

    await cancelAppointment(id);

    loadAppointments();
  };

  return (
    <div>
      {/* FORM TOP */}

      {showForm && (
        <AppointmentForm
          appointment={selectedAppointment}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);

            setSelectedAppointment(null);
          }}
        />
      )}

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>

        <button
          onClick={() => {
            setShowForm(true);

            setSelectedAppointment(null);
          }}
          className="bg-emerald-500 text-white px-5 py-2 rounded-lg"
        >
          + Add Appointment
        </button>
      </div>

      {/* FILTER */}

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-3 rounded-lg mb-6"
      >
        <option value="">All Status</option>

        <option value="pending">Pending</option>

        <option value="confirmed">Confirmed</option>

        <option value="cancelled">Cancelled</option>
      </select>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">Patient</th>

              <th>Date</th>

              <th>Status</th>

              <th>Reason</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b">
                <td className="p-4">{appointment.patient_name}</td>

                <td>
                  {new Date(appointment.appointment_date).toLocaleString()}
                </td>

                <td>
                  <span
                    className={`
px-3 py-1 rounded-full text-sm

${
  appointment.status === "confirmed"
    ? "bg-green-100 text-green-700"
    : appointment.status === "cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700"
}

`}
                  >
                    {appointment.status}
                  </span>
                </td>

                <td>{appointment.reason}</td>

                <td className="flex gap-2 p-3">
                  <button
                    onClick={() => {
                      setSelectedAppointment(appointment);

                      setShowForm(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  {appointment.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
