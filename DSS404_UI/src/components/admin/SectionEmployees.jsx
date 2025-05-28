import React from 'react';

export default function SectionEmployees({ onAddClick }) {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Gestión de Empleados</h3>
                <button className="btn btn-primary" onClick={onAddClick}>Agregar Empleado</button>
            </div>
            <input className="form-control mb-3" placeholder="Buscar empleado..." />
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Departamento</th>
                        <th>Puesto</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Aquí se renderizarán dinámicamente los empleados */}
                    </tbody>
                </table>
            </div>
        </>
    );
}
