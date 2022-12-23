import axiosInstance from "./axiosInstance";

export const getBrands = async () => {
    const response = await axiosInstance.get('core/brands/')

    return response.data
}

export const getBrand = async (id) => {
    const response = await axiosInstance.get(`core/brand/${id}/`)

    return response.data
}

export const createBrand = async (brandData) => {
    const response = await axiosInstance.post('core/brand/create/', brandData, {
        headers: {"Content-Type": "multipart/form-data"}
    })

    return response.data
}

export const changeBrand = async (id, brandData) => {
    const response = await axiosInstance.patch(`core/brand/${id}/`, brandData, {
        headers: { "Content-Type": "multipart/form-data" }
    })

    return response.data
}

export const deleteBrand = async (id) => {
    const response = await axiosInstance.delete(`core/brand/${id}/`)

    return response.data
}
