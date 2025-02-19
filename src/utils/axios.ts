import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(apiUrl)
export const axiosInstance = axios.create({
    
    baseURL: apiUrl,
  });