document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const documentId = document.getElementById('documentId');

    // Validate document ID format
    documentId.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.length === 8) {
            e.target.value = value + '-';
        }
    });

    // Validate password match
    confirmPassword.addEventListener('input', () => {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Las contraseñas no coinciden');
        } else {
            confirmPassword.setCustomValidity('');
        }
    });

    // Calculate age based on birth date
    document.getElementById('birthDate').addEventListener('change', (e) => {
        const birthDate = new Date(e.target.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            e.target.setCustomValidity('Debe ser mayor de 18 años');
        } else {
            e.target.setCustomValidity('');
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all required fields
        if (!registerForm.checkValidity()) {
            alert('Por favor complete todos los campos correctamente');
            return;
        }

        // Validate password match
        if (password.value !== confirmPassword.value) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const formData = {
            fullName: document.getElementById('fullName').value,
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
            monthlySalary: document.getElementById('monthlySalary').value,
            otherIncome: document.getElementById('otherIncome').value,
            username: document.getElementById('username').value,
            password: password.value
        };

        try {
            // This will be replaced with actual API call when backend is ready
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Registro exitoso. Por favor inicie sesión.');
                window.location.href = 'index.html';
            } else {
                const data = await response.json();
                alert(data.message || 'Error en el registro. Por favor intente nuevamente.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrar. Por favor intente nuevamente.');
        }
    });
}); 