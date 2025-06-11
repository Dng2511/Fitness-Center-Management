import { useState, useEffect } from 'react';
import { FiMessageSquare, FiStar } from 'react-icons/fi';
import styles from '../components/dashboard/Dashboard.module.css';
import { getFeedbacks } from '../services/Api/feedback';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await getFeedbacks();
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <FiStar
                key={index}
                className={index < rating ? styles.filledStar : styles.emptyStar}
            />
        ));
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="feedback-page">
            <h1 className="page-title">Customer Feedback</h1>

            <div className={styles['feedback-container']}>
                {feedbacks.length === 0 ? (
                    <div className={styles['no-feedback']}>
                        <FiMessageSquare size={48} />
                        <p>No feedback available</p>
                    </div>
                ) : (
                    <div className={styles['feedback-list']}>
                        {feedbacks.map((feedback) => (
                            <div key={feedback.id} className={styles['feedback-card']}>
                                <div className={styles['feedback-header']}>
                                    <div className={styles['feedback-rating']}>
                                        {renderStars(feedback.rating)}
                                    </div>
                                    <span className={styles['feedback-date']}>
                                        {new Date(feedback.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className={styles['feedback-content']}>
                                    <p>{feedback.content}</p>
                                </div>
                                <div className={styles['feedback-footer']}>
                                    <span className={styles['feedback-author']}>
                                        {feedback.memberName}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feedback; 