import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMapPin, FiPhone, FiPackage, FiCalendar, FiDollarSign } from 'react-icons/fi'
import CustomAlert from '../ui/CustomAlert'
import styles from './Member.module.css'

export default function MemberForm({ onSubmit, onCancel }) {
    const navigate = useNavigate()
    const [alert, setAlert] = useState(null)
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({

        address: '',
        phone: '',
        package: 'basic',


        paymentMethod: 'transfer',
        startDate: new Date().toISOString().split('T')[0]
    })

    const [step, setStep] = useState(1)
    const totalSteps = 2

    const validatePhone = (phone) => {
        const re = /^[0-9]{10,11}$/
        return re.test(phone.replace(/[-\s]/g, ''))
    }

    const validateAddress = (address) => {
        return address.trim().length >= 5
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))


        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateStep1 = () => {
        const newErrors = {}

        if (!validateAddress(formData.address)) {
            newErrors.address = 'Please enter a valid address (minimum 5 characters)'
        }
        if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number (10-11 digits)'
        }
        if (!formData.package) {
            newErrors.package = 'Please select a membership package'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateStep2 = () => {
        const newErrors = {}

        if (!formData.startDate) {
            newErrors.startDate = 'Please select a start date'
        } else {
            const selectedDate = new Date(formData.startDate)
            const today = new Date()
            if (selectedDate < today) {
                newErrors.startDate = 'Start date cannot be in the past'
            }
        }
        if (!formData.paymentMethod) {
            newErrors.paymentMethod = 'Please select a payment method'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (step < totalSteps) {
            if (validateStep1()) {
                setStep(step + 1)
            }
        } else {
            if (validateStep2()) {
                try {
                    const result = await onSubmit(formData)
                    setAlert({
                        type: 'success',
                        title: 'Welcome to Our Gym!',
                        message: (
                            <div>
                                <p>
                                    <strong>Address:</strong>
                                    <span>{formData.address}</span>
                                </p>
                                <p>
                                    <strong>Package Type:</strong>
                                    <span>{formData.package === 'basic' ? 'Basic Package' :
                                        formData.package === 'premium' ? 'Premium Package' :
                                            'VIP Package'}</span>
                                </p>
                                <p>
                                    <strong>Monthly Fee:</strong>
                                    <span>{formData.package === 'basic' ? '500,000 VND' :
                                        formData.package === 'premium' ? '800,000 VND' :
                                            '1,200,000 VND'}</span>
                                </p>
                                <p>
                                    <strong>Payment Method:</strong>
                                    <span>{formData.paymentMethod === 'transfer' ? 'Bank Transfer' : 'Cash Payment'}</span>
                                </p>
                                <p>Redirecting you to your member profile...</p>
                            </div>
                        ),
                        onClose: () => {
                            setAlert(null)
                            if (result && result.id) {
                                navigate(`/members/${result.id}`)
                            } else {
                                navigate('/members')
                            }
                        }
                    })
                } catch (error) {
                    setAlert({
                        type: 'error',
                        title: 'Registration Failed',
                        message: (
                            <div>
                                <p>
                                    <strong>Error:</strong>
                                    <span>Failed to register member</span>
                                </p>
                                <p>
                                    <strong>Details:</strong>
                                    <span>Please check your information and try again</span>
                                </p>
                                <p>If the problem persists, please contact support.</p>
                            </div>
                        ),
                        onClose: () => setAlert(null)
                    })
                    console.error('Registration error:', error)
                }
            }
        }
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
        } else {
            onCancel()
        }
    }

    const renderStep1 = () => (
        <>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                    <FiMapPin /> Address
                </label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`${styles.formInput} ${errors.address ? styles.inputError : ''}`}
                    placeholder="Enter your address"
                    required
                />
                {errors.address && <div className={styles.errorText}>{errors.address}</div>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                    <FiPhone /> Phone Number
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${styles.formInput} ${errors.phone ? styles.inputError : ''}`}
                    placeholder="Enter your phone number"
                    required
                />
                {errors.phone && <div className={styles.errorText}>{errors.phone}</div>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                    <FiPackage /> Membership Package
                </label>
                <select
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className={`${styles.formSelect} ${errors.package ? styles.inputError : ''}`}
                    required
                >
                    <option value="basic">Basic Package (500,000 VND/month)</option>
                    <option value="premium">Premium Package (800,000 VND/month)</option>
                    <option value="vip">VIP Package (1,200,000 VND/month)</option>
                </select>
                {errors.package && <div className={styles.errorText}>{errors.package}</div>}
            </div>
        </>
    )

    const renderStep2 = () => (
        <>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                    <FiCalendar /> Start Date
                </label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`${styles.formInput} ${errors.startDate ? styles.inputError : ''}`}
                    min={new Date().toISOString().split('T')[0]}
                    required
                />
                {errors.startDate && <div className={styles.errorText}>{errors.startDate}</div>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                    <FiDollarSign /> Payment Method
                </label>
                <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className={`${styles.formSelect} ${errors.paymentMethod ? styles.inputError : ''}`}
                    required
                >
                    <option value="transfer">Bank Transfer</option>
                    <option value="cash">Cash</option>
                </select>
                {errors.paymentMethod && <div className={styles.errorText}>{errors.paymentMethod}</div>}
            </div>

            {formData.paymentMethod === 'transfer' && (
                <div className={styles.bankDetails}>
                    <div className={styles.transferInstructions}>
                        <h4>Transfer Instructions</h4>
                        <div className={styles.bankInfo}>
                            <p><strong>Please transfer to:</strong></p>
                            <p>Bank: TPBank</p>
                            <p>Account Number: tadizb2703</p>
                            <p>Amount:
                                {formData.package === 'basic' && '500,000 VND'}
                                {formData.package === 'premium' && '800,000 VND'}
                                {formData.package === 'vip' && '1,200,000 VND'}
                            </p>
                        </div>
                        <div className={styles.transferNote}>
                            <p><strong>Important:</strong></p>
                            <p>1. Please include your full name in the transfer description</p>
                            <p>2. Take a screenshot of your transfer confirmation</p>
                            <p>3. Show the transfer confirmation at the front desk during your first visit</p>
                        </div>
                    </div>
                </div>
            )}

            {formData.paymentMethod === 'cash' && (
                <div className={styles.cashNotice}>
                    <p>Please prepare the exact amount for your membership package:</p>
                    <p className={styles.amount}>
                        {formData.package === 'basic' && '500,000 VND'}
                        {formData.package === 'premium' && '800,000 VND'}
                        {formData.package === 'vip' && '1,200,000 VND'}
                    </p>
                    <p>Payment will be collected at our front desk during your first visit.</p>
                </div>
            )}
        </>
    )

    const isStep1Valid = () => {
        return formData.address && formData.phone && formData.package
    }

    const isStep2Valid = () => {
        return formData.startDate && formData.paymentMethod
    }

    return (
        <div className={styles.memberCard}>
            {alert && (
                <CustomAlert
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    onClose={alert.onClose}
                />
            )}

            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                    <FiMapPin className={styles.cardIcon} />
                    Membership Registration
                </h3>
            </div>

            <div className={styles.progressBar}>
                <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`}>
                    Basic Information
                </div>
                <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`}>
                    Payment Details
                </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.formContainer}>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}

                <div className={styles.formActions}>
                    <button
                        type="button"
                        onClick={handleBack}
                        className={`${styles.btn} ${styles.btnSecondary}`}
                    >
                        {step === 1 ? 'Cancel' : 'Back'}
                    </button>
                    <button
                        type="submit"
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        disabled={step === 1 ? !isStep1Valid() : !isStep2Valid()}
                    >
                        {step === totalSteps ? 'Complete Registration' : 'Next Step'}
                    </button>
                </div>
            </form>
        </div>
    )
}