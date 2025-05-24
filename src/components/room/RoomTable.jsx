import { FiInfo } from 'react-icons/fi';
import styles from './Room.module.css';

export default function RoomTable({ data, onViewDetails, onUpdateRoom, isBlurred }) {
    const handleStatusToggle = (room) => {
        const newStatus = room.status === 'ACTIVE' ? 'MAINTENANCE' : 'ACTIVE';
        onUpdateRoom({
            ...room,
            status: newStatus
        });
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Capacity</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(room => (
                    <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.name}</td>
                        <td>{room.quantity}</td>
                        <td>
                            <button
                                className={`${styles.statusBadge} ${styles[room.status.toLowerCase()]}`}
                                onClick={() => handleStatusToggle(room)}
                                title={`Click to change status to ${room.status === 'ACTIVE' ? 'MAINTENANCE' : 'ACTIVE'}`}
                            >
                                {room.status}
                            </button>
                        </td>
                        <td>
                            <div className={`${styles.actions} ${isBlurred ? styles.blurred : ''}`}>
                                <button
                                    className={`${styles.btn} ${styles.btnDetails}`}
                                    onClick={() => onViewDetails(room)}
                                >
                                    <FiInfo className={styles.btnIcon} />
                                    <span>Details</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
