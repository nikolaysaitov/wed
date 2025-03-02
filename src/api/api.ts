import axios, { AxiosInstance } from "axios";

export const COMMON_API = "/api/v1";

export const api: AxiosInstance = axios.create({
  baseURL: COMMON_API,
  headers: {
    "Content-Type": "application/json",
  },
});
