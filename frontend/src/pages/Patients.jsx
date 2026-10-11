import { useEffect, useState } from "react";

import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../services/patientService";

import PatientForm from "../components/PatientForm";

import { useNavigate } from "react-router-dom";

function Patients() {
  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const loadPatients = async () => {
    try {
      const response = await getPatients(
        search,
        pagination.page,
        pagination.limit,
      );

      setPatients(response.data);

      setPagination(response.pagination);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPatients();
  }, [search, pagination.page]);

  const handleSubmit = async (data) => {
    try {
      if (selectedPatient) {
        await updatePatient(selectedPatient.id, data);
      } else {
        await createPatient(data);
      }

      setShowForm(false);

      setSelectedPatient(null);

      loadPatients();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete patient ?")) return;

    await deletePatient(id);

    loadPatients();
  };

  return (
    <div>
      {showForm && (
        <PatientForm
          patient={selectedPatient}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);

            setSelectedPatient(null);
          }}
        />
      )}

      {/* TITLE */}

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Patients</h1>

        <button
          onClick={() => {
            setShowForm(true);

            setSelectedPatient(null);
          }}
          className="bg-emerald-500 text-white px-5 py-2 rounded-lg"
        >
          + Add Patient
        </button>
      </div>

      {/* SEARCH */}

      <input
        placeholder="Search by name or CIN..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);

          setPagination({
            ...pagination,

            page: 1,
          });
        }}
        className="border p-3 rounded-lg mb-5 w-96"
      />

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">Name</th>

              <th className="p-4">CIN</th>

              <th className="p-4">Phone</th>

              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td className="p-4">
                  <button
                    className="text-blue-600 font-semibold"
                    onClick={() => navigate(`/patients/${patient.id}`)}
                  >
                    {patient.full_name}
                  </button>
                </td>

                <td className="text-center">{patient.cin}</td>

                <td className="text-center">{patient.phone}</td>

                <td className="flex gap-2 justify-center p-3">
                  <button
                    onClick={() => {
                      setSelectedPatient(patient);

                      setShowForm(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}

      <div className="flex justify-center items-center gap-5 mt-6">
        <button
          disabled={pagination.page === 1}
          onClick={() =>
            setPagination({
              ...pagination,

              page: pagination.page - 1,
            })
          }
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {pagination.page} / {pagination.totalPages}
        </span>

        <button
          disabled={pagination.page === pagination.totalPages}
          onClick={() =>
            setPagination({
              ...pagination,

              page: pagination.page + 1,
            })
          }
          className="px-4 py-2 bg-emerald-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Patients;
