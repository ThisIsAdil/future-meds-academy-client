import axiosClient from "../api/axiosClient";

export const blogService = {
    getAll: () => axiosClient.get("/blogs"),
    create: (data) => axiosClient.post("/blogs/create", data),
    update: (id, data) => axiosClient.put(`/blogs/update/${id}`, data),
    delete: (id) => axiosClient.delete(`/blogs/delete/${id}`),
    getById: (id) => axiosClient.get(`/blogs/${id}`),
};