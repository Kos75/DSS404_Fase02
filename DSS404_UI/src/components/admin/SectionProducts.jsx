import React from 'react';

export default function SectionProducts() {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Gestión de Productos</h3>
                <button className="btn btn-primary">Agregar Producto</button>
            </div>
            <input className="form-control mb-3" placeholder="Buscar producto..." />
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Tipo</th>
                        <th>Número</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Aquí se renderizarán dinámicamente los productos */}
                    </tbody>
                </table>
            </div>
        </>
    );
}
