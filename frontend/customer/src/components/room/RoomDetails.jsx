import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './Room.module.css';

export default function RoomDetails({ room, onClose, onUpdateRoom }) {
    if (!room) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Room Details</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <FiX size={24} />
                    </button>
                </div>

                <div className={styles.detailsContent}>
                    <div className={styles.detailsSection}>
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
                                <span className={`${styles.statusBadge} ${styles[room.status.toLowerCase()]}`}>
                                    {room.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.detailsSection}>
                        <div className={styles.sectionHeader}>
                            <h3>Equipment List</h3>
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
        </div>
    );
} 