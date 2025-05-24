export default function StaffTable({ data }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Speciality</th>
                    <th>Experience (Years)</th>
                </tr>
            </thead>
            <tbody>
                {data.map(staff => (
                    <tr key={staff.id}>
                        <td>{staff.id}</td>
                        <td>{staff.name}</td>
                        <td>{staff.email || '—'}</td>
                        <td>{staff.phone || '—'}</td>
                        <td>{staff.specialty}</td>
                        <td>{staff.experience_years}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

