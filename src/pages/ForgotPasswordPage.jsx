import { useState } from 'react';
import { forgotPassword } from '../api/authApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './AuthPages.css';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await forgotPassword({ email });
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Xəta baş verdi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page page">
            <div className="auth-container glass-card">
                <div className="auth-header">
                    <h1>🔒 Şifrəni Sıfırla</h1>
                    <p>E-mail ünvanınızı daxil edin</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Göndərilir...' : 'Link Göndər'}
                    </button>
                </form>
                <div className="auth-links">
                    <Link to="/login">← Girişə qayıt</Link>
                </div>
            </div>
        </div>
    );
}
