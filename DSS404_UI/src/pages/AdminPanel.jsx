import React, { useState } from 'react';
import Sidebar from '../components/admin/Sidebar.jsx';
import TopBar from '../components/admin/TopBar.jsx';
import SectionEmployees from '../components/admin/SectionEmployees.jsx';
import SectionProducts from '../components/admin/SectionProducts.jsx';
import SectionReports from '../components/admin/SectionReports.jsx';
import EmployeeModal from '../components/admin/EmployeeModal.jsx';

export default function AdminPanel() {
    const [activeSection, setActiveSection] = useState('employees');
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="d-flex min-vh-100">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className="flex-grow-1 bg-light p-3">
                <TopBar />
                <div className="bg-white p-4 rounded shadow-sm">
                    {activeSection === 'employees' && <SectionEmployees onAddClick={() => setShowModal(true)} />}
                    {activeSection === 'products' && <SectionProducts />}
                    {activeSection === 'reports' && <SectionReports />}
                </div>
                {showModal && <EmployeeModal onClose={() => setShowModal(false)} />}
            </main>
        </div>
    );
}
