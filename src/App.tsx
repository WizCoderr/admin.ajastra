import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/admin.route'
import Login from './pages/Login';
import { getToken } from './api';
export default function App() {
    
    const token = getToken();
    return (
        <Routes>
            {token ? (
                <Route path="/*" element={<AdminRoutes />} />
            ) : (
                <Route path="/*" element={<Login />} />
            )}
        </Routes>
    );
}
