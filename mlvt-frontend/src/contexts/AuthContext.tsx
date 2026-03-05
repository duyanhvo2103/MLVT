import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
    login: (token: string, userId: string) => void;
    logout: () => void;
    remainingToken: number;
    SetRemainingToken: (token: number) => void;
    AddRemainingToken: (token: number) => void;
    SubstractRemainingToken: (token: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [remainingToken, setRemainingToken] = useState<number>(0);

    const login = (token: string, userId: string) => {
        console.log("Logging in userId:", userId);
        localStorage.setItem("authToken", token);
    };

    const logout = () => {
        console.log("Logging out...");
        localStorage.removeItem("authToken");
        window.location.href = "/login"; // Redirect to login page
    };

    const SetRemainingToken = (token: number) => {
        setRemainingToken(token);
    };

    const AddRemainingToken = (token: number) => {
        setRemainingToken((prevData) => prevData + token);
    };

    const SubstractRemainingToken = (token: number) => {
        setRemainingToken((prevData) => prevData - token);
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                remainingToken,
                SetRemainingToken,
                AddRemainingToken,
                SubstractRemainingToken,
            }}
        >
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
