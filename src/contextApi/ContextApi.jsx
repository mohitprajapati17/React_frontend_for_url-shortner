
import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    // Read directly as string
    const storedToken = localStorage.getItem("JWT_TOKEN") || null;

    const [token, setToken] = useState(storedToken);

    const sendData = {
        token,
        setToken,
    };

    return (
        <ContextApi.Provider value={sendData}>
            {children}
        </ContextApi.Provider>
    );
};

export const useStoreContext = () => {
    return useContext(ContextApi);
};
