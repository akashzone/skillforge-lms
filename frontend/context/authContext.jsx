

import { Children } from "react";
import { createContext, useContext, useState } from "react";

const authContext = createContext();

export const authProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(() => {
        try {
            return user ? localStorage.setItem("user", user) : null
        }
        catch {
            return null;
        }
    });

    const login = (token) => {
        if (!token || !user) {
            return null
        }
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        console.log("Successfully logged in.")
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Successfully logged out.")
    }
    return (
        <authContext.Provider value={{
            token, user, login, logout
        }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext);
}