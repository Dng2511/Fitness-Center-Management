import { useState, useEffect } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import styles from './TrainerForm.module.css';


export default function TrainerForm({ initialData, onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        phone_number: '',
        specialty: 'yoga'
    });
    const [errors, setErrors] = useState({});



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


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ formData });
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
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter trainer's email"
                        />
                        {errors.email && <div className={styles.error}>{errors.email}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="phone">password</label>
                        <input
                            className={styles.input}
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="password"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="phone">Phone</label>
                        <input
                            className={styles.input}
                            type="tel"
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="Enter trainer's phone number"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="specialty">specialty</label>
                        <select
                            className={styles.select}
                            id="specialty"
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleChange}
                        >
                            <option value="Yoga">Yoga</option>

                        </select>
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