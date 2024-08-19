import axios from 'axios';

const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};

const axiosInstance = axios.create({
    baseURL: getBaseUrl(),
});

export default axiosInstance;
