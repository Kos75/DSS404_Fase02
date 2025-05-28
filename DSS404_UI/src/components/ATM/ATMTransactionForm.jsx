import React, { useState } from 'react';

export default function ATMTransactionForm() {
    const [formData, setFormData] = useState({ dui: '', type: 'retiro', amount: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Transacción enviada:', formData);
        // conectar con backend o simular respuesta aquí
    };

    return (
        <div className="card shadow-sm p-4">
            <h4 className="mb-3">Registrar Transacción</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>DUI del Cliente</label>
                    <input
                        type="text"
                        name="dui"
                        className="form-control"
                        placeholder="00000000-0"
                        value={formData.dui}
                        onChange={handleChange}
                        required
                    />
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
