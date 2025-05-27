import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './EquipmentForm.module.css';

export default function EquipmentForm({ onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        toolId: '',
        warranty: '',
        origin: '',
        importDate: '',
        type: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Equipment name is required';
        }
        if (!formData.toolId.trim()) {
            newErrors.toolId = 'Tool ID is required';
        }
        if (!formData.warranty.trim()) {
            newErrors.warranty = 'Warranty information is required';
        }
        if (!formData.origin.trim()) {
            newErrors.origin = 'Origin information is required';
        }
        if (!formData.importDate) {
            newErrors.importDate = 'Import date is required';
        }
        if (!formData.type) {
            newErrors.type = 'Equipment type is required';
        }
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
                tools: [{
                    toolId: formData.toolId,
                    warranty: formData.warranty,
                    origin: formData.origin,
                    importDate: formData.importDate,
                    type: formData.type
                }],
                name: formData.name
            });
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Add Equipment</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">Equipment Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter equipment name"
                        />
                        {errors.name && <div className={styles.error}>{errors.name}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="type">Equipment Type</label>
                        <select
                            className={styles.input}
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="">Select equipment type</option>
                            <option value="Cardio">Cardio</option>
                            <option value="Strength">Strength</option>
                            <option value="Free Weights">Free Weights</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.type && <div className={styles.error}>{errors.type}</div>}
                    </div>

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

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="warranty">Warranty</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="warranty"
                            name="warranty"
                            value={formData.warranty}
                            onChange={handleChange}
                            placeholder="Enter warranty information"
                        />
                        {errors.warranty && <div className={styles.error}>{errors.warranty}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="origin">Origin</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="origin"
                            name="origin"
                            value={formData.origin}
                            onChange={handleChange}
                            placeholder="Enter origin information"
                        />
                        {errors.origin && <div className={styles.error}>{errors.origin}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="importDate">Import Date</label>
                        <input
                            className={styles.input}
                            type="date"
                            id="importDate"
                            name="importDate"
                            value={formData.importDate}
                            onChange={handleChange}
                        />
                        {errors.importDate && <div className={styles.error}>{errors.importDate}</div>}
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
                            Add Equipment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 