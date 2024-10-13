import axios from "axios";

const apiClient = axios.create({
    baseURL : import.meta.env.VITE_SERVER_BASE_URL as string,
    withCredentials : true
});

export {apiClient}