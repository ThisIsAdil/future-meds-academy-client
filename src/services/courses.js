import axiosClient from "../api/axiosClient";

export const courseService = {
    getAll: () => axiosClient.get("/courses"),
    create: (data) => axiosClient.post("/courses/create", data),
    getById: (id) => axiosClient.get(`/courses/${id}`),
    update: (id, data) => axiosClient.put(`/courses/edit/${id}`, data),
    delete: (id) => axiosClient.delete(`/courses/delete/${id}`),
};