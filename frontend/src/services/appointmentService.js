import api from "../api/axios";

export const getAppointments = async (status = "") => {
  const response = await api.get("/appointments", {
    params: {
      status,
    },
  });

  return response.data;
};

export const createAppointment = async (data) => {
  const response = await api.post("/appointments", data);

  return response.data;
};

export const updateAppointment = async (id, data) => {
  const response = await api.put(`/appointments/${id}`, data);

  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await api.patch(`/appointments/${id}/cancel`);

  return response.data;
};

