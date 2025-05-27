export default function PackageTable({ data, onEdit, onDelete }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Package Name</th>
                    <th>Type</th>
                    <th>Price (VNĐ)</th>
                    <th>Description</th>
                    <th>Duration Days</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(pkg => (
                    <tr key={pkg.id}>
                        <td>{pkg.id}</td>
                        <td>{pkg.name}</td>
                        <td>
                            <span className="badge">
                                {pkg.type}
                            </span>
                        </td>
                        <td>{pkg.price.toLocaleString()}</td>
                        <td>{pkg.description}</td>
                        <td>{pkg.durationDays} days</td>
                        <td>
                            <div className="btn-group">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => onEdit(pkg)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this package?')) {
                                            onDelete(pkg.id)
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
