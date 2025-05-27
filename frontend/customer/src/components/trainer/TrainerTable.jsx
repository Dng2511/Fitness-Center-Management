import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './Trainer.css';

export default function TrainerTable({ data }) {
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
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
