import axios from "axios";

export const http = axios.create({
  baseURL: "ta base url de l'api example : http://localhost:8000",
  timeout: 20000,
});

http.defaults.headers.post["Content-Type"] = "application/json";
