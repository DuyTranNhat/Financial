import axios from 'axios'
import React from 'react'
import { PortfolioGet, PortfolioPost } from '../Models/Portfolio'
import { handleError } from '../Helpers/ErrorHandler';

const api = "http://localhost:5149/api/portifio";


// axios.interceptors.request.use(function (config) {
//     config.headers.set("Authorization", "Bearer "+localStorage.getItem("token"));
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

export const PortfolioGetAPI = async () => {
    try {
        const data = await axios.get<PortfolioGet[]>(api);
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const PortfolioPostAPI = async (symbolStock: string) => {
    try {
        const data = await axios.post<PortfolioPost[]>(api + `?symbol=${symbolStock}`);
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const PortfolioDelete = async (symbolStock: string) => {
    try {
        const data = await axios.delete<PortfolioPost>(api + `?symbol=${symbolStock}`)
        return data;
    } catch (error) {
        handleError(error)
    }
}



