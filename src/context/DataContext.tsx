"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface DataContextType {
    isAuthenticated: boolean;
    login: (id: string, pass: string) => boolean;

    logout: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const login = (id: string, pass: string) => {
        // Simple mock validation based on user's code hints
        if (id === '202503410' && pass.length > 0) {
            setIsAuthenticated(true);
            router.push('/dashboard');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        router.push('/login');
    };

    const user = {
        name: "محمد عبد الوهاب",
        id: "202503410",
        role: "student"
    };

    return (
        <DataContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
