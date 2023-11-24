import axios from 'axios';
import router from './router';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosInstance.interceptors.request.use((config) => {
    const token = '123'; // TODO
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`;
    return config;
})

axiosInstance.interceptors.response.use((response) => {

    return response;

}, (error) => {
    if (error.response.status && error.response.status === 401) {
        console.log('unauthorized, logging out ...');
        localStorage.removeItem('TOKEN');
        window.location.reload();
        // router.navigate('/login');
        return error;
        // auth.logout();
        // router.replace('/login');
    }
    throw error;
})


export default axiosInstance;