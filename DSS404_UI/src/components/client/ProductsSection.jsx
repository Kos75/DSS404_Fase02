import React, { useState } from 'react';
import OpenProductForm from './OpenProductForm';

export default function ProductsSection() {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Mis Productos</h3>
                <button className="btn btn-success" onClick={() => setShowForm(true)}>
                    + Abrir Cuenta
                </button>
            </div>

            {showForm && (
                <div className="mb-4">
                    <OpenProductForm onClose={() => setShowForm(false)} />
                </div>
            )}

            <div className="row g-4">
                {['Cuentas', 'Tarjetas', 'Préstamos', 'Seguros'].map((category, idx) => (
                    <div className="col-12" key={idx}>
                        <div className="bg-light rounded p-3 shadow-sm">
                            <h5 className="mb-3">{category}</h5>
                            <div className="row g-3">
                                {/* Aquí se renderizan las tarjetas del producto */}
                                <div className="col-md-4">
                                    <div className="card p-3 shadow-sm">
                                        <h6 className="text-primary">Producto Demo</h6>
                                        <p className="text-muted small">Balance: $1,000.00</p>
                                        <span className="badge bg-success">Activo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
