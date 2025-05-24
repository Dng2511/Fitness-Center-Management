import { useState, useEffect } from 'react'
import { FiCheck, FiX } from 'react-icons/fi'

export default function PackageForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        price: '',
        description: '',
        durationDays: ''
    })

    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({ ...prev, ...initialData }))
        }
    }, [initialData])

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <div className="form-modal">
            <form onSubmit={handleSubmit}>
                <h2>{initialData?.id ? 'Edit' : 'Add'} Package</h2>

                <div className="form-content">
                    {/* Basic Information */}
                    <div className="form-section">
                        <h3 className="form-section-title">Basic Information</h3>
                        <div className="form-group">
                            <label>Package Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                            <small className="form-hint">Choose a clear and descriptive name for the package</small>
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <input
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                            <small className="form-hint">Categorize your package for easy identification</small>
                        </div>
                    </div>

                    {/* Pricing and Duration */}
                    <div className="price-duration-section">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Price</label>
                                <div className="price-input">
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="form-control"
                                    />
                                </div>
                                <small className="form-hint">Set a competitive price point</small>
                            </div>

                            <div className="form-group">
                                <label>Duration</label>
                                <div className="duration-input">
                                    <input
                                        type="number"
                                        name="durationDays"
                                        value={formData.durationDays}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        className="form-control"
                                    />
                                </div>
                                <small className="form-hint">Specify the package validity period</small>
                            </div>
                        </div>
                    </div>

                    {/* Package Details */}
                    <div className="form-section">
                        <h3 className="form-section-title">Package Details</h3>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="form-control"
                            />
                            <small className="form-hint">Include key features and any special perks</small>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={onCancel}
                    >
                        <FiX className="btn-icon" />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary btn-with-icon"
                    >
                        <FiCheck className="btn-icon" />
                        {initialData?.id ? 'Update' : 'Add'} Package
                    </button>
                </div>
            </form>
        </div>
    )
} 