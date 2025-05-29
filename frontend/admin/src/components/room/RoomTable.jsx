import { FiInfo } from 'react-icons/fi';
import styles from './Room.module.css';
import { updateRoom } from '../../services/Api/room';

export default function RoomTable({ data, onViewDetails, isBlurred, onChangeStatus }) {
    


    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(room => (
                    <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.room_name}</td>
                        <td>{room.type}</td>
                        <td>
                            <button
                                className={`${styles.statusBadge} ${styles[room.status.toLowerCase()]}`}
                                onClick={() => onChangeStatus(room)}
                                title={`Click to change status`}
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
