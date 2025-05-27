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
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(trainer => (
                    <tr key={trainer.id}>
                        <td>{trainer.id}</td>
                        <td>{trainer.name}</td>
                        <td>{trainer.email || '—'}</td>
                        <td>{trainer.phone || '—'}</td>
                        <td>
                            <span className="badge badge-specialization">
                                {trainer.specialization}
                            </span>
                        </td>
                        <td>{trainer.experience} years</td>
                        <td>
                            <div className="actions">
                                <button
                                    className="btn btn-edit"
                                    onClick={() => onEdit(trainer)}
                                >
                                    <FiEdit2 className="btn-icon" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    className="btn btn-delete"
                                    onClick={() => handleDelete(trainer)}
                                >
                                    <FiTrash2 className="btn-icon" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
