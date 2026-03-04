import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/authApi';
import { toast } from 'react-toastify';
import './AuthPages.css';

export default function ResetPasswordPage() {
    const [params] = useSearchParams();
    const [form, setForm] = useState({
        userId: params.get('userId') || '',
        token: params.get('token') || '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.newPassword !== form.confirmPassword) {
            toast.error('Şifrələr uyğun gəlmir!'); return;
        }
        setLoading(true);
        try {
            const res = await resetPassword(form);
            toast.success(res.data.message);
            navigate('/login');
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
                    <h1>🔐 Yeni Şifrə</h1>
                    <p>Yeni şifrənizi təyin edin</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Yeni Şifrə</label>
                        <input type="password" value={form.newPassword} onChange={e => setForm({ ...form, newPassword: e.target.value })} placeholder="Yeni şifrə" required />
                    </div>
                    <div className="form-group">
                        <label>Şifrə Təkrar</label>
                        <input type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} placeholder="Şifrəni təkrarlayın" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Yenilənir...' : 'Şifrəni Yenilə'}
                    </button>
                </form>
            </div>
        </div>
    );
}
