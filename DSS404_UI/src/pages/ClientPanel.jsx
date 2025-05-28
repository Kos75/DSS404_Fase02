import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ nuevo hook
import ClientSidebar from '../components/client/ClientSidebar';
import ClientTopBar from '../components/client/ClientTopBar';
import ProductsSection from '../components/client/ProductsSection';
import TransactionsSection from '../components/client/TransactionsSection';
import ProfileSection from '../components/client/ProfileSection';
import EditProfileModal from '../components/client/EditProfileModal';

export default function ClientPanel() {
    const [activeSection, setActiveSection] = useState('products');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // ✅ inicializamos navegación

    return (
        <div className="d-flex min-vh-100">
            <ClientSidebar active={activeSection} onNavigate={setActiveSection} />

            <main className="flex-grow-1 bg-light p-3">
                <ClientTopBar />

                <div className="bg-white p-4 rounded shadow-sm">
                    {activeSection === 'products' && <ProductsSection />}

                    {activeSection === 'transactions' && (
                        <>
                            <div className="mb-3 text-end">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/client/atm')}
                                >
                                    Transferir
                                </button>
                            </div>
                            <TransactionsSection />
                        </>
                    )}

                    {activeSection === 'profile' && (
                        <ProfileSection onEdit={() => setShowModal(true)} />
                    )}
                </div>

                {showModal && <EditProfileModal onClose={() => setShowModal(false)} />}
            </main>
        </div>
    );
}
