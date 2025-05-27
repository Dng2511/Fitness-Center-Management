import { useState, useEffect } from 'react'
import { FiSend, FiUser } from 'react-icons/fi'

export default function Forum() {
    const [comments, setComments] = useState([
        {
            id: 1,
            author: "John Doe",
            content: "Great workout session today! The new equipment is amazing.",
            timestamp: "2024-03-20T10:30:00",
            likes: 5
        },
        {
            id: 2,
            author: "Jane Smith",
            content: "Looking for a workout partner for morning sessions. Anyone interested?",
            timestamp: "2024-03-20T09:15:00",
            likes: 3
        }
    ])
    const [newComment, setNewComment] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        const comment = {
            id: comments.length + 1,
            author: "Current User", // This should be replaced with actual user data
            content: newComment,
            timestamp: new Date().toISOString(),
            likes: 0
        }

        setComments([comment, ...comments])
        setNewComment("")
    }

    return (
        <div className="forum-page">
            <div className="page-header">
                <h1 className="page-title">Member Forum</h1>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit} className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="comment-input"
                        rows="3"
                    />
                    <button type="submit" className="btn btn-primary">
                        <FiSend /> Post
                    </button>
                </form>
            </div>

            <div className="comments-list">
                {comments.map(comment => (
                    <div key={comment.id} className="card comment-card">
                        <div className="comment-header">
                            <div className="comment-author">
                                <FiUser className="author-icon" />
                                <span>{comment.author}</span>
                            </div>
                            <span className="comment-time">
                                {new Date(comment.timestamp).toLocaleString()}
                            </span>
                        </div>
                        <p className="comment-content">{comment.content}</p>
                        <div className="comment-actions">
                            <button className="btn btn-sm btn-secondary">
                                Like ({comment.likes})
                            </button>
                            <button className="btn btn-sm btn-secondary">
                                Reply
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 