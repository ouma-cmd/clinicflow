import api from "../api/axios";

export const getPatients = async (search = "", page = 1, limit = 10) => {
  const response = await api.get("/patients", {
    params: {
      search,
      page,
      limit,
    },
  });

  return response.data;
};

export const createPatient = async (data) => {
  const response = await api.post("/patients", data);

  return response.data;
};

export const updatePatient = async (id, data) => {
  const response = await api.put(`/patients/${id}`, data);

  return response.data;
};

export const deletePatient = async (id) => {
  const response = await api.delete(`/patients/${id}`);

  return response.data;
};
