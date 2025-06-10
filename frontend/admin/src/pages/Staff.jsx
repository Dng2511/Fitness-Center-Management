import { FiPlus, FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import StaffTable from '../components/staff/StaffTable';
import StaffForm from '../components/staff/StaffForm';
import { createStaff, getStaffs } from '../services/Api/staff';
import Pagination from '../components/pagination';

export default function Staff() {
    const [staff, setStaff] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingStaff, setEditingStaff] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getStaffs({
            params: {
                page: page
            }
        }).then(({ data }) => {
            setStaff(data.content);
            setTotalPages(data.totalPages);
        })
    }, [page])

    useEffect(() => {
        getStaffs({
            params: {
                value: searchQuery,
                page: 1
            }
        }).then(({ data }) => {
            setStaff(data.content);
            setPage(1);
            setTotalPages(data.totalPages);
        })
    }, [searchQuery])

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePrevPage = () => {
        setPage(prev => prev - 1);
    }

    const handleNextPage = () => {
        setPage(prev => prev + 1);
    }

    const handleAddStaff = () => {
        setEditingStaff(null);
        setShowForm(true);
    };

    const handleEdit = (staff) => {
        setEditingStaff(staff);
        setShowForm(true);
    };

    const handleDelete = async (staffId) => {
        try {
            setStaff(staff.filter(t => t.id !== staffId));
        } catch (err) {
            setError('Failed to delete staff');
            console.error(err);
        }
    };

    const handleSubmit = async ({ formData }) => {
        console.log(formData)
        await createStaff(formData);
        setShowForm(false);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Staff Management</h1>
                <button className="btn btn-primary" onClick={handleAddStaff}>
                    <FiPlus /> Add Staff
                </button>
            </div>

            <div className="search-bar">
                <FiSearch />
                <input
                    type="text"
                    placeholder="Search staffs..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="card">
                {staff.length === 0 ? (
                    <p className="text-center text-gray-500">No staffs found</p>
                ) : (
                    <StaffTable
                        data={staff}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {showForm && (
                <StaffForm
                    initialData={editingStaff}
                    onSubmit={handleSubmit}
                    onClose={() => setShowForm(false)}
                />
            )}

            <Pagination
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                totalPages={totalPages}
                page={page}
            />
        </div>
    );
}
