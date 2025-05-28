import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import ClientPanel from './pages/ClientPanel';
import Login from './pages/Login';
import ATMDashboard from "./pages/ATMDashboard.jsx";
import OpenProductForm from "./pages/OpenProductForm.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
{/*
                <Route path="/register" element={<Register />} />
*/}
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/client" element={<ClientPanel />} />
                <Route path="/client/atm" element={<ATMDashboard/>}/>
                <Route path="/client/open-product" element={<OpenProductForm />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
