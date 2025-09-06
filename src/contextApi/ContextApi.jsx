// import { createContext, useContext, useState } from "react";

// const ContextApi = createContext();

// export const ContextProvider = ({ children }) => {
//     let storedToken = null;

//     try {
//         const raw = localStorage.getItem("JWT_TOKEN");
//         storedToken = raw ? JSON.parse(raw) : null;
//     } catch (error) {
//         console.error("Invalid JWT_TOKEN in localStorage:", error);
//         storedToken = null;
//     }

//     const [token, setToken] = useState(storedToken);

//     const sendData = {
//         token,
//         setToken,
//     };

//     return (
//         <ContextApi.Provider value={sendData}>
//             {children}
//         </ContextApi.Provider>
//     );
// };

// export const useStoreContext = () => {
//     const context = useContext(ContextApi);
//     return context;
// };
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
