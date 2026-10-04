import axios from "axios";

const api = axios.create({
  baseURL: "https://assingment-task-cohort-3-revj.vercel.app/api",
  withCredentials: true,
});

export default api;