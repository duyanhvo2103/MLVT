import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    userId: string | null;
    login: (token: string, userId: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));
    const navigate = useNavigate();

    const login = (token: string, userId: string) => {
        setUserId(userId);
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/auth"); 
    };

    return (
        <AuthContext.Provider value={{ userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
