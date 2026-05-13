import { Link, useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <main className="notfound-page page-wrapper">
            <div className="notfound-container container">
                <h1 className="notfound-code">4🍽️4</h1>
                <h2>Recipe Not Found</h2>
                <p dir="rtl" lang="ar">عذراً، الصفحة غير موجودة</p>
                <p>I told you this ain’t the menu..</p>
                
                <div className="notfound-actions">
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                        ← Go Back
                    </button>
                    <Link to="/" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}