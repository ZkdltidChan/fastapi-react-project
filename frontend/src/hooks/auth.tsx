import React, { useState, useEffect, useContext, createContext } from 'react'
import useAxios from './useAxios';
import { LOGIN_URL, LoginResponseRrops } from '../api/config';

interface User {
    username: string | undefined | null;
    role: string | undefined | null;
    token: string | undefined | null;
}

interface AuthContext {
    user: User | undefined;
    login: (username: string, password: string) => void;
    logout: () => void;
    isLoading: boolean,
}

type UserProviderProps = {
    children: React.ReactNode;
};



export const UserContext = createContext<AuthContext>({
    user: undefined,
    login: () => { },
    logout: () => { },
    isLoading: false,
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const { fetchData, response, isLoading, error } = useAxios<LoginResponseRrops>()
    const [user, setUser] = useState<User>(
        {
            username: localStorage.getItem('username'),
            role: localStorage.getItem('role'),
            token: localStorage.getItem('token')
        }
    );
    useEffect(() => {
        if (response?.access_token && response?.access_token && response?.access_token) {
            console.log(response)
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('role', response.username);
            setUser({
                username: response.username,
                role: response.username,
                token: response.access_token,
            });
        } else {
            console.log(error)
        }
    }, [response]);

    const login = async (username: string, password: string) => {
        await fetchData('POST', LOGIN_URL, { username: username, password: password }, headers)
    };

    // Logout updates the user data to default
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setUser({
            username: undefined,
            role: undefined,
            token: undefined,
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

