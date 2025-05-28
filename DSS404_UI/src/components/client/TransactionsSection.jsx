import React from 'react';

export default function TransactionsSection() {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Historial de Transacciones</h3>
            </div>

            <input type="text" className="form-control mb-3" placeholder="Buscar transacción..." />

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-light">
                    <tr>
                        <th>Fecha</th>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Monto</th>
                        <th>Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Filas dinámicas */}
                    <tr>
                        <td>2024-05-01</td>
                        <td>Cuenta Ahorros</td>
                        <td>Depósito</td>
                        <td>$500</td>
                        <td><span className="badge bg-success">Completado</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
