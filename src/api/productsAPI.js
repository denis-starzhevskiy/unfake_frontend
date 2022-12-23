import axiosInstance from "./axiosInstance";

export const getProducts = async () => {
    const response = await axiosInstance.get('core/products/')

    return response.data
}

export const getProduct = async (pageId, brandId) => {
    const response = await axiosInstance.get(`core/brand/${brandId}/product/${pageId}/`)

    return response.data
}

export const createProduct = async (brandId, pageData) => {
    const response = await axiosInstance.post(`core/brand/${brandId}/product/create/`, pageData, {
        headers: {"Content-Type": "multipart/form-data"}
    })

    return response.data
}

export const changeProduct = async (pageId, brandId, pageData) => {
    const response = await axiosInstance.patch(`core/brand/${brandId}/product/${pageId}/`, pageData, {
        headers: { "Content-Type": "multipart/form-data" }
    })

    return response.data
}

export const deleteProduct = async (productId, brandId) => {
    const response = await axiosInstance.delete(`core/brand/${brandId}/product/${productId}/`)

    return response.data
}
