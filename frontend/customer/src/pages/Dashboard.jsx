import { useState } from 'react'
import StatCard from '../components/dashboard/StatCard'
import { FiUsers, FiActivity, FiMessageCircle, FiHeart, FiMessageSquare } from 'react-icons/fi'

const Dashboard = ({ equipmentList = [] }) => {
    const [stats] = useState({
        totalMembers: 0,
        totalEquipment: equipmentList.length
    })

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [replyTo, setReplyTo] = useState(null)
    const [replyContent, setReplyContent] = useState("")

    const handleLike = (commentId) => {
        setComments(comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
                    liked: !comment.liked
                }
            }
            return comment
        }))
    }

    const handleReply = (commentId) => {
        setReplyTo(replyTo === commentId ? null : commentId)
        setReplyContent("")
    }

    const submitReply = (commentId) => {
        if (!replyContent.trim()) return

        const newReply = {
            id: Date.now(),
            author: "Current User",
            content: replyContent,
            timestamp: new Date().toISOString()
        }

        setComments(comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, newReply]
                }
            }
            return comment
        }))

        setReplyTo(null)
        setReplyContent("")
    }

    const submitComment = (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        const comment = {
            id: Date.now(),
            author: "Current User",
            content: newComment,
            timestamp: new Date().toISOString(),
            likes: 0,
            liked: false,
            replies: []
        }

        setComments([comment, ...comments])
        setNewComment("")
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1 className="page-title">Welcome to TADIZB Fitness Center</h1>
            </div>

            {/* Stats Section */}
            <section className="stats-section">
                <h2 className="section-title">Overview</h2>
                <div className="stats-grid">
                    <StatCard
                        title="Total Members"
                        value={stats.totalMembers}
                        icon={<FiUsers size={24} />}

                        color="primary"
                    />
                    <StatCard
                        title="Available Equipment"
                        value={stats.totalEquipment}
                        icon={<FiActivity size={24} />}

                        color="success"
                    />
                </div>
            </section>

            {/* Community Forum Section */}
            <section className="forum-section">
                <div className="forum-header">
                    <h2 className="section-title">
                        <FiMessageCircle className="section-icon" />
                        Community Forum
                    </h2>

                </div>

                <div className="forum-content">
                    <form className="comment-form" onSubmit={submitComment}>
                        <textarea
                            className="comment-input"
                            placeholder="Share your thoughts with the community..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                            Post Comment
                        </button>
                    </form>

                    <div className="comments-list">
                        {comments.length === 0 ? (
                            <div className="no-comments">
                                <p>No comments yet. Be the first to start a discussion!</p>
                            </div>
                        ) : (
                            comments.map(comment => (
                                <div key={comment.id} className="comment-card">
                                    <div className="comment-header">
                                        <div className="comment-author">
                                            <div className="author-avatar">
                                                {comment.author[0].toUpperCase()}
                                            </div>
                                            <span className="author-name">{comment.author}</span>
                                        </div>
                                        <span className="comment-time">
                                            {new Date(comment.timestamp).toLocaleString()}
                                        </span>
                                    </div>

                                    <p className="comment-content">{comment.content}</p>

                                    <div className="comment-actions">
                                        <button
                                            className={`action-btn like-btn ${comment.liked ? 'liked' : ''}`}
                                            onClick={() => handleLike(comment.id)}
                                        >
                                            <FiHeart /> {comment.likes}
                                        </button>
                                        <button
                                            className="action-btn reply-btn"
                                            onClick={() => handleReply(comment.id)}
                                        >
                                            <FiMessageSquare /> Reply
                                        </button>
                                    </div>

                                    {replyTo === comment.id && (
                                        <div className="reply-form">
                                            <textarea
                                                className="reply-input"
                                                placeholder="Write a reply..."
                                                value={replyContent}
                                                onChange={(e) => setReplyContent(e.target.value)}
                                            />
                                            <div className="reply-form-actions">
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => setReplyTo(null)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => submitReply(comment.id)}
                                                >
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {comment.replies.length > 0 && (
                                        <div className="replies-section">
                                            {comment.replies.map(reply => (
                                                <div key={reply.id} className="reply-card">
                                                    <div className="reply-header">
                                                        <div className="reply-author">
                                                            <div className="author-avatar">
                                                                {reply.author[0].toUpperCase()}
                                                            </div>
                                                            <span>{reply.author}</span>
                                                        </div>
                                                        <span className="reply-time">
                                                            {new Date(reply.timestamp).toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <p className="reply-content">{reply.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard
