import React from 'react';

export default function ProfileSection({ onEdit }) {
    const fields = [
        ['Nombre Completo', 'Juan Pérez'],
        ['Documento de Identidad', '12345678-9'],
        ['Fecha de Nacimiento', '1990-01-01'],
        ['Dirección', 'Av. Central #123'],
        ['Estado Familiar', 'Soltero'],
        ['Profesión', 'Ingeniero'],
        ['Correo Electrónico', 'juan@correo.com'],
        ['Teléfono', '7777-8888'],
        ['Lugar de Trabajo', 'Empresa XYZ'],
        ['Dirección de Trabajo', 'Zona Industrial'],
        ['Salario Mensual', '$1,200.00'],
        ['Otros Ingresos', '$300.00']
    ];

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Mi Perfil</h3>
                <button className="btn btn-primary" onClick={onEdit}>Editar Perfil</button>
            </div>

            <div className="row g-3">
                {fields.map(([label, value], i) => (
                    <div className="col-md-6" key={i}>
                        <div className="bg-light rounded p-3 shadow-sm">
                            <label className="form-label fw-semibold">{label}</label>
                            <p className="mb-0">{value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
