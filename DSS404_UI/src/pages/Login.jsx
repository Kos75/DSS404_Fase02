import React, { useState, useEffect } from 'react';
import '../assets/css/styles.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [signUpMode, setSignUpMode] = useState(false);

    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const [registerData, setRegisterData] = useState({
        full_name: '',
        dui: '',
        birthDate: '',
        city: '',
        department: '',
        profession: '',
        email: '',
        password: '',
        phone: '',
        monthlySalary: '',
        otherIncome: '',
        maritalStatus: '',
    });

    useEffect(() => {
        document.title = 'ACOEMPRENDEDORES - Inicio de Sesión';
    }, []);

    const handleLoginChange = e =>
        setLoginData({ ...loginData, [e.target.name]: e.target.value });

    const handleRegisterChange = e =>
        setRegisterData({ ...registerData, [e.target.id]: e.target.value });

    const handleLogin = async e => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });
        const data = await res.json();
        console.log("Respuesta del backend en login:", data); // 👈

        if (data.error) return alert(data.error);
        setUser(data.user);
        navigate(data.role === 'admin' ? '/admin' : '/client');
    };

    const handleRegister = async e => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData),
        });
        const data = await res.json();
        if (data.error) return alert(data.error);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        setSignUpMode(false);
    };

    return (
        <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
            <div className="forms-container">
                <div className="signin-signup">
                    {/* LOGIN */}
                    <form className="sign-in-form" onSubmit={handleLogin}>
                        <h2 className="title">Iniciar Sesión</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input
                                name="email"
                                type="text"
                                placeholder="Correo"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                            />
                        </div>
                        <input type="submit" value="Iniciar Sesión" className="btn solid" />
                    </form>

                    {/* REGISTRO */}
                    <form className="sign-up-form" onSubmit={handleRegister}>
                        <h2 className="title">Registro de Cliente</h2>

                        {[
                            ['full_name', 'Nombre Completo', 'text', 'fas fa-user'],
                            ['email', 'Correo Electrónico', 'email', 'fas fa-envelope'],
                            ['password', 'Contraseña', 'password', 'fas fa-lock'],
                            ['dui', 'DUI', 'text', 'fas fa-id-card'],
                            ['birthDate', 'Fecha de Nacimiento', 'date', 'fas fa-calendar'],
                            ['city', 'Ciudad', 'text', 'fas fa-city'],
                            ['department', 'Departamento', 'text', 'fas fa-building'],
                            ['profession', 'Profesión', 'text', 'fas fa-briefcase'],
                            ['phone', 'Teléfono', 'tel', 'fas fa-phone'],
                            ['monthlySalary', 'Salario Mensual', 'number', 'fas fa-money-bill-wave'],
                            ['otherIncome', 'Otros Ingresos', 'number', 'fas fa-coins'],
                        ].map(([id, placeholder, type, icon], i) => (
                            <div className="input-field" key={i}>
                                <i className={icon}></i>
                                <input
                                    id={id}
                                    type={type}
                                    placeholder={placeholder}
                                    value={registerData[id]}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                        ))}

                        <div className="input-field">
                            <i className="fas fa-heart"></i>
                            <select
                                id="maritalStatus"
                                value={registerData.maritalStatus}
                                onChange={handleRegisterChange}
                                required
                            >
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
