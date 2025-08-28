import axios from "axios";

const apiCall = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
  timeout: 10000,
});

export default apiCall;
