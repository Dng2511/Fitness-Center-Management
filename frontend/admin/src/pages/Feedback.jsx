import React, { useState, useEffect } from 'react';
import { getAllFeedbacks } from '../services/Api/feedback';
import Pagination from '../components/pagination';
import { FiUser, FiStar, FiMessageSquare, FiSearch } from 'react-icons/fi';
import '../styles/Feedback.css';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getAllFeedbacks({
            params: {
                page: page
            }
        }).then(({ data }) => {
            setFeedbacks(data.content);
            setTotalPages(data.totalPages);
        });
    }, [page]);

    useEffect(() => {
        getAllFeedbacks({
            params: {
                value: searchQuery,
                page: 1
            }
        }).then(({ data }) => {
            setFeedbacks(data.content);
            setPage(1);
            setTotalPages(data.totalPages);
        });
    }, [searchQuery]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const getTypeColor = (type) => {
        const colors = {
            STAFF: '#4CAF50',
            TRAINER: '#2196F3',
            ROOM: '#FF9800',
            EQUIPMENT: '#F44336'
        };
        return colors[type] || '#757575';
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    const renderStars = (rating) => {
        return (
            <div className="rating-stars">
                {[...Array(5)].map((_, index) => (
                    <FiStar
                        key={index}
                        className={index < rating ? 'star filled' : 'star'}
                        size={20}
                    />
                ))}
                <span className="rating-value">({rating})</span>
            </div>
        );
    };

    return (
        <div className="feedback-container">
            <div className="page-header">
                <h1 className="page-title">Feedback Management</h1>
                <div className="total-feedbacks">
                    Total Feedbacks: {feedbacks.length}
                </div>
            </div>

            <div className="search-bar">
                <FiSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search feedbacks..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Member</th>
                            <th>Type</th>
                            <th>Target ID</th>
                            <th>Rating</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback.id}>
                                <td>
                                    <div className="member-info">
                                        <div className="avatar">
                                            {getInitials(feedback.member.name)}
                                        </div>
                                        <span>{feedback.member.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <span
                                        className="type-badge"
                                        style={{
                                            backgroundColor: `${getTypeColor(feedback.type)}20`,
                                            color: getTypeColor(feedback.type)
                                        }}
                                    >
                                        {feedback.type}
                                    </span>
                                </td>
                                <td>
                                    <span className="target-id">
                                        #{feedback.targetId}
                                    </span>
                                </td>
                                <td>
                                    {renderStars(feedback.rating)}
                                </td>
                                <td>
                                    <div className="feedback-content">
                                        {feedback.content}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-container">
                <Pagination
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                    totalPages={totalPages}
                    page={page}
                />
            </div>
        </div>
    );
};

export default Feedback; 