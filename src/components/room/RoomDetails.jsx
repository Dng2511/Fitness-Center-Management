import { useState } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import styles from './Room.module.css';
import EquipmentForm from './EquipmentForm';

export default function RoomDetails({ room, onClose, onUpdateRoom, equipmentList, onAddEquipment }) {
    const [showEquipmentForm, setShowEquipmentForm] = useState(false);

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

    const handleAddEquipment = (newEquipment) => {
        // Add the equipment to the room
        const updatedRoom = {
            ...room,
            equipment: [
                ...(room.equipment || []),
                {
                    id: Date.now(),
                    toolId: newEquipment.toolId
                }
            ]
        };
        onUpdateRoom(updatedRoom);
        setShowEquipmentForm(false);
    };

    const handleRemoveEquipment = (equipmentId, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!room.equipment) return;

        const updatedRoom = {
            ...room,
            equipment: room.equipment.filter(item => item.id !== equipmentId)
        };
        onUpdateRoom(updatedRoom);
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
                                <span className={styles.detailValue}>{room.name}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Capacity</span>
                                <span className={styles.detailValue}>{room.quantity} people</span>
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
                            <button
                                className={`${styles.btn} ${styles.btnPrimary}`}
                                onClick={openEquipmentForm}
                            >
                                <FiPlus /> Add Equipment
                            </button>
                        </div>
                        <div className={styles.equipmentDetailsList}>
                            {room.equipment && room.equipment.length > 0 ? (
                                room.equipment.map(item => (
                                    <div key={item.id} className={styles.equipmentDetailsItem}>
                                        <div className={styles.equipmentDetailsHeader}>
                                            <div className={styles.equipmentHeaderLeft}>
                                                <span className={styles.equipmentId}>Tool ID: {item.toolId}</span>
                                                <h4>Equipment {item.id}</h4>
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
                    onSubmit={handleAddEquipment}
                    onClose={closeEquipmentForm}
                />
            )}
        </div>
    );
} 