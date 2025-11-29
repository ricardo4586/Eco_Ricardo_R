// pages/admin/dashboard.jsx - ACTUALIZADO CON CÓDIGOS EAN-13
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const { isAdmin, isCheckingAuth, authToken } = useAuth();
    const router = useRouter();
    
    const [stats, setStats] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Redirigir si no es admin
    useEffect(() => {
        if (!isCheckingAuth && !isAdmin) {
            router.push('/login');
        }
    }, [isAdmin, isCheckingAuth, router]);

    // Cargar datos del dashboard
    useEffect(() => {
        if (!isAdmin || !authToken) return;

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError('');

                // Fetch estadísticas
                const statsResponse = await fetch('http://localhost:3000/api/estadisticas/top-productos', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                // Verificar si la respuesta es JSON
                const contentType = statsResponse.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const textResponse = await statsResponse.text();
                    throw new Error(`El servidor devolvió HTML en lugar de JSON. ¿El endpoint existe? Respuesta: ${textResponse.substring(0, 100)}...`);
                }

                if (!statsResponse.ok) {
                    throw new Error(`Error ${statsResponse.status}: ${statsResponse.statusText}`);
                }

                const statsData = await statsResponse.json();
                setStats(statsData.data);

                // Fetch productos
                const productsResponse = await fetch('http://localhost:3000/api/productos');
                if (!productsResponse.ok) {
                    throw new Error(`Error cargando productos: ${productsResponse.status}`);
                }

                const productsData = await productsResponse.json();
                setProducts(productsData.data || []);

            } catch (err) {
                console.error('Error loading dashboard:', err);
                setError(err.message || 'Error al cargar el dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [isAdmin, authToken]);

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="loading-spinner"></div>
                <span className="ml-3 text-gray-600">Verificando autenticación...</span>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
                    <p className="text-gray-600">No tienes permisos para acceder al panel de administración.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
                            <p className="text-gray-600 mt-1">Gestión de productos y estadísticas</p>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => router.push('/')}
                                className="btn-secondary"
                            >
                                Volver a la Tienda
                            </button>
                            <button 
                                onClick={() => window.open('http://localhost:3000/api/health', '_blank')}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Probar API
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {error && (
                    <div className="error-message mb-6">
                        <strong>Error:</strong> {error}
                        <div className="mt-2 text-sm">
                            <p>Posibles causas:</p>
                            <ul className="list-disc ml-6 mt-1">
                                <li>El backend no está ejecutándose en puerto 3000</li>
                                <li>El endpoint /api/estadisticas/top-productos no existe</li>
                                <li>Problema de conexión con el servidor</li>
                            </ul>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <div className="loading-spinner mx-auto"></div>
                        <p className="mt-3 text-gray-600">Cargando dashboard...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Información para Flutter */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <span className="text-2xl">📱</span>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-semibold text-blue-800">Listo para Flutter</h3>
                                    <p className="text-blue-700 mt-1">
                                        Los productos tienen códigos de barras EAN-13 reales para escanear.
                                    </p>
                                    <div className="mt-2 text-sm text-blue-600">
                                        <strong>Endpoints para la app:</strong>
                                        <ul className="list-disc ml-5 mt-1">
                                            <li><code>GET /api/productos/buscar/:barcode</code> - Buscar producto</li>
                                            <li><code>POST /api/productos/registrar</code> - Registrar nuevo producto</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Estadísticas */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Productos Más Vendidos</h2>
                                {stats && stats.length > 0 ? (
                                    <div className="space-y-4">
                                        {stats.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                                <span className="font-medium">{item.product}</span>
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">
                                                    {item.sales} ventas
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">
                                        No hay datos de estadísticas disponibles
                                    </p>
                                )}
                            </div>

                            {/* Lista de Productos */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Productos en Inventario</h2>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                                        {products.length} productos
                                    </span>
                                </div>
                                
                                <div className="space-y-4">
                                    {products.map((product) => (
                                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-800">{product.nombre}</h3>
                                                    <div className="mt-2 space-y-1">
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <span className="font-medium mr-2">Código EAN-13:</span>
                                                            <code className="bg-gray-100 px-2 py-1 rounded font-mono text-xs">
                                                                {product.barcode}
                                                            </code>
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <span className="font-medium mr-2">ID:</span>
                                                            <span className="font-mono">{product.id_numerico}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right ml-4">
                                                    <p className="text-2xl font-bold text-green-600">${product.precio}</p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Stock: <span className="font-semibold">{product.stock}</span> unidades
                                                    </p>
                                                    <div className="mt-2">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            {product.stock > 20 ? 'Alto stock' : product.stock > 10 ? 'Stock medio' : 'Bajo stock'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Códigos de barras para testing */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-yellow-800 mb-2">📟 Códigos EAN-13 para probar:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {products.slice(0, 6).map((product) => (
                                    <div key={product.id} className="bg-white border border-yellow-200 rounded p-3">
                                        <div className="font-medium text-sm">{product.nombre}</div>
                                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block mt-1">
                                            {product.barcode}
                                        </code>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;