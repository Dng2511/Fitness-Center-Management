import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiLock, FiMail } from 'react-icons/fi';
import '../styles/Login.css';
import { AuthContext } from '../components/auth/AuthContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { handleLogin } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!username || !password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        try {
            const data = {
                username,
                password
            };

            await handleLogin(data, navigate);
        } catch (err) {
            setError(err.message || 'Invalid email or password');
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label className="label">Username</label>
                        <div className="input-with-icon">
                            <FiUser className="input-icon" />
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="label">Password</label>
                        <div className="input-with-icon">
                            <FiLock className="input-icon" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                                required
                            />
                        </div>
                    </div>

                    <div className="forgot-password">
                        <Link to="/forgot-password" className="forgot-password-link">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
