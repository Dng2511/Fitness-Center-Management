import { useEffect, useState } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import styles from './Room.module.css';
import EquipmentForm from './EquipmentForm';
import { getEquipmentsByRoom } from '../../services/Api/room';
import { deleteEquipment } from '../../services/Api/equipment';

export default function RoomDetails({ room, onClose, onUpdateRoom}) {
    const [showEquipmentForm, setShowEquipmentForm] = useState(false);
    const [equipments, setEquipments] = useState([]);

    useEffect(() => {
        getEquipmentsByRoom(room.id).then(({data}) => setEquipments(data))
    }, [room])


    if (!room) return null;

    const handleStatusToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newStatus = room.status === 'ACTIVE' ? 'MAINTENANCE' : 'ACTIVE';
        const updatedRoom = {
            ...room,
            status: newStatus
        };
        onUpdateRoom(updatedRoom);
    };

    const handleRemoveEquipment = async (equipmentId, e) => {
        e.preventDefault();
        deleteEquipment(equipmentId);
        setEquipments(prev => prev.filter(item => item.id !== equipmentId))

    };

    const openEquipmentForm = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setShowEquipmentForm(true);
    };

    const closeEquipmentForm = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setShowEquipmentForm(false);
    };

    return (
        <div className={styles.modalOverlay} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Room Details</h2>
                    <button
                        className={styles.closeBtn}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClose();
                        }}
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <div className={styles.detailsContent}>
                    <div className={styles.detailsSection}>
                        <h3>Basic Information</h3>
                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Room Name</span>
                                <span className={styles.detailValue}>{room.room_name}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Type</span>
                                <span className={styles.detailValue}>{room.type}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Status</span>
                                <button
                                    className={`${styles.statusBadge} ${styles[room.status.toLowerCase()]} ${styles.clickable}`}
                                    onClick={handleStatusToggle}
                                    title={`Click to change status to ${room.status === 'ACTIVE' ? 'MAINTENANCE' : 'ACTIVE'}`}
                                >
                                    {room.status}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.detailsSection}>
                        <div className={styles.sectionHeader}>
                            <h3>Equipment List</h3>
                            {/* <button
                                className={`${styles.btn} ${styles.btnPrimary}`}
                                onClick={openEquipmentForm}
                            >
                                <FiPlus /> Add Equipment
                            </button> */}
                        </div>
                        <div className={styles.equipmentDetailsList}>
                            {equipments && equipments.length > 0 ? (
                                equipments.map(item => (
                                    <div key={item.id} className={styles.equipmentDetailsItem}>
                                        <div className={styles.equipmentDetailsHeader}>
                                            <div className={styles.equipmentHeaderLeft}>
                                                <span className={styles.equipmentId}>ID: {item.id}</span>
                                                <h4>{item.equipment_name}</h4>
                                            </div>
                                            <div className={styles.equipmentActions}>
                                                <button
                                                    className={`${styles.btn} ${styles.btnDelete}`}
                                                    onClick={(e) => handleRemoveEquipment(item.id, e)}
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.noEquipment}>No equipment available in this room</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <button
                        className={`${styles.btn} ${styles.btnSecondary}`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClose();
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>

            {showEquipmentForm && (
                <EquipmentForm
                    onClose={closeEquipmentForm}
                />
            )}
        </div>
    );
} 