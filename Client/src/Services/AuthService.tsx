import axios from "axios"
import { UserProfilerToken } from "../Model/User"
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5149/api/"

export const loginAPI = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserProfilerToken>(api + 'account/login', { username, password });
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const registerAPI = async (username: string, password: string, email: string) => {
    try {
        const data = await axios.post<UserProfilerToken>(api + 'account/register', { username, password, email });
        return data;
    } catch (error) {
        handleError(error);
    }
}