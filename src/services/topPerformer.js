import axiosClient from "../api/axiosClient";

export const topPerformerService = {
    getAll: () => axiosClient.get("/top-performers"),
    create: (data) => axiosClient.post("/top-performers/create", data),
    update: (id, data) => axiosClient.put(`/top-performers/update/${id}`, data),
    delete: (id) => axiosClient.delete(`/top-performers/delete/${id}`),
};