import axios from "axios";

axios.defaults.baseURL = "https://cinemaguide.skillbox.cc";
axios.defaults.withCredentials = true;

// Добавляем токен в заголовок Authorization для всех запросов
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Обработка 401 ошибки для перенаправления на авторизацию
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("User is not authorized. Redirecting to login.");
    }
    return Promise.reject(error);
  }
);

export default axios;
