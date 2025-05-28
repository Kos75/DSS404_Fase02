import React from 'react';

export default function ATMTransactionHistory() {
    const dummyData = [
        { fecha: '2024-05-25', tipo: 'Abono', monto: 50.0 },
        { fecha: '2024-05-24', tipo: 'Retiro', monto: 20.0 },
    ];

    return (
        <div className="card shadow-sm p-4">
            <h4 className="mb-3">Historial de Transacciones</h4>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Tipo</th>
                        <th>Monto ($)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dummyData.map((t, idx) => (
                        <tr key={idx}>
                            <td>{t.fecha}</td>
                            <td>{t.tipo}</td>
                            <td>${t.monto.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
