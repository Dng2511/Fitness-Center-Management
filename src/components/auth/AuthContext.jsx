import { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../../services/userService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Check if user is stored in localStorage on component mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('user');
            }
        }
        setIsInitialized(true);
    }, []);

    const login = async (credentials) => {
        try {
            const userData = await userService.verifyCredentials(
                credentials.email,
                credentials.password
            );

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            throw new Error(error.message || 'Invalid email or password');
        }
    };

    const register = async (userData) => {
        try {
            const newUser = await userService.addUser(userData);
            return newUser;
        } catch (error) {
            throw new Error(error.message || 'Registration failed');
        }
    };

    const updateUser = async (userData) => {
        try {
            const updatedUser = await userService.updateUser(userData);
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            throw new Error(error.message || 'Failed to update profile');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Don't render children until we've checked localStorage
    if (!isInitialized) {
        return null;
    }

    const value = {
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}