import { FiSearch, FiPlus } from 'react-icons/fi'
import React from 'react'
import EquipmentTable from '../components/equipment/EquipmentTable'
import EquipmentForm from '../components/equipment/EquipmentForm'
import { createEquipment, deleteEquipment, getEquipments, updateEquipment } from '../services/Api/equipment'
import Pagination from '../components/pagination'

export default function Equipment() {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [showForm, setShowForm] = React.useState(false)
    const [equipments, setEquipments] = React.useState([])
    const [totalPages, setTotalPages] = React.useState(1)
    const [page, setPage] = React.useState(1)

    React.useEffect(() => {
        getEquipments({ params: { page } }).then(({ data }) => {
            setEquipments(data.content)
            setTotalPages(data.totalPages)
        })
    }, [page, showForm])

    React.useEffect(() => {
        getEquipments({
            params: {
                value: searchQuery,
                page: 1
            }
        }).then(({ data }) => {
            setEquipments(data.content)
            setPage(1)
            setTotalPages(data.totalPages)
        })
    }, [searchQuery])

    const handleSearch = (event) => {
        setSearchQuery(event.target.value)
    }

    const handlePrevPage = () => {
        setPage(prev => prev - 1)
    }

    const handleNextPage = () => {
        setPage(prev => prev + 1)
    }

    const handleDelete = (id) => {
        try {
            deleteEquipment(id)
            setEquipments(prev =>
                prev.filter(equipment => equipment.id !== id)
            )
        } catch (err) {
            console.log(err)
        }
    }

    const onAddEquipment = async (data) => {
        try {
            await createEquipment(data);
            setShowForm(false);
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeStatus = (item) => {
        const newStatus = item.status === 'ACTIVE' ? 'MAINTENANCE' : 'ACTIVE';

        updateEquipment(item.id, { ...item, status: newStatus });
        setEquipments((prev) =>
            prev.map((equipment) =>
                equipment.id === item.id
                    ? {
                        ...equipment,
                        status: equipment.status === 'ACTIVE' ? 'MAINTENANCE' : 'ACTIVE',
                    }
                    : equipment
            )
        );
        setShowForm(false);
    };


    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Fitness Equipment</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    <FiPlus /> Add Equipment
                </button>
            </div>

            <div className="search-bar">
                <FiSearch />
                <input
                    type="text"
                    placeholder="Search by name or tool ID..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div className="card">
                {equipments.length === 0 ? (
                    <p className="text-center text-gray-500">No equipment found</p>
                ) : (
                    <EquipmentTable
                        data={equipments}
                        onDelete={handleDelete}
                        onChangeStatus={onChangeStatus}
                    />
                )}
            </div>

            {showForm && (
                <EquipmentForm
                    onSubmit={onAddEquipment}
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
    )
}
