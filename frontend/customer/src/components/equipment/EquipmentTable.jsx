import { FiTrash2 } from 'react-icons/fi';

export default function EquipmentTable({ data }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Tool ID</th>
                    <th>Equipment Name</th>
                    <th>Type</th>
                    <th>Warranty</th>
                    <th>Origin</th>
                    <th>Import Date</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.toolId}>
                        <td>{item.toolId}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.warranty}</td>
                        <td>{item.origin}</td>
                        <td>{new Date(item.importDate).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}