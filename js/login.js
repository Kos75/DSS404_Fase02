document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (!username || !password) {
            alert('Por favor complete todos los campos');
            return;
        }

        try {
            // This will be replaced with actual API call when backend is ready
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                // Store user type and token
                localStorage.setItem('userType', data.userType);
                localStorage.setItem('token', data.token);
                
                // Redirect based on user type
                switch(data.userType) {
                    case 'admin':
                        window.location.href = 'admin/dashboard.html';
                        break;
                    case 'cajero':
                        window.location.href = 'cajero/dashboard.html';
                        break;
                    case 'cliente':
                        window.location.href = 'cliente/dashboard.html';
                        break;
                    default:
                        alert('Tipo de usuario no válido');
                }
            } else {
                alert('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al iniciar sesión. Por favor intente nuevamente.');
        }
    });
}); 