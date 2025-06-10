import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './Staff.css';

export default function StaffTable({ data, onEdit, onDelete }) {
    const handleDelete = (staff) => {
        if (window.confirm(`Are you sure you want to delete staff ${staff.name}?`)) {
            onDelete(staff.id);
        }
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(staff => (
                    <tr key={staff.id}>
                        <td>{staff.id}</td>
                        <td>{staff.name}</td>
                        <td>{staff.username || '—'}</td>
                        <td>{staff.phone_number || '—'}</td>
                        <td>
                            <div className="action-buttons">
                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(staff)}
                                >
                                    <FiEdit2 />
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(staff)}
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
