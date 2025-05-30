import { FiTrash2 } from 'react-icons/fi';

export default function EquipmentTable({ data, onDelete }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Tool ID</th>
                    <th>Equipment Name</th>
                    <th>Warranty</th>
                    <th>Origin</th>
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