import axios from 'axios'


const baseUrl = "http://localhost:8000";


export const apiClient = axios.create(
    {
        baseURL: baseUrl, 
        // timeout: 1000,
        // withCredentials: true
    }
)

const token = localStorage.getItem("accessToken");

if(token){
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
}