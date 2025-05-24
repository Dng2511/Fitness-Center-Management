import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for doesn't exist or has been moved.</p>
                <Link to="/" className="btn btn-primary">
                    <FiHome /> Return to Home
                </Link>
            </div>
        </div>
    )
}