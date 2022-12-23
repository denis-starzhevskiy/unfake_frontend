import axiosInstance from './axiosInstance'

export const registerUser = async (email, username, password) => { //organization, organizationRole
    const response = await axiosInstance.post('/accounts/register/', {
                email: email,
                username: username,
                first_name: '',
                last_name: '',
                password: password
        })

    return response.data
}

export const resetPassword = async (email) => {
    const response = await axiosInstance.post('/accounts/password-reset/', {
        email: email
    })

    return response.data
}

export const changePassword = async (email, password, repeatPassword) => {
    const response = await axiosInstance.post('/accounts/password-reset-confirm/', {
        email: email,
        newPassword1: password,
        newPassword2: repeatPassword
    })

    return response.data
}

export const login = async (email, password) => {
    const response = await axiosInstance.post('/accounts/login/', {
        email: email,
        password: password
    })

    return response.data
}

export const refreshToken = async () => {
    const response = await axiosInstance.post('/accounts/token/refresh/')

    return response.data
}

export const logout = async () => {
    const response = await axiosInstance.post('/accounts/logout/')

    return response.data
}

export const getUserInfo = async () => {
    const response = await axiosInstance.get('/accounts/user/')

    return response.data
}

export const changeUserData = async (username, name, lastName) => {
    const response = await axiosInstance.patch('/accounts/user/', {
        username: username,
        first_name: name,
        last_name: lastName
    })

    return response.data
}
export const resendEmail = async (email) => {
    const response = await axiosInstance.patch('/accounts/resend-email/', {
        email: email
    })

    return response.data
}
