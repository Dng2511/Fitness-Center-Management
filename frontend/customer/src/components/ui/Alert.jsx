import { useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';
import './Alert.css';

const Alert = ({ type = 'success', message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`alert-overlay ${isVisible ? 'show' : ''}`}>
            <div className={`alert ${type}`}>
                <div className="alert-icon">
                    {type === 'success' ? (
                        <FiCheckCircle size={24} />
                    ) : (
                        <FiXCircle size={24} />
                    )}
                </div>
                <div className="alert-content">
                    <p className="alert-message">{message}</p>
                </div>
                <button className="alert-close" onClick={onClose}>
                    <FiX size={20} />
                </button>
            </div>
        </div>
    );
};

export default Alert; 