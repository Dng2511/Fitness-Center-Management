import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function PackageTable({ data, onEdit, onDelete }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Package Name</th>
                    <th>Type</th>
                    <th>Price (VNĐ)</th>
                    <th>Duration Days</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(pkg => (
                    <tr key={pkg.id}>
                        <td>{pkg.id}</td>
                        <td>{pkg.package_name}</td>
                        <td>
                            <span className="badge">
                                {pkg.type}
                            </span>
                        </td>
                        <td>{pkg.price.toLocaleString()}</td>
                        <td>{pkg.duration} days</td>
                        <td>
                            <div className="btn-group">
                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(pkg)}
                                    title="Edit package"
                                >
                                    <FiEdit2 />
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => onDelete(pkg.id)}
                                    title="Delete package"
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
