import React from 'react';

export default function EmployeeModal({ onClose }) {
    return (
        <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="modal-title">Agregar Empleado</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <form>
                        <div className="row g-3">
                            {[
                                ['Código de Empleado', 'text'],
                                ['Nombre Completo', 'text'],
                                ['Documento de Identidad', 'text'],
                                ['Fecha de Nacimiento', 'date'],
                                ['Calle', 'text'],
                                ['Número de Casa', 'text'],
                                ['Ciudad', 'text'],
                                ['Departamento', 'text'],
                                ['Puesto', 'text'],
                                ['Sueldo', 'number'],
                                ['Profesión', 'text'],
                                ['Correo Electrónico', 'email'],
                                ['Teléfono', 'tel'],
                            ].map(([label, type], i) => (
                                <div className="col-md-6" key={i}>
                                    <label className="form-label">{label}</label>
                                    <input type={type} className="form-control" required />
                                </div>
                            ))}

                            <div className="col-md-6">
                                <label className="form-label">Departamento en la Empresa</label>
                                <select className="form-select" required>
                                    <option>Seleccione...</option>
                                    <option value="finanzas">Finanzas</option>
                                    <option value="atencion">Atención al Cliente</option>
                                    <option value="gerencia">Gerencia</option>
                                    <option value="servicios">Servicios Varios</option>
                                    <option value="seguridad">Seguridad</option>
                                </select>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button type="submit" className="btn btn-primary">Guardar</button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
