
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        try {
            return savedUser ? JSON.parse(savedUser) : null
        } catch {
            return null
        }
    });

    const login = (token, user) => {
        if (!token || !user) {
            return null
        }
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        console.log("token",token);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Successfully logged in and saved to localStorage.");
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Successfully logged out.")
    }
    return (
        <AuthContext.Provider
            value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}