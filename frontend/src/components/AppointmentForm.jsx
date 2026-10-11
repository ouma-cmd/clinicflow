import { useEffect, useState } from "react";
import api from "../api/axios";

function AppointmentForm({ appointment, onSubmit, onCancel }) {
  const [patients, setPatients] = useState([]);

  const [form, setForm] = useState({
    patientId: appointment?.patient_id || "",

    appointmentDate: appointment?.appointment_date || "",

    reason: appointment?.reason || "",

    notes: appointment?.notes || "",
  });

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const response = await api.get("/patients");

        setPatients(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadPatients();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border mb-8">
      <h2 className="text-xl font-bold mb-4">
        {appointment ? "Edit Appointment" : "New Appointment"}
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <select
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option value="">Select Patient</option>

          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.full_name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="appointmentDate"
          value={form.appointmentDate}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <div className="flex gap-3">
          <button className="bg-emerald-500 text-white px-5 py-2 rounded">
            Save
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-5 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
