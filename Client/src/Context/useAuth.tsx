import React, { Children, useContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User"
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
    isReady: boolean
};

type Props = { children: React.ReactNode }

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);   
    }, [token]);

    const registerUser = async (email: string, username: string, password: string) => {
        await registerAPI(username, password, email)
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token);
                    const UserObj = {
                        userName: res?.data.userName,
                        email: res?.data.email
                    }

                    localStorage.setItem("user", JSON.stringify(UserObj));
                    setToken(res?.data.token);
                    setUser(UserObj!);
                    toast.success("Register success!");
                    navigate("/search");
                }
            }).catch(e => toast.warning("server error occured"));
    }

    const login = async (username: string, password: string) => {
        await loginAPI(username, password)
            .then(res => {
                if (res) {
                    localStorage.setItem("token", res?.data.token);
                    const UserObject = {
                        userName: res?.data.userName,
                        email: res?.data.email,
                    }


                    localStorage.setItem("user", JSON.stringify(UserObject));
                    setUser(UserObject);
                    setToken(res?.data.token);


                    
                    toast.success("Success Notification !");
                    navigate("/search")
                }
            }).catch(ex => toast.warning("Server error occured"))
    }

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
        setToken(null)
        setIsReady(false)
        navigate("/")
    }

    return (
        
        <UserContext.Provider value={{ user, token, registerUser, login, logout, isLoggedIn, isReady }} >
            {isReady ? children : null}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(UserContext)
}