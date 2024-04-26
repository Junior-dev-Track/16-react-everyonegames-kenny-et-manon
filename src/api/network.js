import axios from "axios";


export const http = axios.create({
  baseURL: `https://api.rawg.io/api`,
  timeout: 20000,
});

http.defaults.headers.post["Content-Type"] = "application/json";

