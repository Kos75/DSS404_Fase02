// Form animation handling
document.addEventListener('DOMContentLoaded', () => {
    const signUpBtn = document.getElementById('sign-up-btn');
    const signInBtn = document.getElementById('sign-in-btn');
    const container = document.querySelector('.container');

    signUpBtn.addEventListener('click', () => {
        container.classList.add('sign-up-mode');
    });

    signInBtn.addEventListener('click', () => {
        container.classList.remove('sign-up-mode');
    });

    // Check if user is already logged in
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('token');

    if (userType && token) {
        window.location.href = `${userType}/dashboard.html`;
        return;
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Get test users from localStorage
            const users = JSON.parse(localStorage.getItem('testUsers'));
            
            // Find user by username
            const user = users[username];

            if (user && user.password === password) {
                // Store user info in localStorage
                localStorage.setItem('userType', user.type);
                localStorage.setItem('token', 'test-token-' + Math.random());
                localStorage.setItem('userName', user.name);
                
                // Redirect to appropriate dashboard
                window.location.href = `${user.type}/dashboard.html`;
            } else {
                alert('Credenciales inválidas');
            }
        });
    }

    // Registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                documentId: document.getElementById('documentId').value,
                birthDate: document.getElementById('birthDate').value,
                address: {
                    street: document.getElementById('street').value,
                    house: document.getElementById('house').value,
                    city: document.getElementById('city').value,
                    department: document.getElementById('department').value
                },
                maritalStatus: document.getElementById('maritalStatus').value,
                profession: document.getElementById('profession').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                workplace: document.getElementById('workplace').value,
                workAddress: document.getElementById('workAddress').value,
                monthlySalary: parseFloat(document.getElementById('monthlySalary').value),
                otherIncome: parseFloat(document.getElementById('otherIncome').value)
            };

            // Get existing clients
            const clients = JSON.parse(localStorage.getItem('testClients') || '[]');
            
            // Add new client
            const newClient = {
                id: clients.length + 1,
                ...formData
            };
            clients.push(newClient);
            
            // Save updated clients
            localStorage.setItem('testClients', JSON.stringify(clients));

            // Create test user for the new client
            const users = JSON.parse(localStorage.getItem('testUsers'));
            const newUser = {
                username: formData.email.split('@')[0],
                password: 'cliente123',
                type: 'cliente',
                name: formData.name,
                email: formData.email
            };
            users[newUser.username] = newUser;
            localStorage.setItem('testUsers', JSON.stringify(users));

            alert('Registro exitoso. Usa tu email como usuario y "cliente123" como contraseña.');
            window.location.href = 'index.html';
        });
    }
});

// Test users data
const testUsers = {
    admin: {
        username: 'admin',
        password: 'admin123',
        type: 'admin',
        name: 'Administrador',
        email: 'admin@acoemprendedores.com'
    },
    cajero: {
        username: 'cajero',
        password: 'cajero123',
        type: 'cajero',
        name: 'Juan Pérez',
        email: 'cajero@acoemprendedores.com'
    },
    cliente: {
        username: 'cliente',
        password: 'cliente123',
        type: 'cliente',
        name: 'María García',
        email: 'cliente@acoemprendedores.com'
    }
};

// Initialize test data in localStorage if not exists
if (!localStorage.getItem('testUsers')) {
    localStorage.setItem('testUsers', JSON.stringify(testUsers));
}

// Initialize test clients if not exists
if (!localStorage.getItem('testClients')) {
    const testClients = [
        {
            id: 1,
            name: 'María García',
            documentId: '123456789',
            birthDate: '1990-01-15',
            address: {
                street: 'Calle Principal',
                house: '123',
                city: 'Ciudad',
                department: 'Departamento'
            },
            maritalStatus: 'Soltero',
            profession: 'Ingeniero',
            email: 'cliente@acoemprendedores.com',
            phone: '123-456-7890',
            workplace: 'Empresa ABC',
            workAddress: 'Calle Trabajo 456',
            monthlySalary: 5000,
            otherIncome: 1000
        }
    ];
    localStorage.setItem('testClients', JSON.stringify(testClients));
}

// Initialize test products if not exists
if (!localStorage.getItem('testProducts')) {
    const testProducts = [
        {
            id: 1,
            clientId: 1,
            type: 'cuenta',
            name: 'Cuenta de Ahorros',
            number: '1001-1234-5678',
            balance: 5000,
            status: 'active'
        },
        {
            id: 2,
            clientId: 1,
            type: 'tarjeta',
            name: 'Tarjeta de Crédito',
            number: '4111-1111-1111-1111',
            limit: 10000,
            status: 'active'
        }
    ];
    localStorage.setItem('testProducts', JSON.stringify(testProducts));
}

// Initialize test transactions if not exists
if (!localStorage.getItem('testTransactions')) {
    const testTransactions = [
        {
            id: 1,
            clientId: 1,
            productId: 1,
            productNumber: '1001-1234-5678',
            type: 'abono',
            amount: 1000,
            date: new Date().toISOString(),
            status: 'completed',
            cashierName: 'Juan Pérez'
        }
    ];
    localStorage.setItem('testTransactions', JSON.stringify(testTransactions));
} 