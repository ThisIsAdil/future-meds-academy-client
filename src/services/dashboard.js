import axiosClient from "../api/axiosClient";

export const dashboardService = {
    getStats: () => axiosClient.get("/dashboard/stats"),
    getFeaturedImages: () => axiosClient.get("/dashboard/featured-images"),
    uploadFeaturedImage: (file) => {
        const formData = new FormData()
        formData.append('featureImage', file)
        return axiosClient.post("/dashboard/featured-images", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    deleteFeaturedImage: (imageId) => axiosClient.delete(`/dashboard/featured-images/${imageId}`)
};
