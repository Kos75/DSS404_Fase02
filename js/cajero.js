// Verificar autenticación
document.addEventListener('DOMContentLoaded', () => {
    // TODO: Cambiar por verificación de sesión PHP
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('token');
    
    if (!userType || !token || userType !== 'cajero') {
        window.location.href = '../index.html';
    }

    // TODO: Obtener nombre del usuario desde la sesión PHP
    document.getElementById('userName').textContent = 'Cajero';

    // Navigation
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Update active states
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
});

// Navegación
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = e.target.closest('a').dataset.section;
        
        // Actualizar navegación
        document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
        e.target.closest('li').classList.add('active');
        
        // Mostrar sección
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
        document.getElementById(section).classList.add('active');
    });
});

// Cargar clientes
async function loadClients() {
    try {
        // TODO: Cambiar por llamada a API PHP
        const response = await fetch('/api/clients', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Error al cargar clientes');
        
        const clients = await response.json();
        const select = document.getElementById('clientId');
        select.innerHTML = '<option value="">Seleccione un cliente...</option>';
        
        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = `${client.name} - ${client.document}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar clientes');
    }
}

// Cargar productos
async function loadProducts() {
    const clientId = document.getElementById('clientId').value;
    const productType = document.getElementById('productType').value;
    
    if (!clientId || !productType) {
        document.getElementById('productId').innerHTML = '<option value="">Seleccione un producto...</option>';
        return;
    }
    
    try {
        // TODO: Cambiar por llamada a API PHP
        const response = await fetch(`/api/products?clientId=${clientId}&type=${productType}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Error al cargar productos');
        
        const products = await response.json();
        const select = document.getElementById('productId');
        select.innerHTML = '<option value="">Seleccione un producto...</option>';
        
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `${product.type} - ${product.number}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar productos');
    }
}

// Registrar transacción
document.getElementById('transactionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const transactionData = Object.fromEntries(formData.entries());
    
    try {
        // TODO: Cambiar por llamada a API PHP
        const response = await fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(transactionData)
        });
        
        if (!response.ok) throw new Error('Error al registrar transacción');
        
        alert('Transacción registrada exitosamente');
        e.target.reset();
        loadTransactions();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al registrar transacción');
    }
});

// Cargar transacciones
async function loadTransactions() {
    try {
        // TODO: Cambiar por llamada a API PHP
        const response = await fetch('/api/transactions', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Error al cargar transacciones');
        
        const transactions = await response.json();
        const tbody = document.querySelector('#transactionsTable tbody');
        tbody.innerHTML = '';
        
        transactions.forEach(transaction => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${new Date(transaction.date).toLocaleString()}</td>
                <td>${transaction.client}</td>
                <td>${transaction.product}</td>
                <td>${transaction.type}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.cashier}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar transacciones');
    }
}

// Búsqueda de transacciones
document.getElementById('transactionSearch').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#transactionsTable tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

// Cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    // TODO: Agregar llamada a PHP para cerrar sesión
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    window.location.href = '../index.html';
});

// Event listeners para cargar productos
document.getElementById('clientId').addEventListener('change', loadProducts);
document.getElementById('productType').addEventListener('change', loadProducts);

// Cargar datos iniciales
loadClients();
loadTransactions(); 