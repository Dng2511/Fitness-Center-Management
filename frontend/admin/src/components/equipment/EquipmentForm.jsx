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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
                            id="equipment_name"
                            name="equipment_name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter equipment name"
                            required
                        />
                        {errors.name && <div className={styles.error}>{errors.name}</div>}
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