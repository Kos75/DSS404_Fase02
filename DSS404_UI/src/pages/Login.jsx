import React, { useState, useEffect } from 'react';
import '../assets/css/styles.css';

export default function Login() {
    const [signUpMode, setSignUpMode] = useState(false);

    useEffect(() => {
        document.title = 'ACOEMPRENDEDORES - Inicio de Sesión';
    }, []);

    return (
        <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
            {/* FORMULARIOS */}
            <div className="forms-container">
                <div className="signin-signup">

                    {/* Formulario Login */}
                    <form className="sign-in-form">
                        <h2 className="title">Iniciar Sesión</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Usuario" required />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Contraseña" required />
                        </div>
                        <input type="submit" value="Iniciar Sesión" className="btn solid" />
                    </form>

                    {/* Formulario Registro */}
                    <form className="sign-up-form">
                        <h2 className="title">Registro de Cliente</h2>

                        {[
                            ['Nombre Completo', 'text', 'name', 'fas fa-user'],
                            ['Número de Documento', 'text', 'documentId', 'fas fa-id-card'],
                            ['Fecha de Nacimiento', 'date', 'birthDate', 'fas fa-calendar'],
                            ['Calle', 'text', 'street', 'fas fa-map-marker-alt'],
                            ['Número de Casa', 'text', 'house', 'fas fa-home'],
                            ['Ciudad', 'text', 'city', 'fas fa-city'],
                            ['Departamento', 'text', 'department', 'fas fa-building'],
                            ['Profesión', 'text', 'profession', 'fas fa-briefcase'],
                            ['Correo Electrónico', 'email', 'email', 'fas fa-envelope'],
                            ['Teléfono', 'tel', 'phone', 'fas fa-phone'],
                            ['Lugar de Trabajo', 'text', 'workplace', 'fas fa-building'],
                            ['Dirección de Trabajo', 'text', 'workAddress', 'fas fa-map-marked-alt'],
                            ['Salario Mensual', 'number', 'monthlySalary', 'fas fa-money-bill-wave'],
                            ['Otros Ingresos', 'number', 'otherIncome', 'fas fa-coins']
                        ].map(([placeholder, type, id, icon], idx) => (
                            <div className="input-field" key={idx}>
                                <i className={icon}></i>
                                <input type={type} id={id} placeholder={placeholder} required />
                            </div>
                        ))}

                        <div className="input-field">
                            <i className="fas fa-heart"></i>
                            <select id="maritalStatus" required>
                                <option value="">Estado Civil</option>
                                <option value="Soltero">Soltero</option>
                                <option value="Casado">Casado</option>
                                <option value="Divorciado">Divorciado</option>
                                <option value="Viudo">Viudo</option>
                            </select>
                        </div>

                        <input type="submit" value="Registrarse" className="btn solid" />
                    </form>

                </div>
            </div>

            {/* PANELES */}
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>¿Nuevo en ACOEMPRENDEDORES?</h3>
                        <p>Regístrate como cliente para acceder a nuestros servicios financieros.</p>
                        <button className="btn transparent" onClick={() => setSignUpMode(true)}>Registrarse</button>
                    </div>
                    <img src="/img/log.svg" className="image" alt="Log" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>¿Ya tienes una cuenta?</h3>
                        <p>Inicia sesión para acceder a tu cuenta y gestionar tus productos financieros.</p>
                        <button className="btn transparent" onClick={() => setSignUpMode(false)}>Iniciar Sesión</button>
                    </div>
                    <img src="/img/register.svg" className="image" alt="Register" />
                </div>
            </div>
        </div>
    );
}
