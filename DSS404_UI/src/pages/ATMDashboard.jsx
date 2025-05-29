import React, { useState } from 'react';
import ATMSidebar from '../components/ATM/ATMSidebar';
import ATMTopBar from '../components/ATM/ATMTopBar';
import ATMTransactionForm from '../components/ATM/ATMTransactionForm';
import ATMTransactionHistory from '../components/ATM/ATMTransactionHistory';
import ClientPanel from "./ClientPanel.jsx";

export default function ATMDashboard() {
    const [section, setSection] = useState('transactions');

    return (
        <div className="dashboard-container d-flex">
            <ATMSidebar active={section} onNavigate={setSection} />
            <main className="flex-grow-1">
                <ATMTopBar />
                <div className="p-3">
                    {section === 'transactions' && <ATMTransactionForm />}
                    {section === 'history' && <ATMTransactionHistory />}
                </div>
            </main>
        </div>
    );
}
