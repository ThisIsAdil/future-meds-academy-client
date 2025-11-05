import axiosClient from "../api/axiosClient";

export const consultationService = {
    getAll: () => axiosClient.get("/consultations"),
    create: (data) => axiosClient.post("/consultations/create", data),
    markCompleted: (id) => axiosClient.put(`/consultations/mark-as-completed/${id}`),
};