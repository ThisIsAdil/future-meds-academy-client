import axiosClient from "../api/axiosClient";

export const pyqService = {
    getAll: () => axiosClient.get("/pyqs"),
    create: (data) => axiosClient.post("/pyqs/create", data),
    update: (id, data) => axiosClient.put(`/pyqs/update/${id}`, data),
    delete: (id) => axiosClient.delete(`/pyqs/delete/${id}`),
};