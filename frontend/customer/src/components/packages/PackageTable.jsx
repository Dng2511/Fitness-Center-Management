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
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
