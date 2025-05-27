import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import Alert from '../components/ui/Alert';
import '../styles/Register.css';
import { AuthProvider } from '../components/auth/AuthContext';

export default function Register() {

    const [confirmPassword, setConfirmPassword] = useState("");
    const [data, setFormData] = useState({
        name: '',
        birthday: '',
        phone_number: '',
        username: '',
        password: '',
        address: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (error) setError('');
    };

    const setConfirmPasswordHandle = (e) => {
            setConfirmPassword(e.target.value);
    }

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const validateForm = () => {
        if (!formData.fullName || !formData.dateOfBirth || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShowAlert(false);

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            await AuthProvider.handleRegister(data);
        } catch (err) {
            setError(err.message || 'Registration failed');
            setIsLoading(false);
        }
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="register-container">
            <Alert
                type="success"
                message={alertMessage}
                isVisible={showAlert}
                onClose={() => setShowAlert(false)}
            />
            <div className="register-box">
                <h2 className="register-title">Register</h2>
                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label className="label">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={data.name}
                            onChange={handleChange}
                            className="input"
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={data.birthday}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Phone Number</label>
                        <input
                            type="text"
                            name="fullName"
                            value={data.phone_number}
                            onChange={handleChange}
                            className="input"
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.username}
                            onChange={handleChange}
                            className="input"
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input"
                                required
                                minLength={6}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('password')}
                                className="password-toggle"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="label">Confirm Password</label>
                        <div className="password-input-container">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={setConfirmPasswordHandle}
                                className="input"
                                required
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                className="password-toggle"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Register'}
                    </button>

                    <div className="login-option">
                        Already have an account?
                        <button
                            onClick={handleLoginClick}
                            className="login-link"
                            type="button"
                        >
                            Login here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 