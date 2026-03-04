import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authApi';
import { toast } from 'react-toastify';
import './AuthPages.css';

export default function RegisterPage() {
    const [form, setForm] = useState({ fullName: '', username: '', email: '', password: '', passwordConfirm: '', phoneNumber: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.passwordConfirm) {
            toast.error('Şifrələr uyğun gəlmir!');
            return;
        }
        setLoading(true);
        try {
            const res = await register(form);
            toast.success(res.data.message || 'Qeydiyyat uğurlu! E-mailinizi yoxlayın.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || err.response?.data || 'Qeydiyyat uğursuz oldu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page page">
            <div className="auth-container glass-card">
                <div className="auth-header">
                    <h1>🚀 Qeydiyyat</h1>
                    <p>Yeni hesab yaradın</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Ad Soyad</label>
                            <input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Ad Soyad" required />
                        </div>
                        <div className="form-group">
                            <label>İstifadəçi adı</label>
                            <input value={form.username} onChange={e => set('username', e.target.value)} placeholder="username" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" required />
                    </div>
                    <div className="form-group">
                        <label>Telefon</label>
                        <input value={form.phoneNumber} onChange={e => set('phoneNumber', e.target.value)} placeholder="+994 XX XXX XX XX" required />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Şifrə</label>
                            <input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Minimum 6 simvol" required />
                        </div>
                        <div className="form-group">
                            <label>Şifrə Təkrar</label>
                            <input type="password" value={form.passwordConfirm} onChange={e => set('passwordConfirm', e.target.value)} placeholder="Şifrəni təkrarlayın" required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Qeydiyyat edilir...' : 'Qeydiyyatdan Keç'}
                    </button>
                </form>
                <div className="auth-links">
                    <span>Hesabınız var? <Link to="/login">Daxil olun</Link></span>
                </div>
            </div>
        </div>
    );
}
