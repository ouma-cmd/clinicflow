import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function PatientDetails() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const response = await api.get(`/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadPatient();
  }, [id]);

  if (!patient) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading patient...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Patient Details</h1>

          <p className="text-gray-500 mt-1">
            View patient information and appointments
          </p>
        </div>

        <Link
          to="/patients"
          className="
          bg-gray-200
          hover:bg-gray-300
          px-5
          py-2
          rounded-lg
          "
        >
          Back
        </Link>
      </div>

      {/* PATIENT CARD */}

      <div
        className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        p-8
        "
      >
        <div className="flex items-center gap-5 mb-8">
          <div
            className="
            w-16
            h-16
            rounded-full
            bg-emerald-100
            flex
            items-center
            justify-center
            text-emerald-600
            text-2xl
            font-bold
            "
          >
            {patient.full_name.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {patient.full_name}
            </h2>

            <p className="text-gray-500">CIN : {patient.cin}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Phone</p>

            <p className="font-semibold">{patient.phone}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Birth Date</p>

            <p className="font-semibold">
              {new Date(patient.birth_date).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Address</p>

            <p className="font-semibold">{patient.address || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Created At</p>

            <p className="font-semibold">
              {new Date(patient.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* APPOINTMENTS */}

      <div
        className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        overflow-hidden
        "
      >
        <div
          className="
        p-6
        border-b
        flex
        justify-between
        "
        >
          <h2 className="text-xl font-bold">Appointments</h2>

          <span
            className="
          bg-emerald-100
          text-emerald-700
          px-3
          py-1
          rounded-full
          text-sm
          "
          >
            {patient.appointments.length} total
          </span>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 text-left">Date</th>

              <th>Status</th>

              <th>Reason</th>

              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {patient.appointments.length > 0 ? (
              patient.appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {new Date(appointment.appointment_date).toLocaleString()}
                  </td>

                  <td>
                    <span
                      className={`
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  font-medium

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

                  <td>{appointment.reason || "-"}</td>

                  <td>{appointment.notes || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="
              text-center
              p-8
              text-gray-500
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

export default PatientDetails;
