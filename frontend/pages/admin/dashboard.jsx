// Archivo: pages/admin/dashboard.jsx
// Panel de Administración (Ruta Protegida: /admin/dashboard).
"use client"; // Necesario para usar hooks de estado y useRouter

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext'; // Manteniendo la ruta relativa para coincidir con la estructura
import { useRouter } from 'next/router'; // Manteniendo 'next/router' para la convención pages/

// Definición de URL API (debe ser accesible desde el navegador)
const API_BASE_URL = 'http://localhost:3001/api';


// --- COMPONENTE: Barra de Estadísticas (StatBar) ---
// En una estructura modular, esto estaría en components/Admin/StatBar.jsx
const StatBarComponent = ({ item, maxSales }) => {
    const percentage = ((item.sales / maxSales) * 100).toFixed(0);
    return (
        <div className="flex items-center space-x-4">
            <span className="w-1/4 font-medium text-gray-700 truncate">{item.product}</span>
            <div className="flex-grow bg-gray-200 rounded-full h-3">
                <div 
                    className="bg-indigo-500 h-3 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <span className="w-12 text-right font-bold text-indigo-700">{item.sales}</span>
        </div>
    );
};


// --- PÁGINA: Admin Dashboard ---
const AdminDashboardPage = () => {
    // Nota: API_BASE_URL no se necesita desestructurar de useAuth si se define globalmente
    const { isAdmin, authToken, isCheckingAuth } = useAuth(); 
    const router = useRouter();
    
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    // Redirección de seguridad
    useEffect(() => {
        // Si la verificación terminó (no es null) Y no es admin, redirige al login
        if (!isCheckingAuth && !isAdmin) { 
            router.replace('/login');
        }
    }, [isCheckingAuth, isAdmin, router]);

    // Función para obtener productos y estadísticas
    const fetchAdminData = useCallback(async () => {
        setLoading(true);
        if (!authToken) return;

        try {
            // 1. Fetch Estadísticas (Requiere Auth Token)
            const statsResponse = await fetch(`${API_BASE_URL}/estadisticas/top-productos`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            const statsResult = await statsResponse.json();
            
            if (statsResponse.ok) {
                setStats(statsResult.data);
            } else {
                console.error(`Error al cargar estadísticas: ${statsResult.message}`);
            }

            // 2. Fetch Productos (Ruta pública)
            // Incluir el token por si el backend se endurece con seguridad.
            const productsResponse = await fetch(`${API_BASE_URL}/productos`, {
                 headers: { 'Authorization': `Bearer ${authToken}` } 
            }); 
            const productsResult = await productsResponse.json();

             if (productsResponse.ok) {
                setProducts(productsResult.data);
            } else {
                console.error(`Error al cargar productos: ${productsResult.message}`);
            }


        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        // Solo intenta cargar datos si es admin Y tiene token
        if (isAdmin && authToken) {
            fetchAdminData();
        }
    }, [isAdmin, authToken, fetchAdminData]);

    if (isCheckingAuth || !isAdmin) {
        // Muestra loading mientras verifica
        return <div className="p-8 text-center text-indigo-600 min-h-screen">Verificando acceso al Dashboard...</div>;
    }

    if (loading) {
        return <div className="p-8 text-center text-indigo-600">Cargando datos del Administrador...</div>;
    }

    // El Dashboard solo se renderiza si isAdmin es true
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-3xl font-extrabold text-indigo-700">Panel de Administración Avanzado</h1>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-4 py-1.5 rounded-full">ROL: ADMIN</span>
            </div>

            {/* Sección de Estadísticas (Gráficos) */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Gráficos de Ventas Mensuales</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <p className="text-lg font-semibold mb-3">Top Productos por Ventas (Noviembre)</p>
                <div className="space-y-3">
                    {stats.length > 0 ? stats.map((item, index) => (
                        <StatBarComponent 
                            key={index} 
                            item={item} 
                            maxSales={stats[0]?.sales || 1} 
                        />
                    )) : (
                        <p className="text-gray-500">No hay datos de ventas disponibles.</p>
                    )}
                </div>
            </div>

            {/* Sección de Productos Registrados */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Inventario y Productos Registrados</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barcode</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.length > 0 ? products.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">${product.precio.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{product.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.barcode}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    No hay productos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboardPage;