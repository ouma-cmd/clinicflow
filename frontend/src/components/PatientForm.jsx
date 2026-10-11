import { useState } from "react";

function PatientForm({ patient, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    fullName: patient?.full_name || "",

    cin: patient?.cin || "",

    phone: patient?.phone || "",

    birthDate: patient?.birth_date || "",

    address: patient?.address || "",
  });

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
    <div className="bg-white p-6 rounded-xl shadow border mb-6">
      <h2 className="text-xl font-bold mb-4">
        {patient ? "Edit Patient" : "Add Patient"}
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full name"
          className="border p-2 rounded"
        />

        <input
          name="cin"
          value={form.cin}
          onChange={handleChange}
          placeholder="CIN"
          className="border p-2 rounded"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2 rounded"
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

export default PatientForm;
