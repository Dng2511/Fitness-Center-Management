import { FiPlus, FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import PackageTable from '../components/packages/PackageTable'
import PackageForm from '../components/packages/PackageForm'
import Alert from '../components/ui/Alert'
import { createPackage, deletePackage, editPackage, getPackages } from '../services/Api/package'
import Pagination from '../components/ui/Pagination'

export default function Packages() {
    const [packages, setPackages] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [selectedPackage, setSelectedPackage] = useState(null)
    const [alert, setAlert] = useState({ show: false, type: '', message: '' })

    useEffect(() => {
        getPackages(currentPage).then(({ data }) => {
            setPackages(data.content)
            setTotalPages(data.totalPages)
        })
    }, [currentPage, showForm])

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
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
            await createPackage(formData)
        }
        setShowForm(false)
    }

    const handleDeletePackage = async (id) => {
        await deletePackage(id)
        setPackages(prev => prev.filter(pkg => pkg.id !== id))
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const filteredPackages = packages.filter(pkg => {
        const name = pkg.package_name?.toLowerCase() || ''
        const type = pkg.type?.toLowerCase() || ''
        const query = searchQuery.toLowerCase()
        return name.includes(query) || type.includes(query)
    })

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
                {filteredPackages.length === 0 ? (
                    <p className="text-center text-gray-500">No packages found</p>
                ) : (
                    <PackageTable
                        data={filteredPackages}
                        onEdit={handleEditPackage}
                        onDelete={handleDeletePackage}
                    />
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
