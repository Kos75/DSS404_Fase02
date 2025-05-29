import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ATMTransactionForm() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        product_id: '',
        type: 'retiro',
        amount: ''
    });

    useEffect(() => {
        if (!user?.id) return;
        const fetchProducts = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/products?client_id=${user.id}`);
                const data = await res.json();

                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    throw new Error("Formato inesperado del backend");
                }
            } catch (err) {
                console.error("❌ Error al cargar productos:", err);
                setMessage("❌ No se pudieron cargar los productos");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!formData.product_id || !formData.amount || isNaN(formData.amount)) {
            setMessage('❌ Por favor, completa todos los campos correctamente.');
            return;
        }

        const payload = {
            client_id: user.id,
            user_id: user.id,
            type: formData.type,
            amount: parseFloat(formData.amount),
            product_id: parseInt(formData.product_id)
        };

        try {
            const res = await fetch('http://localhost:8000/api/atm/transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const resultText = await res.text();
            let result;
            try {
                result = JSON.parse(resultText);
            } catch (err) {
                console.error("⚠️ Respuesta no válida del servidor:", resultText);
                setMessage("❌ Error del servidor: respuesta inválida");
                return;
            }

            if (!res.ok) {
                setMessage(result.error || '❌ Error al procesar la transacción');
            } else {
                setMessage(result.message || '✅ Transacción exitosa');
                setFormData({ product_id: '', type: 'retiro', amount: '' });
            }
        } catch (err) {
            console.error("❌ Error de red:", err);
            setMessage("❌ No se pudo conectar con el servidor");
        }
    };

    return (
        <div className="card shadow-sm p-4">
            <h4 className="mb-3">Registrar Transacción</h4>

            {message && (
                <div className={`alert ${message.includes('❌') ? 'alert-danger' : 'alert-success'}`}>
                    {message}
                </div>
            )}

            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Producto</label>
                        <select
                            name="product_id"
                            className="form-select"
                            value={formData.product_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un producto</option>
                            {Array.isArray(products) && products.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.product_name} (Saldo: ${parseFloat(p.balance).toFixed(2)})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tipo de Transacción</label>
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
                        <label className="form-label">Monto ($)</label>
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

                    <button className="btn btn-primary" type="submit">
                        Procesar Transacción
                    </button>
                </form>
            )}
        </div>
    );
}
