import { FiTrash2 } from 'react-icons/fi';
import styles from './EquipmentForm.module.css'

export default function EquipmentTable({ data, onDelete, onChangeStatus }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Tool ID</th>
                    <th>Equipment Name</th>
                    <th>Warranty</th>
                    <th>Origin</th>
                    <th>status</th>
                    <th>Import Date</th>
                    <th>Phòng</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.equipment_name}</td>
                        <td>{item.warranty}</td>
                        <td>{item.origin}</td>
                        <td>
                            <button
                                className={`${styles.statusBadge} ${styles[item.status.toLowerCase()]}`}
                                onClick={() => onChangeStatus(item)}
                                title={`Click to change status`}
                            >
                                {item.status}
                            </button>
                        </td>
                        <td>{new Date(item.importDate).toLocaleDateString()}</td>
                        <td>{item.room.room_name}</td>
                        <td>
                            <button
                                onClick={() => onDelete(item.id)}
                                className="delete-btn"
                                title="Delete equipment"
                            >
                                <FiTrash2 />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}