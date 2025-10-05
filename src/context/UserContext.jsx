import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                const payload = JSON.parse(atob(storedToken.split(".")[1]));
                setUser({ id: payload.userId, email: payload.email });
                setToken(storedToken);
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = (tokenData, userData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem("token", tokenData);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
