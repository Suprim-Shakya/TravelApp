import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken, setAccessToken } from '../componentsSaurav/modules/handleAccessToken';
import LoadingScreen from '../componentsSaurav/screens/LoadingScreen';


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=> {
        async function checkAccessToken() {
            const accessToken = await getAccessToken()
            if (accessToken) {
                setIsLoggedIn(true)
            }
            setLoading(false)
        }

        checkAccessToken();
    },[])

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = async () => {
        await setAccessToken(null)
        setIsLoggedIn(false);
    };

    if (loading) {
        // Display loading indicator or screen until the authentication status is determined
        return <LoadingScreen />;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
