import axiosClient from "../api/axiosClient";

export const testimonialService = {
    getAll: () => axiosClient.get("/testimonials"),
    create: (data) => axiosClient.post("/testimonials/create", data),
    update: (id, data) => axiosClient.put(`/testimonials/${id}`, data),
    delete: (id) => axiosClient.delete(`/testimonials/${id}`),
};