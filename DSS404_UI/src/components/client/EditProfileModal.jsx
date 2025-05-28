import React from 'react';

export default function EditProfileModal({ onClose }) {
    return (
        <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="modal-title">Editar Perfil</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <form>
                        <div className="row g-3">
                            {[
                                ['Nombre Completo', 'text'],
                                ['Calle', 'text'],
                                ['Número de Casa', 'text'],
                                ['Ciudad', 'text'],
                                ['Departamento', 'text'],
                                ['Correo Electrónico', 'email'],
                                ['Teléfono', 'tel'],
                                ['Lugar de Trabajo', 'text'],
                                ['Dirección de Trabajo', 'text']
                            ].map(([label, type], i) => (
                                <div className="col-md-6" key={i}>
                                    <label className="form-label">{label}</label>
                                    <input type={type} className="form-control rounded-pill px-4 py-2 shadow-sm" required />
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button type="submit" className="btn btn-primary rounded-pill px-4">Guardar Cambios</button>
                            <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
