// Verificar autenticación
document.addEventListener('DOMContentLoaded', () => {
    // TODO: Cambiar por verificación de sesión PHP
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('token');
    
    if (!userType || !token || userType !== 'admin') {
        window.location.href = '../index.html';
    }

    // TODO: Obtener nombre del usuario desde la sesión PHP
    document.getElementById('userName').textContent = 'Admin';

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

    // Modal handling
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const addEmployeeModal = document.getElementById('addEmployeeModal');
    const closeBtns = document.querySelectorAll('.close-btn, .close-modal');

    addEmployeeBtn.addEventListener('click', () => {
        addEmployeeModal.classList.add('active');
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            addEmployeeModal.classList.remove('active');
        });
    });

    // Close modal when clicking outside
    addEmployeeModal.addEventListener('click', (e) => {
        if (e.target === addEmployeeModal) {
            addEmployeeModal.classList.remove('active');
        }
    });

    // Employee form handling
    const addEmployeeForm = document.getElementById('addEmployeeForm');
    const employeeDocument = document.getElementById('employeeDocument');

    // Format document ID
    employeeDocument.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.length === 8) {
            e.target.value = value + '-';
        }
    });

    addEmployeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const employeeData = Object.fromEntries(formData.entries());
        
        try {
            // TODO: Cambiar por llamada a API PHP
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(employeeData)
            });
            
            if (!response.ok) throw new Error('Error al agregar empleado');
            
            alert('Empleado agregado exitosamente');
            closeModal('addEmployeeModal');
            loadEmployees();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al agregar empleado');
        }
    });

    // Load employees
    async function loadEmployees() {
        try {
            // TODO: Cambiar por llamada a API PHP
            const response = await fetch('/api/employees', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!response.ok) throw new Error('Error al cargar empleados');
            
            const employees = await response.json();
            const tbody = document.querySelector('#employeesTable tbody');
            tbody.innerHTML = '';
            
            employees.forEach(employee => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${employee.code}</td>
                    <td>${employee.name}</td>
                    <td>${employee.workDepartment}</td>
                    <td>${employee.position}</td>
                    <td>
                        <button class="btn-secondary" onclick="editEmployee('${employee.code}')">Editar</button>
                        <button class="btn-danger" onclick="deleteEmployee('${employee.code}')">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar empleados');
        }
    }

    // Search functionality
    const employeeSearch = document.getElementById('employeeSearch');
    employeeSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#employeesTable tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        // TODO: Agregar llamada a PHP para cerrar sesión
        localStorage.removeItem('userType');
        localStorage.removeItem('token');
        window.location.href = '../index.html';
    });

    // Initial load
    loadEmployees();
}); 