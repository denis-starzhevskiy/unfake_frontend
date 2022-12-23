import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://unfake.io/api',
});

export default axiosInstance
