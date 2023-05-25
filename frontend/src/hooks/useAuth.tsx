import React, { useEffect, useState } from 'react'

type AuthProps = {
    username: string | null;
    role: string | null;
    token: string | null;
}

export default function useAuth() {
    const [auth, setAuth] = useState<AuthProps>();

    const setAuthLocalStorage = (
        token: string, 
        username: string, 
        role: string
        ) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
    }
    const clearAuthLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
    }
    const getUsername = () => {
        return localStorage.getItem('username');
    }
    const getRole = () => {
        return localStorage.getItem('role');
    }
    const getToken = () => {
        return localStorage.getItem('token');
    }

    useEffect(() => {
        setAuth({
            username: getUsername(),
            role: getRole(),
            token: getToken(),
        });
    }, []);
    return {
        auth,
        setAuthLocalStorage,
        clearAuthLocalStorage,
    };

}
