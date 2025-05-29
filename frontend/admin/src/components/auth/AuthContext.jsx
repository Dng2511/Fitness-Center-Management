import { createContext, useContext, useState, useEffect } from 'react';
import { login } from '../../services/Api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('username') || null);
    console.log(user);


    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    const handleLogin = async (data, navigate) => {
        try {
            console.log(data);
            const response = await login(data);

            const { access_token, refresh_token, username } = response.data;

            // Lưu token vào localStorage
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('username', username);
            setUser(username);

            // Chuyển sang trang dashboard hoặc cập nhật trạng thái đăng nhập
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    const handleRegister = async (data, navigate) => {
        try {
            const response = await register(data);
            if (response.status === 201) {
                alert('Tạo tài khoản thành công!');  // hoặc dùng thông báo đẹp hơn
                setTimeout(() => {
                    navigate('/login');
                }, 5000); // delay 5 giây trước khi chuyển trang
            }
        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        }

    }



    return (
        <AuthContext.Provider value={{ user, setUser, logout, handleLogin, handleRegister }}>
            {children}
        </AuthContext.Provider>
    );
};

const register = async (userData) => {
    try {
        const newUser = await register(userData);
        return newUser;
    } catch (error) {
        throw new Error(error.message || 'Registration failed');
    }
};

const updateUser = async (userData) => {
    try {
        const updatedUser = await userService.updateUser(user.id, userData);
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
    } catch (error) {
        throw new Error(error.message || 'Failed to update profile');
    }
};

const logout = async () => {
    try {
        await logout();
        setUser(null);
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Logout failed:', error);
        // Still clear local state even if server logout fails
        setUser(null);
        localStorage.removeItem('user');
    }
};
