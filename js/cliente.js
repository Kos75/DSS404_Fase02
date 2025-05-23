// Verificar autenticación
document.addEventListener('DOMContentLoaded', () => {
    // TODO: Cambiar por verificación de sesión PHP
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('token');
    
    if (!userType || !token || userType !== 'cliente') {
        window.location.href = '../index.html';
    }

    // TODO: Obtener nombre del usuario desde la sesión PHP
    document.getElementById('userName').textContent = 'Cliente';

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

// Cargar productos
async function loadProducts() {
    try {
        // TODO: Cambiar por llamada a API PHP
        const response = await fetch('/api/client/products', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Error al cargar productos');
        
        const products = await response.json();
        
        // Limpiar contenedores
        document.getElementById('accountsContainer').innerHTML = '';
        document.getElementById('cardsContainer').innerHTML = '';
        document.getElementById('loansContainer').innerHTML = '';
        document.getElementById('insuranceContainer').innerHTML = '';
        
        // Agrupar productos por tipo
        const accounts = products.filter(p => p.type === 'cuenta');
        const cards = products.filter(p => p.type === 'tarjeta');
        const loans = products.filter(p => p.type === 'prestamo');
        const insurance = products.filter(p => p.type === 'seguro');
        
        // Función para crear tarjetas de producto
        function createProductCard(product) {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <h5>${product.name}</h5>
                <div class="number">${product.number}</div>
                <div class="balance">$${product.balance.toFixed(2)}</div>
                <span class="status ${product.status}">${product.status}</span>
            `;
            return card;
        }
        
        // Agregar productos a sus contenedores
        accounts.forEach(account => {
            document.getElementById('accountsContainer').appendChild(createProductCard(account));
        });
        
        cards.forEach(card => {
            document.getElementById('cardsContainer').appendChild(createProductCard(card));
        });
        
        loans.forEach(loan => {
            document.getElementById('loansContainer').appendChild(createProductCard(loan));
        });
        
        insurance.forEach(ins => {
            document.getElementById('insuranceContainer').appendChild(createProductCard(ins));
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar productos');
    }
}

// Cargar transacciones
async function loadTransactions() {
    try {
        // TODO: Cambiar por llamada a API PHP
        const response = await fetch('/api/client/transactions', {
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
                <td>${transaction.product}</td>
                <td>${transaction.type}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.status}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar transacciones');
    }
}

// Cargar perfil
async function loadProfile() {
    try {
        // TODO: Cambiar por llamada a API PHP
        const response = await fetch('/api/client/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Error al cargar perfil');
        
        const profile = await response.json();
        
        // Actualizar campos del perfil
        document.getElementById('profileName').textContent = profile.name;
        document.getElementById('profileDocument').textContent = profile.document;
        document.getElementById('profileBirthDate').textContent = new Date(profile.birthDate).toLocaleDateString();
        document.getElementById('profileAddress').textContent = `${profile.street} ${profile.house}, ${profile.city}, ${profile.department}`;
        document.getElementById('profileMaritalStatus').textContent = profile.maritalStatus;
        document.getElementById('profileProfession').textContent = profile.profession;
        document.getElementById('profileEmail').textContent = profile.email;
        document.getElementById('profilePhone').textContent = profile.phone;
        document.getElementById('profileWorkplace').textContent = profile.workplace;
        document.getElementById('profileWorkAddress').textContent = profile.workAddress;
        document.getElementById('profileSalary').textContent = `$${profile.salary.toFixed(2)}`;
        document.getElementById('profileOtherIncome').textContent = `$${profile.otherIncome.toFixed(2)}`;
        
        // Actualizar campos del formulario de edición
        document.getElementById('editName').value = profile.name;
        document.getElementById('editStreet').value = profile.street;
        document.getElementById('editHouse').value = profile.house;
        document.getElementById('editCity').value = profile.city;
        document.getElementById('editDepartment').value = profile.department;
        document.getElementById('editEmail').value = profile.email;
        document.getElementById('editPhone').value = profile.phone;
        document.getElementById('editWorkplace').value = profile.workplace;
        document.getElementById('editWorkAddress').value = profile.workAddress;
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar perfil');
    }
}

// Editar perfil
document.getElementById('editProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const profileData = Object.fromEntries(formData.entries());
    
    try {
        // TODO: Cambiar por llamada a API PHP
        const response = await fetch('/api/client/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(profileData)
        });
        
        if (!response.ok) throw new Error('Error al actualizar perfil');
        
        alert('Perfil actualizado exitosamente');
        closeModal('editProfileModal');
        loadProfile();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar perfil');
    }
});

// Búsqueda de transacciones
document.getElementById('transactionSearch').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#transactionsTable tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

// Modal de edición de perfil
document.getElementById('editProfileBtn').addEventListener('click', () => {
    document.getElementById('editProfileModal').classList.add('active');
});

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
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

// Cargar datos iniciales
loadProducts();
loadTransactions();
loadProfile(); 