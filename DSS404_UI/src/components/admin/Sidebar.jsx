import React from 'react';

const navItems = [
    { key: 'employees', icon: '👥', label: 'Empleados' },
    { key: 'products', icon: '💳', label: 'Productos' },
    { key: 'reports', icon: '📊', label: 'Reportes' },
];

export default function Sidebar({ activeSection, setActiveSection }) {
    return (
        <nav className="bg-dark text-white p-3" style={{ width: '250px' }}>
            <div className="text-center border-bottom pb-2 mb-4">
                <h1 className="fs-5">ACOEMPRENDEDORES</h1>
                <h2 className="fs-6 text-secondary">Sistema Financiero</h2>
            </div>
            <ul className="nav flex-column">
                {navItems.map(({ key, icon, label }) => (
                    <li className="nav-item mb-2" key={key}>
                        <button
                            className={`nav-link btn w-100 text-start text-white d-flex align-items-center rounded ${activeSection === key ? 'bg-primary' : ''}`}
                            onClick={() => setActiveSection(key)}
                        >
                            <span className="me-2">{icon}</span>
                            {label}
                        </button>
                    </li>
                ))}
                <li className="nav-item mt-auto">
                    <button className="nav-link btn w-100 text-start text-white d-flex align-items-center rounded">
                        <span className="me-2">🚪</span>Cerrar Sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
}
