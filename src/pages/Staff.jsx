import { FiPlus, FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import StaffTable from '../components/staff/StaffTable'

export default function Staff() {
    const [staffMembers, setStaffMembers] = useState([])

    useEffect(() => {
        // fetch('/api/staff')
        //     .then(res => res.json())
        //     .then(data => setStaffMembers(data))
    }, [])

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Staff Management</h1>
                <button className="btn btn-primary">
                    <FiPlus /> Add Staff
                </button>
            </div>

            <div className="search-bar">
                <FiSearch />
                <input type="text" placeholder="Search staff..." />
            </div>

            <div className="card">
                <StaffTable data={staffMembers} />
            </div>
        </div>
    )
}
