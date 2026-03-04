import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './AuthPages.css';

export default function ProfilePage() {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ fullName: user?.name || '', username: '', phoneNumber: '' });
    const [loading, setLoading] = useState(false);

    if (!isLoggedIn) { navigate('/login'); return null; }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await updateProfile(form);
            toast.success(res.data.message || 'Profil yeniləndi!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Xəta baş verdi');
        } finally { setLoading(false); }
    };

    return (
        <div className="auth-page page">
            <div className="auth-container glass-card">
                <div className="auth-header">
                    <h1>👤 Profil</h1>
                    <p>{user?.email}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Ad Soyad</label>
                        <input value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>İstifadəçi Adı</label>
                        <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Telefon</label>
                        <input value={form.phoneNumber} onChange={e => setForm({ ...form, phoneNumber: e.target.value })} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Yenilənir...' : 'Profili Yenilə'}
                    </button>
                </form>
            </div>
        </div>
    );
}
