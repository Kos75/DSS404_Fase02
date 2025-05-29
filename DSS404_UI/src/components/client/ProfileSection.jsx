import React from 'react';

export default function ProfileSection({ user, onEdit }) {
    if (!user) {
        return <p className="text-center">Cargando datos del perfil...</p>;
    }

    const formatCurrency = (value) =>
        value ? `$${parseFloat(value).toLocaleString('es-SV', { minimumFractionDigits: 2 })}` : '—';

    const fields = [
        ['Nombre Completo', user.full_name],
        ['DUI', user.dui],
        ['Fecha de Nacimiento', user.birth_date],
        ['Ciudad', user.city],
        ['Departamento', user.department],
        ['Profesión', user.profession],
        ['Correo Electrónico', user.email],
        ['Teléfono', user.phone],
        ['Estado Civil', user.marital_status],
        ['Salario Mensual', formatCurrency(user.monthly_salary)],
        ['Otros Ingresos', formatCurrency(user.other_income)],
        ['Fecha de Registro', user.created_at],
    ];

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Mi Perfil</h3>
                {onEdit && (
                    <button className="btn btn-primary" onClick={onEdit}>
                        Editar Perfil
                    </button>
                )}
            </div>

            <div className="row g-3">
                {fields.map(([label, value], index) => (
                    <div className="col-md-6" key={index}>
                        <div className="bg-light rounded p-3 shadow-sm h-100">
                            <label className="form-label fw-semibold">{label}</label>
                            <p className="mb-0">{value || '—'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
