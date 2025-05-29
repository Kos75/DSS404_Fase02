import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ATMSidebar({ active, onNavigate }) {
    const navigate = useNavigate();

    return (
        <div className="bg-dark text-white vh-100 p-3" style={{ width: '250px' }}>
            <h4 className="text-center mb-4">Panel ATM</h4>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <button
                        className={`btn w-100 text-start ${active === 'transactions' ? 'btn-primary' : 'btn-outline-light'}`}
                        onClick={() => onNavigate('transactions')}
                    >
                        Transacciones
                    </button>
                </li>
                <li className="nav-item mb-4">
                    <button
                        className={`btn w-100 text-start ${active === 'history' ? 'btn-primary' : 'btn-outline-light'}`}
                        onClick={() => onNavigate('history')}
                    >
                        Historial
                    </button>
                </li>
                <li className="nav-item mt-auto">
                    <button
                        className="btn btn-outline-warning w-100 text-start"
                        onClick={() => navigate('/client')}
                    >
                        ⬅️ Volver al Panel
                    </button>
                </li>
            </ul>
        </div>
    );
}
