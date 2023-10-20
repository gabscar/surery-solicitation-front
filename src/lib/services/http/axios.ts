"use client";
import { API_URL } from "@src/lib/config/variablesConfig";
import Axios from "axios";
export const axios = Axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error.response.data);
    }
);
