import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ATMTransactionForm() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        product_id: '',
        type: 'retiro',
        amount: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`http://localhost:8000/api/products?client_id=${user.id}`);
            const data = await res.json();
            setProducts(data);
        };
        if (user?.id) fetchProducts();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const payload = {
            client_id: user.id,
            user_id: user.id,
            type: formData.type,
            amount: parseFloat(formData.amount),
            product_id: parseInt(formData.product_id)
        };

        const res = await fetch('http://localhost:8000/api/atm/transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await res.json();
        if (!res.ok) {
            setMessage(result.error || 'Error al procesar transacción');
        } else {
            setMessage(result.message || 'Transacción exitosa');
        }
    };

    return (
        <div className="card shadow-sm p-4">
            <h4 className="mb-3">Registrar Transacción</h4>

            {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Producto</label>
                    <select
                        name="product_id"
                        className="form-select"
                        value={formData.product_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un producto</option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.product_name} (Saldo: ${parseFloat(p.balance).toFixed(2)})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label>Tipo de Transacción</label>
                    <select
                        name="type"
                        className="form-select"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="retiro">Retiro</option>
                        <option value="abono">Abono</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Monto ($)</label>
                    <input
                        type="number"
                        name="amount"
                        className="form-control"
                        min={1}
                        step={0.01}
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-primary" type="submit">Procesar Transacción</button>
            </form>
        </div>
    );
}
