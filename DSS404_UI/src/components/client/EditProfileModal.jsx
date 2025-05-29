import React from 'react';

export default function EditProfileModal({ user, setUser, onClose }) {
    const [formData, setFormData] = React.useState({ ...user });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:8000/api/client/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.status === 200) {
                setUser(data);
                alert('Perfil actualizado correctamente ✅');
                onClose();
            } else {
                alert(data.error || 'Error al actualizar perfil');
            }

        } catch (error) {
            console.error('Error actualizando perfil:', error);
            alert('Error en la red');
        }
    };


    return (
        <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="modal-title">Editar Perfil</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            {[
                                ['full_name', 'Nombre Completo', 'text'],
                                ['city', 'Ciudad', 'text'],
                                ['department', 'Departamento', 'text'],
                                ['email', 'Correo Electrónico', 'email'],
                                ['phone', 'Teléfono', 'tel'],
                                ['profession', 'Profesión', 'text']
                            ].map(([name, label, type], i) => (
                                <div className="col-md-6" key={i}>
                                    <label className="form-label">{label}</label>
                                    <input
                                        type={type}
                                        className="form-control rounded-pill px-4 py-2 shadow-sm"
                                        name={name}
                                        value={formData[name] || ''}
                                        onChange={handleChange}
                                    />
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
