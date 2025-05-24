import { useState, useEffect } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import styles from './TrainerForm.module.css';

const SPECIALIZATIONS = [
    "Strength Training",
    "Yoga",
    "Cardio",
    "CrossFit",
    "Pilates",
    "Nutrition",
    "HIIT",
    "Boxing",
    "Swimming"
];

export default function TrainerForm({ initialData, onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specializations: [],
        experience: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            // Convert single specialization to array if needed
            const specializations = initialData.specialization
                ? [initialData.specialization]
                : initialData.specializations || [];
            setFormData({
                ...initialData,
                specializations
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (formData.specializations.length === 0) {
            newErrors.specializations = 'Please select at least one specialization';
        }
        if (!formData.experience) newErrors.experience = 'Experience is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSpecializationToggle = (specialization) => {
        setFormData(prev => {
            const specializations = prev.specializations.includes(specialization)
                ? prev.specializations.filter(s => s !== specialization)
                : [...prev.specializations, specialization];

            return {
                ...prev,
                specializations
            };
        });

        if (errors.specializations) {
            setErrors(prev => ({
                ...prev,
                specializations: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                ...formData,
                // Keep backward compatibility
                specialization: formData.specializations.join(', ')
            });
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{initialData?.id ? 'Edit' : 'Add'} Trainer</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter trainer's name"
                        />
                        {errors.name && <div className={styles.error}>{errors.name}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input
                            className={styles.input}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter trainer's email"
                        />
                        {errors.email && <div className={styles.error}>{errors.email}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="phone">Phone</label>
                        <input
                            className={styles.input}
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter trainer's phone number"
                        />
                        {errors.phone && <div className={styles.error}>{errors.phone}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Specializations</label>
                        <div className={styles.specializationGrid}>
                            {SPECIALIZATIONS.map(specialization => (
                                <div
                                    key={specialization}
                                    className={`${styles.specializationItem} ${formData.specializations.includes(specialization) ? styles.selected : ''
                                        }`}
                                    onClick={() => handleSpecializationToggle(specialization)}
                                >
                                    <div className={styles.checkbox}>
                                        {formData.specializations.includes(specialization) && (
                                            <FiCheck size={16} />
                                        )}
                                    </div>
                                    <span>{specialization}</span>
                                </div>
                            ))}
                        </div>
                        {errors.specializations && (
                            <div className={styles.error}>{errors.specializations}</div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="experience">Experience (years)</label>
                        <input
                            className={styles.input}
                            type="number"
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            min="0"
                            placeholder="Enter years of experience"
                        />
                        {errors.experience && <div className={styles.error}>{errors.experience}</div>}
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="button"
                            className={`${styles.button} ${styles.buttonSecondary}`}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`${styles.button} ${styles.buttonPrimary}`}
                        >
                            {initialData?.id ? 'Update' : 'Add'} Trainer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 