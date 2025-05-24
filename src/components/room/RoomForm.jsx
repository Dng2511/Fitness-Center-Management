import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './Room.module.css';

export default function RoomForm({ initialData, onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        status: 'ACTIVE'
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                quantity: initialData.quantity,
                status: initialData.status
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.quantity) newErrors.quantity = 'Quantity is required';
        if (formData.quantity < 0) newErrors.quantity = 'Quantity must be positive';
        if (!formData.status) newErrors.status = 'Status is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? parseInt(value) || '' : value
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
                ...formData,
                id: initialData?.id,
                equipment: initialData?.equipment || []
            });
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{initialData?.id ? 'Edit' : 'Add'} Room</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">Room Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter room name"
                        />
                        {errors.name && <div className={styles.error}>{errors.name}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="quantity">Capacity</label>
                        <input
                            className={styles.input}
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="0"
                            placeholder="Enter room capacity"
                        />
                        {errors.quantity && <div className={styles.error}>{errors.quantity}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="status">Status</label>
                        <select
                            className={styles.select}
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="ACTIVE">Active</option>
                            <option value="MAINTENANCE">Maintenance</option>
                        </select>
                        {errors.status && <div className={styles.error}>{errors.status}</div>}
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
                            {initialData?.id ? 'Update' : 'Add'} Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 