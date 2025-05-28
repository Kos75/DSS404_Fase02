import React from 'react';

export default function ATMTopBar() {
    return (
        <div className="bg-light border-bottom p-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Simulador de Cajero</h5>
            <div className="d-flex align-items-center">
                <span className="me-2">Usuario: <strong>cajero1</strong></span>
                <button className="btn btn-sm btn-outline-secondary">Cerrar sesión</button>
            </div>
        </div>
    );
}
