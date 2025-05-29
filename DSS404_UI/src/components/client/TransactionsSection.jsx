import React, {useEffect, useState} from 'react';
import { useAuth } from '../../context/AuthContext';


export default function TransactionsSection() {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user?.id) return;

        const fetchHistory = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/atm/history?client_id=${user.id}`);
                const data = await res.json();

                if (Array.isArray(data)) {
                    setTransactions(data);
                } else if (Array.isArray(data.transactions)) {
                    setTransactions(data.transactions);
                } else {
                    throw new Error('Formato de datos inesperado');
                }
            } catch (err) {
                console.error("❌ Error al cargar historial:", err);
                setError('Error al cargar historial de transacciones');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user]);

    return (
        <div className="card shadow-sm p-4">
            <h4 className="mb-3">Historial de Transacciones</h4>

            {loading && <p>Cargando...</p>}
            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && (
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
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center text-muted">
                                    No hay transacciones aún.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((t, idx) => (
                                <tr key={idx}>
                                    <td>{t.date || t.created_at || '—'}</td>
                                    <td>{t.type}</td>
                                    <td>${parseFloat(t.amount).toFixed(2)}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
