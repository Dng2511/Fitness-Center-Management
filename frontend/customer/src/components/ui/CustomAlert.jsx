import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import styles from './CustomAlert.module.css'

export default function CustomAlert({ type, title, message, onClose }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={`${styles.modalHeader} ${styles[type]}`}>
                    {type === 'success' ? (
                        <FiCheckCircle className={styles.icon} />
                    ) : (
                        <FiAlertCircle className={styles.icon} />
                    )}
                    <h2>{title}</h2>
                </div>
                <div className={styles.modalBody}>
                    {typeof message === 'string' ? (
                        <p>{message}</p>
                    ) : (
                        message
                    )}
                </div>
                <div className={styles.modalFooter}>
                    <button
                        className={`${styles.button} ${styles[type]}`}
                        onClick={onClose}
                    >
                        {type === 'success' ? 'Continue' : 'Close'}
                    </button>
                </div>
            </div>
        </div>
    )
} 