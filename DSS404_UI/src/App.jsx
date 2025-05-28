import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import Register from './pages/Register';
import ClientPanel from './pages/ClientPanel';
import Login from './pages/Login';
import ATMDashboard from "./pages/ATMDashboard.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/client" element={<ClientPanel />} />
                <Route path="/client/atm" element={<ATMDashboard/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
