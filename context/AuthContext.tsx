import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, name: string) => void;
    register: (email: string, name: string, details?: Partial<User>) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem('medicare_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse user from local storage', error);
                localStorage.removeItem('medicare_user');
            }
        }
    }, []);

    const login = (email: string, name: string) => {
        // Mock login - in a real app this would validate credentials
        // For existing users, we'd fetch their details. 
        // For this mock, if we're "logging in", we might miss details if not passed, 
        // but typically login just needs email/pass. 
        // The implementation here is simple mock.

        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
        };
        setUser(newUser);
        localStorage.setItem('medicare_user', JSON.stringify(newUser));
    };

    const register = (email: string, name: string, details?: Partial<User>) => {
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            ...details
        };
        setUser(newUser);
        localStorage.setItem('medicare_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('medicare_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
