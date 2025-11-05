import axiosClient from "../api/axiosClient.js";

export const teamService = {
    getAll: () => axiosClient.get("/team"),
    getById: (id) => axiosClient.get(`/team/${id}`),
    create: (data) => axiosClient.post("/team/create", data),
    update: (id, data) => axiosClient.put(`/team/edit/${id}`, data),
    delete: (id) => axiosClient.delete(`/team/${id}`),
};