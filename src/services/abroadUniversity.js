import axiosClient from "../api/axiosClient";

export const abroadUniversityService = {
    getAll: () => axiosClient.get("/abroad-universities"),
    create: (data) => axiosClient.post("/abroad-universities/create", data),
    update: (id, data) => axiosClient.put(`/abroad-universities/update/${id}`, data),
    delete: (id) => axiosClient.delete(`/abroad-universities/delete/${id}`),
};