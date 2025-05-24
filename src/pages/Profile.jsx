import { useState, useRef } from 'react';
import { useAuth } from '../components/auth/AuthContext';
import { FiCamera, FiSave, FiLoader } from 'react-icons/fi';
import Alert from '../components/ui/Alert';
import '../styles/Profile.css';

export default function Profile() {
    const { user, updateUser } = useAuth();
    const [profileData, setProfileData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        address: user?.address || '',
        phone: user?.phone || '',
        imageUrl: user?.imageUrl || null
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Clear error when user starts typing
        setErrors(prev => ({ ...prev, [name]: '' }));

        if (name === 'phone') {
            // Only allow numbers and limit to 10 digits
            const numbersOnly = value.replace(/[^\d]/g, '').slice(0, 10);
            setProfileData(prev => ({
                ...prev,
                [name]: numbersOnly
            }));
        } else {
            setProfileData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        setIsEditing(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData(prev => ({
                    ...prev,
                    imageUrl: reader.result
                }));
                setIsEditing(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const showNotification = (message, type = 'success') => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const validateForm = () => {
        const newErrors = {};

        if (profileData.phone && !validatePhone(profileData.phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!isEditing) return;

        if (!validateForm()) {
            showNotification('Please fix the errors before saving.', 'error');
            return;
        }

        setIsSaving(true);
        try {
            // Only send the fields that can be updated
            const updateData = {
                address: profileData.address,
                phone: profileData.phone,
                imageUrl: profileData.imageUrl
            };
            await updateUser(updateData);
            showNotification('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            showNotification(error.message || 'Failed to update profile. Please try again.', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="profile-container">
            <Alert
                type={alertType}
                message={alertMessage}
                isVisible={showAlert}
                onClose={() => setShowAlert(false)}
            />

            <div className="profile-header">
                <h1>Your Profile</h1>
            </div>

            <div className="profile-content">
                <div className="profile-image-section">
                    <div className="profile-image-container">
                        {profileData.imageUrl ? (
                            <img
                                src={profileData.imageUrl}
                                alt="Profile"
                                className="profile-image"
                            />
                        ) : (
                            <div className="profile-image-placeholder">
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </div>
                        )}
                        <button
                            className="change-image-button"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <FiCamera />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    {isEditing && (
                        <button
                            className="save-button"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <FiLoader className="spin" /> Saving...
                                </>
                            ) : (
                                <>
                                    <FiSave /> Save Changes
                                </>
                            )}
                        </button>
                    )}
                </div>

                <div className="profile-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={profileData.fullName}
                            className="input readonly"
                            disabled
                            readOnly
                        />
                        <small className="field-note">Name cannot be changed after registration</small>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            className="input readonly"
                            disabled
                            readOnly
                        />
                        <small className="field-note">Email cannot be changed after registration</small>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            name="address"
                            value={profileData.address}
                            onChange={handleChange}
                            className="input textarea"
                            rows="3"
                            placeholder="Enter your address"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                            className={`input ${errors.phone ? 'error' : ''}`}
                            placeholder="Enter your 10-digit phone number"
                            maxLength={10}
                        />
                        {errors.phone && <small className="error-message">{errors.phone}</small>}
                        <small className="field-note">Enter a 10-digit phone number without spaces or special characters</small>
                    </div>
                </div>
            </div>
        </div>
    );
} 