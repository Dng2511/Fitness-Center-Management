import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './Trainer.css';

export default function TrainerTable({ data, onEdit, onDelete }) {
    const handleDelete = (trainer) => {
        if (window.confirm(`Are you sure you want to delete trainer ${trainer.name}?`)) {
            onDelete(trainer.id);
        }
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Phone</th>
                    <th>Specialization</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(trainer => (
                    <tr key={trainer.id}>
                        <td>{trainer.id}</td>
                        <td>{trainer.name}</td>
                        <td>{trainer.username || '—'}</td>
                        <td>{trainer.phone_number || '—'}</td>
                        <td>{trainer.specialization}</td>
                        <td>
                            <div className="action-buttons">
                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(trainer)}
                                >
                                    <FiEdit2 />
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(trainer)}
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
