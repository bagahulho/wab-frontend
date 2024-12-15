import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Указываем базовый URL API
});

// Добавляем токен в заголовки
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Получаем токен из LocalStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;