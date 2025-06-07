import { useState, useEffect } from 'react'
import { FiCheck, FiX } from 'react-icons/fi'

export default function PackageForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        package_name: '',
        type: 'Access Package',
        price: 0,
        duration: 1
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            onCancel();
        } catch (error) {
            console.error('Error submitting package:', error);
            alert('Failed to save package. Please try again.');
        }
    };

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
                                name="package_name"
                                value={formData.package_name}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="form-control"
                            >
                                <option value="Access Package">Access Package</option>
                                <option value="Personal Training">Personal Training</option>
                                <option value="Group Class Package">Group Class Package</option>

                            </select>
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
                                        name="duration"
                                        value={formData.duration}
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