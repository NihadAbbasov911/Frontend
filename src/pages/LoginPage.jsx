import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './AuthPages.css';

export default function LoginPage() {
    const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await loginApi(form);
            login(res.data.token);
            toast.success(res.data.message || 'Uğurla daxil oldunuz!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || err.response?.data || 'Giriş uğursuz oldu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page page">
            <div className="auth-container glass-card">
                <div className="auth-header">
                    <h1>⚡ Giriş</h1>
                    <p>Hesabınıza daxil olun</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>İstifadəçi adı və ya E-mail</label>
                        <input type="text" value={form.usernameOrEmail}
                            onChange={e => setForm({ ...form, usernameOrEmail: e.target.value })}
                            placeholder="İstifadəçi adınız və ya e-mail" required />
                    </div>
                    <div className="form-group">
                        <label>Şifrə</label>
                        <input type="password" value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            placeholder="Şifrəniz" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Giriş edilir...' : 'Daxil Ol'}
                    </button>
                </form>
                <div className="auth-links">
                    <Link to="/forgot-password">Şifrəni unutdunuz?</Link>
                    <span>Hesabınız yoxdur? <Link to="/register">Qeydiyyat</Link></span>
                </div>
            </div>
        </div>
    );
}
