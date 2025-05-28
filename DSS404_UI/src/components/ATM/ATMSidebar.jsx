import React from 'react';

export default function ATMSidebar({ active, onNavigate }) {
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
                <li className="nav-item">
                    <button
                        className={`btn w-100 text-start ${active === 'history' ? 'btn-primary' : 'btn-outline-light'}`}
                        onClick={() => onNavigate('history')}
                    >
                        Historial
                    </button>
                </li>
            </ul>
        </div>
    );
}
