import axiosClient from "../api/axiosClient";

export const universityService = {
    getAll: () => axiosClient.get("/universities"),
    getById: (id) => axiosClient.get(`/universities/${id}`),
    create: (data) => axiosClient.post("/universities/create", data),
    update: (id, data) => axiosClient.put(`/universities/update/${id}`, data),
    delete: (id) => axiosClient.delete(`/universities/delete/${id}`),
    updateYearlyData: (id, data) => axiosClient.put(`/universities/update-yearly-data/${id}`, data),
};