const API = "http://localhost:8000/api";

export async function fetchProducts(clientId) {
    const res = await fetch(`${API}/products/${clientId}`);
    return await res.json();
}

export async function makeTransaction(data) {
    const res = await fetch(`${API}/atm/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function makeTransfer(data) {
    const res = await fetch(`${API}/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function getAuditLogs() {
    const res = await fetch(`${API}/audit-log`);
    return await res.json();
}
