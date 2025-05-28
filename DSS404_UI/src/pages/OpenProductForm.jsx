import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';

export default function OpenProductForm() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        product_type: '',
        product_name: '',
        balance: '',
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.id) {
            alert("Usuario no autenticado.");
            return;
        }

        const payload = {
            client_id: user.id,
            type: form.product_type,
            name: form.product_name,
            balance: parseFloat(form.balance),
        };

        console.log("Payload a enviar:", payload);

        try {
            const res = await fetch('http://localhost:8000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            const text = await res.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch (err) {
                console.error("Respuesta inesperada del servidor:", text);
                alert("Error interno del servidor (respuesta no válida)");
                return;
            }

            if (res.ok && data.product_id) {
                alert('Producto creado con éxito ✅');
                setForm({ product_type: 'ahorro', product_name: '', balance: '' });
            } else {
                alert(data.error || 'Error al crear el producto');
            }

        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Fallo en la comunicación con el servidor.");
        }
    };

    if (!user) {
        return <p>Cargando datos del usuario o no autenticado...</p>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded shadow-sm"
                style={{ minWidth: '300px', width: '100%', maxWidth: '400px' }}
            >
                <h4 className="mb-4 text-center">Abrir Cuenta Bancaria</h4>

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
                        placeholder="Ej: 100.00"
                        min="0"
                        step="0.01"
                        value={form.balance}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Crear Cuenta
                </button>
            </form>
        </div>
    );
}
