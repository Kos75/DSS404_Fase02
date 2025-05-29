import React, { useEffect, useState } from 'react';
import OpenProductForm from './OpenProductForm';
import { useAuth } from '../../context/authContext';

export default function ProductsSection() {
    const { user } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products from backend
    const fetchProducts = async () => {
        if (!user?.id) return;

        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`http://localhost:8000/api/products?client_id=${user.id}`);
            const data = await res.json();

            if (Array.isArray(data)) {
                setProducts(data);
            } else if (Array.isArray(data.products)) {
                setProducts(data.products);
            } else {
                throw new Error("Formato inesperado");
            }
        } catch (err) {
            console.error("❌ Error cargando productos:", err);
            setError("No se pudieron cargar los productos");
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [user]);

    // Agrupar productos por tipo
    const grouped = Array.isArray(products)
        ? products.reduce((acc, prod) => {
            const key = prod.product_type || 'Otros';
            if (!acc[key]) acc[key] = [];
            acc[key].push(prod);
            return acc;
        }, {})
        : {};

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Mis Productos</h3>
                <button className="btn btn-success" onClick={() => setShowForm(true)}>
                    + Abrir Cuenta
                </button>
            </div>

            {showForm && (
                <div className="mb-4">
                    <OpenProductForm
                        onClose={() => setShowForm(false)}
                        onProductCreated={fetchProducts}
                    />
                </div>
            )}

            {loading && <p>Cargando productos...</p>}
            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && products.length === 0 && (
                <p className="text-muted">No tienes productos registrados.</p>
            )}

            <div className="row g-4">
                {Object.entries(grouped).map(([category, items], idx) => (
                    <div className="col-12" key={idx}>
                        <div className="bg-light rounded p-3 shadow-sm">
                            <h5 className="mb-3">{category}</h5>
                            <div className="row g-3">
                                {items.map((prod) => (
                                    <div className="col-md-4" key={prod.id}>
                                        <div className="card p-3 shadow-sm h-100">
                                            <h6 className="text-primary">{prod.product_name}</h6>
                                            <p className="text-muted small">
                                                Balance: ${parseFloat(prod.balance).toFixed(2)}
                                            </p>
                                            <span className="badge bg-success">Activo</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
