import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './Room.module.css';
import { createRoom } from '../../services/Api/room';


export default function RoomForm({ initialData, onClose }) {
    const [formData, setFormData] = useState({
        room_name: '',
        type: 'GYM',
        status: 'AVAILABLE'
    });
    const [errors, setErrors] = useState({});


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        await createRoom(formData);
        onClose();

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
                        <input className={styles.input}
                            type="text"
                            id="room_name"
                            name="room_name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter room name"
                            required
                        />
                        {errors.name && <div className={styles.error}>{errors.name}</div>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="type">Type</label>
                        <select
                            className={styles.select}
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="GYM">Gym</option>
                            <option value="YOGA">Yoga</option>
                            <option value="CARDIO">Cardio</option>
                            <option value="SWIMMING">Swimming Pool</option>
                            <option value="BOXING">Boxing</option>
                            <option value="DANCE">Dance Studio</option>
                            <option value="SAUNA">Sauna</option>

                        </select>
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
                            <option value="AVAILABLE">Available</option>
                            <option value="MAINTENANCE">Maintenance</option>
                            <option value="CLOSED">CLOSED</option>
                            <option value="FULL">FULL</option>
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