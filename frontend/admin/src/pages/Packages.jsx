import { FiPlus, FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import PackageTable from '../components/packages/PackageTable'
import PackageForm from '../components/packages/PackageForm'
import Alert from '../components/ui/Alert'
import { createPackage, delelePackage, editPackage, getPackages } from '../services/Api/package'
import Pagination from '../components/pagination'

export default function Packages() {
    const [packages, setPackages] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [selectedPackage, setSelectedPackage] = useState(null)
    const [alert, setAlert] = useState({ show: false, type: '', message: '' })
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)

    useEffect(() => {
        getPackages({ params: { page } }).then(({ data }) => {
            setPackages(data.content)
            setTotalPages(data.totalPages)
        })
    }, [page])

    useEffect(() => {
        getPackages({
            params: {
                value: searchQuery,
                page: 1
            }
        }).then(({ data }) => {
            setPackages(data.content)
            setPage(1)
            setTotalPages(data.totalPages)
        })
    }, [searchQuery])

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const handlePrevPage = () => {
        setPage(prev => prev - 1)
    }

    const handleNextPage = () => {
        setPage(prev => prev + 1)
    }

    const handleAddPackage = () => {
        setSelectedPackage(null)
        setShowForm(true)
    }

    const handleEditPackage = (pkg) => {
        setSelectedPackage(pkg)
        setShowForm(true)
    }

    const handleSubmit = async (formData) => {
        if (formData.id) {
            await editPackage(formData.id, formData)
        } else {
            await createPackage(formData);
        }
        setShowForm(false)
    }

    const handleDeletePackage = async (id) => {
        await delelePackage(id);
        setPackages(prev => prev.filter(pkg => pkg.id !== id));
    }

    return (
        <div className="page-container">
            <Alert
                isVisible={alert.show}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, show: false })}
            />

            <div className="page-header">
                <h1 className="page-title">Fitness Packages</h1>
                <button className="btn btn-primary" onClick={handleAddPackage}>
                    <FiPlus /> Add Package
                </button>
            </div>

            <div className="search-bar">
                <FiSearch />
                <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {showForm && (
                <div className="modal-overlay">
                    <PackageForm
                        initialData={selectedPackage}
                        onSubmit={handleSubmit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

            <div className="card">
                <PackageTable
                    data={packages}
                    onEdit={handleEditPackage}
                    onDelete={handleDeletePackage}
                />
            </div>

            <Pagination
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                totalPages={totalPages}
                page={page}
            />
        </div>
    )
}
