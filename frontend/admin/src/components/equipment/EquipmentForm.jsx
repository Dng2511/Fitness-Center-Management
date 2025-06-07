import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './EquipmentForm.module.css';
import { getRooms } from '../../services/Api/room';
import { createEquipment } from '../../services/Api/equipment';

export default function EquipmentForm({ onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        equipment_name: '',
        warranty: '',
        origin: '',
        import_date: new Date().toISOString().slice(0, 10),
        status: 'ACTIVE',
        room_id: '',
    });

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getRooms().then(({ data }) => {
            setRooms(data),
                setFormData(prev => ({
                    ...prev,
                    room_id: data[0]?.id || ''
                }));

        })
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEquipment(formData);
            onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error creating equipment:', error);
            alert('Failed to create equipment. Please try again.');
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
                        <label className={styles.label} htmlFor="equipment_name">Equipment Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="equipment_name"
                            name="equipment_name"
                            value={formData.equipment_name}
                            onChange={handleChange}
                            placeholder="Enter equipment name"
                            required
                        />
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
                            required
                        />
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
                            required
                        />
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
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="room">Room</label>
                        <select
                            className={styles.select}
                            id="room_id"
                            name="room_id"
                            value={formData.room_id}
                            onChange={handleChange}
                        >
                            {rooms.map((item) => (
                                <option value={item.id}>{item.room_name}</option>
                            ))}

                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="import_date">Import Date</label>
                        <input
                            className={styles.input}
                            type="date"
                            id="import_date"
                            name="import_date"
                            value={formData.import_date}
                            onChange={handleChange}
                            required
                        />
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