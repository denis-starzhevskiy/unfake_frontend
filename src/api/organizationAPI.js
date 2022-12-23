import axiosInstance from './axiosInstance'

export const saveOrganization = async (formData) => {
    await axiosInstance.post('accounts/organization/create/', formData, {
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        return !response.data.errors;
    })
}

export const changeOrganization = async (formData) => {
    await axiosInstance.post('accounts/organization/create/', formData, {
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
            return !response.data.errors;
        })
}


export const getOrganization = async () => {
    const response = await axiosInstance.get('accounts/organization/')

    return response.data
}
