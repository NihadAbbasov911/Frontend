import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('aucto_token'));

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000;
                if (decoded.exp && decoded.exp < now) {
                    logout();
                    return;
                }
                setUser({
                    id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                    email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                    name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
                    roles: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || [],
                });
            } catch {
                logout();
            }
        }
    }, [token]);

    const login = (jwt) => {
        localStorage.setItem('aucto_token', jwt);
        setToken(jwt);
    };

    const logout = () => {
        localStorage.removeItem('aucto_token');
        setToken(null);
        setUser(null);
    };

    const isAdmin = user?.roles?.includes?.('Admin') || user?.roles === 'Admin';

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAdmin, isLoggedIn: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
