import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";
import Appointments from "../pages/Appointments";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import PatientDetails from "../pages/PatientDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/patients"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Patients />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/patients/:id" element={<PatientDetails />} />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Appointments />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
