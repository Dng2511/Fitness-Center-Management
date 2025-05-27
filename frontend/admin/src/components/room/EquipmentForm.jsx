import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './EquipmentForm.module.css';

export default function EquipmentForm({ initialData, onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        toolId: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                toolId: initialData.toolId || ''
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.toolId.trim()) newErrors.toolId = 'Tool ID is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                id: initialData?.id || Date.now(),
                ...formData,
                quantity: 1
            });
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{initialData ? 'Edit' : 'Add'} Equipment</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="toolId">Tool ID</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="toolId"
                            name="toolId"
                            value={formData.toolId}
                            onChange={handleChange}
                            placeholder="Enter tool ID"
                        />
                        {errors.toolId && <div className={styles.error}>{errors.toolId}</div>}
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="button"
                            className={`${styles.btn} ${styles.btnSecondary}`}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`${styles.btn} ${styles.btnPrimary}`}
                        >
                            {initialData ? 'Update' : 'Add'} Equipment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 