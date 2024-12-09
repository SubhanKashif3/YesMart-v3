import  Constants from "expo-constants";
import axios from "axios";
const apiClient = axios.create({
    baseURL : Constants.manifest.extra.API_BASE_URL
});

export default apiClient