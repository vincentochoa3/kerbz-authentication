import axios from "axios";

export const axiosHandler = axios.create({ baseURL: process.env.DOMAIN_URL });
