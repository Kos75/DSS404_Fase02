import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        documentId: '',
        birthDate: '',
        street: '',
        house: '',
        city: '',
        department: '',
        maritalStatus: '',
        profession: '',
        email: '',
        phone: '',
        workplace: '',
        workAddress: '',
        monthlySalary: '',
        otherIncome: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        console.log('Datos de registro:', formData);
        // Aquí puedes hacer la petición POST al backend
    };

    const customInputStyle = {
        backgroundColor: '#f0f0f0',
        fontWeight: 500
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-white">
            <div className="w-100" style={{ maxWidth: '700px' }}>
                <div className="text-center mb-4">
                    <h1 className="fw-bold text-primary" style={{ fontSize: '2rem' }}>ACOEMPRENDEDORES</h1>
                    <h2 className="text-muted" style={{ fontSize: '1.1rem' }}>Registro de Cliente</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm">
                    <div className="row g-3">
                        {[
                            ['Nombre Completo', 'fullName', 'text'],
                            ['Documento de Identidad (12345678-9)', 'documentId', 'text'],
                            ['Fecha de Nacimiento', 'birthDate', 'date'],
                            ['Calle', 'street', 'text'],
                            ['Número de Casa', 'house', 'text'],
                            ['Ciudad', 'city', 'text'],
                            ['Departamento', 'department', 'text'],
                            ['Profesión', 'profession', 'text'],
                            ['Correo Electrónico', 'email', 'email'],
                            ['Teléfono', 'phone', 'tel'],
                            ['Lugar de Trabajo', 'workplace', 'text'],
                            ['Dirección de Trabajo', 'workAddress', 'text'],
                            ['Salario Mensual', 'monthlySalary', 'number'],
                            ['Otros Ingresos', 'otherIncome', 'number'],
                            ['Usuario', 'username', 'text'],
                            ['Contraseña', 'password', 'password'],
                            ['Confirmar Contraseña', 'confirmPassword', 'password'],
                        ].map(([label, name, type], idx) => (
                            <div className="col-md-6" key={idx}>
                                <label className="form-label">{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    placeholder={label}
                                    className="form-control rounded-pill px-4 py-2 shadow-sm"
                                    style={customInputStyle}
                                    required
                                />
                            </div>
                        ))}

                        <div className="col-md-6">
                            <label className="form-label">Estado Familiar</label>
                            <select
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                                className="form-select rounded-pill px-4 py-2 shadow-sm"
                                style={customInputStyle}
                                required
                            >
                                <option value="">Seleccione...</option>
                                <option value="soltero">Soltero(a)</option>
                                <option value="casado">Casado(a)</option>
                                <option value="divorciado">Divorciado(a)</option>
                                <option value="viudo">Viudo(a)</option>
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary rounded-pill px-4 py-2 fw-semibold"
                            style={{ backgroundColor: '#5995fd', border: 'none' }}
                        >
                            Registrarse
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary rounded-pill px-4 py-2"
                            onClick={() => navigate('/')}
                        >
                            Volver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
