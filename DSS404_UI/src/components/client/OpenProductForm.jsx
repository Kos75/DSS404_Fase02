import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';

export default function OpenProductForm({ onClose, onProductCreated }) {
    const { user } = useAuth();

    const [form, setForm] = useState({
        product_type: '',
        product_name: '',
        balance: '',
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:8000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: user.id,
                product_type: form.product_type,
                product_name: form.product_name,
                balance: parseFloat(form.balance),  
            })
        });

        const text = await res.text();
        console.log("Respuesta del servidor:", text);

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("⚠️ Respuesta no es JSON válido:", text);
            alert("❌ Error del servidor: respuesta no válida");
            return;
        }

        if (res.ok && data.product_id) {
            alert('✅ Producto creado con éxito');
            onProductCreated?.(data);
            onClose?.();
            setForm({ product_type: '', product_name: '', balance: '' });
        } else {
            console.error("⚠️ Error del backend:", data.error || 'desconocido');
            alert(`❌ Error al crear el producto: ${data.error || 'Error desconocido'}`);
        }

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow-sm border"
        >
            <h5 className="mb-4">Abrir Nueva Cuenta</h5>

            <div className="mb-3">
                <label className="form-label">Tipo de Cuenta</label>
                <select
                    className="form-select"
                    name="product_type"
                    value={form.product_type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="corriente">Corriente</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Nombre del Producto</label>
                <input
                    type="text"
                    className="form-control"
                    name="product_name"
                    placeholder="Ej: Cuenta Principal"
                    value={form.product_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Depósito Inicial ($)</label>
                <input
                    type="number"
                    className="form-control"
                    name="balance"
                    min="0"
                    step="0.01"
                    placeholder="Ej: 100.00"
                    value={form.balance}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="d-flex justify-content-end gap-2">
                <button type="submit" className="btn btn-primary">Crear Cuenta</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
        </form>
    );
}
