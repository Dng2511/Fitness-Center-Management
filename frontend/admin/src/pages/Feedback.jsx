import React, { useState, useEffect } from 'react';
import { getAllFeedbacks } from '../services/Api/feedback';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Rating,
    Avatar,
    Tooltip,
} from '@mui/material';
import Pagination from '../components/pagination';
import { FiUser, FiStar, FiMessageSquare, FiSearch } from 'react-icons/fi';

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

    return (
        <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
                backgroundColor: 'white',
                p: 3,
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FiMessageSquare size={32} color="#1976d2" />
                    <Typography variant="h4" component="h1" sx={{
                        color: '#1976d2',
                        fontWeight: 'bold'
                    }}>
                        Feedback Management
                    </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    Total Feedbacks: {feedbacks.length}
                </Typography>
            </Box>

            <Box sx={{
                mb: 3,
                backgroundColor: 'white',
                p: 2,
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <FiSearch size={20} color="#666" />
                <input
                    type="text"
                    placeholder="Search feedbacks..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        fontSize: '1rem',
                        padding: '0.5rem'
                    }}
                />
            </Box>

            <TableContainer component={Paper} sx={{
                borderRadius: 2,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                overflow: 'hidden'
            }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1976d2' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Member</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Target ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rating</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Content</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {feedbacks.map((feedback) => (
                            <TableRow
                                key={feedback.id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                        transition: 'background-color 0.3s'
                                    }
                                }}
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{
                                            bgcolor: '#1976d2',
                                            width: 40,
                                            height: 40
                                        }}>
                                            {getInitials(feedback.member.name)}
                                        </Avatar>
                                        <Typography>{feedback.member.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{
                                        display: 'inline-block',
                                        px: 2,
                                        py: 1,
                                        borderRadius: 1,
                                        backgroundColor: `${getTypeColor(feedback.type)}20`,
                                        color: getTypeColor(feedback.type),
                                        fontWeight: 'bold'
                                    }}>
                                        {feedback.type}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{
                                        fontFamily: 'monospace',
                                        backgroundColor: '#f0f0f0',
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 1
                                    }}>
                                        #{feedback.targetId}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title={`${feedback.rating} stars`}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Rating
                                                value={feedback.rating}
                                                readOnly
                                                icon={<FiStar size={24} />}
                                                emptyIcon={<FiStar size={24} />}
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                ({feedback.rating})
                                            </Typography>
                                        </Box>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{
                                        maxWidth: 400,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {feedback.content}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{
                mt: 3,
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'white',
                p: 2,
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <Pagination
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                    totalPages={totalPages}
                    page={page}
                />
            </Box>
        </Box>
    );
};

export default Feedback; 