"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { Plus, Edit, Trash2, Search, Filter, Barcode, Package, DollarSign, Hash } from 'lucide-react';

const GestionProductos = () => {
    const { isAdmin, isCheckingAuth, authToken } = useAuth();
    const router = useRouter();
    
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        barcode: '',
        id_numerico: '',
        categoria: '',
        imagen: ''
    });

    // Configuración de API - CORREGIDA
    const API_BASE_URL = 'http://localhost:3000/api'; // Cambia el puerto a 3000

    // Definir las 5 categorías (en minúsculas para coincidir con tu backend)
    const categorias = [
        'supermercado',
        'electrodomesticos', 
        'jugueteria',
        'tecnologia',
        'bebidas'
    ];

    // Mapeo para mostrar nombres bonitos
    const categoriasDisplay = {
        'supermercado': 'Supermercado',
        'electrodomesticos': 'Electrodomésticos',
        'jugueteria': 'Juguetería',
        'tecnologia': 'Tecnología',
        'bebidas': 'Bebidas'
    };

    // Redirigir si no es admin
    useEffect(() => {
        if (!isCheckingAuth && !isAdmin) {
            router.push('/login');
        }
    }, [isAdmin, isCheckingAuth, router]);

    // Cargar productos - CORREGIDO
    useEffect(() => {
        if (!isAdmin) return;

        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/productos`, {
                    headers: authToken ? {
                        'Authorization': `Bearer ${authToken}`
                    } : {}
                });

                if (response.ok) {
                    const result = await response.json();
                    // Tu backend devuelve { success: true, data: [...] }
                    const productsData = result.data || [];
                    setProducts(productsData);
                    setFilteredProducts(productsData);
                } else {
                    throw new Error('Error al cargar productos del servidor');
                }
            } catch (err) {
                console.error('Error loading products:', err);
                setError('Error al cargar los productos: ' + err.message);
                
                // Datos de ejemplo como fallback
                const exampleProducts = [
                    {
                        barcode: "7750241000587",
                        id_numerico: "5555555555",
                        nombre: "Inca Kola 500ml",
                        precio: 3.50,
                        stock: 100,
                        categoria: "bebidas"
                    },
                    {
                        barcode: "7750241000594", 
                        id_numerico: "6666666666",
                        nombre: "Gaseosa Coca-Cola 500ml",
                        precio: 3.20,
                        stock: 80,
                        categoria: "bebidas"
                    }
                ];
                setProducts(exampleProducts);
                setFilteredProducts(exampleProducts);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [isAdmin, authToken]);

    // Filtrar productos
    useEffect(() => {
        const filtered = products.filter(product =>
            product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.barcode.includes(searchTerm) ||
            product.categoria.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                nombre: product.nombre || '',
                descripcion: product.descripcion || '',
                precio: product.precio?.toString() || '',
                stock: product.stock?.toString() || '',
                barcode: product.barcode || '',
                id_numerico: product.id_numerico || '',
                categoria: product.categoria || 'supermercado',
                imagen: product.imagen || ''
            });
        } else {
            setEditingProduct(null);
            setFormData({
                nombre: '',
                descripcion: '',
                precio: '',
                stock: '',
                barcode: '',
                id_numerico: '',
                categoria: 'supermercado',
                imagen: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

    // HANDLE SUBMIT CORREGIDO - usa las rutas correctas de tu backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            
            // ✅ RUTAS CORRECTAS para tu backend
            const url = editingProduct 
                ? `${API_BASE_URL}/productos/${editingProduct.barcode}`  // PUT por barcode
                : `${API_BASE_URL}/productos/registrar`;                // POST crear
            
            const method = editingProduct ? 'PUT' : 'POST';
            
            console.log('🔍 Enviando a:', url, 'Método:', method);
            console.log('📦 Datos:', formData);

            // Preparar datos para enviar
            const dataToSend = {
                nombre: formData.nombre,
                descripcion: formData.descripcion || '',
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                barcode: formData.barcode,
                id_numerico: formData.id_numerico,
                categoria: formData.categoria,
                imagen: formData.imagen || ''
            };

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(authToken && { 'Authorization': `Bearer ${authToken}` })
                },
                body: JSON.stringify(dataToSend)
            });

            const responseText = await response.text();
            console.log('📨 Respuesta del servidor:', responseText);

            if (response.ok) {
                let result;
                try {
                    result = responseText ? JSON.parse(responseText) : { message: 'Operación exitosa' };
                } catch {
                    result = { message: responseText };
                }

                console.log('✅ Operación exitosa:', result);
                
                // Recargar productos
                const updatedResponse = await fetch(`${API_BASE_URL}/productos`, {
                    headers: authToken ? {
                        'Authorization': `Bearer ${authToken}`
                    } : {}
                });
                
                if (updatedResponse.ok) {
                    const data = await updatedResponse.json();
                    setProducts(data.data || []);
                    setFilteredProducts(data.data || []);
                }
                
                closeModal();
                alert(editingProduct ? '✅ Producto actualizado correctamente' : '✅ Producto creado correctamente');
            } else {
                // Manejar error específico
                let errorMessage = `Error ${response.status}: `;
                try {
                    const errorData = responseText ? JSON.parse(responseText) : {};
                    errorMessage += errorData.message || errorData.error || responseText || 'Error desconocido';
                } catch {
                    errorMessage += responseText || 'Error al procesar la solicitud';
                }
                throw new Error(errorMessage);
            }
        } catch (err) {
            console.error('❌ Error saving product:', err);
            alert(`❌ Error al guardar el producto: ${err.message}`);
        }
    };

    // HANDLE DELETE CORREGIDO
    const handleDelete = async (barcode) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            return;
        }

        try {
            const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/productos/${barcode}`, {
                method: 'DELETE',
                headers: authToken ? {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                } : {}
            });

            if (response.ok) {
                // Eliminar localmente sin recargar toda la lista
                setProducts(products.filter(p => p.barcode !== barcode));
                setFilteredProducts(filteredProducts.filter(p => p.barcode !== barcode));
                alert('✅ Producto eliminado correctamente');
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Error al eliminar el producto');
            }
        } catch (err) {
            console.error('❌ Error deleting product:', err);
            alert('❌ Error al eliminar el producto: ' + err.message);
        }
    };

    const generateBarcode = () => {
        // Generar un EAN-13 válido (12 dígitos + checksum)
        const base = '123456789012'.split('').map(() => Math.floor(Math.random() * 10)).join('');
        const checksum = calculateEAN13Checksum(base);
        setFormData(prev => ({ ...prev, barcode: base + checksum }));
    };

    const calculateEAN13Checksum = (code) => {
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(code[i]) * (i % 2 === 0 ? 1 : 3);
        }
        return (10 - (sum % 10)) % 10;
    };

    // Función para obtener el color de la categoría
    const getCategoryColor = (categoria) => {
        const colors = {
            'supermercado': 'bg-green-100 text-green-800',
            'electrodomesticos': 'bg-blue-100 text-blue-800',
            'jugueteria': 'bg-purple-100 text-purple-800',
            'tecnologia': 'bg-indigo-100 text-indigo-800',
            'bebidas': 'bg-amber-100 text-amber-800'
        };
        return colors[categoria] || 'bg-gray-100 text-gray-800';
    };

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
                            <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
                            <p className="text-gray-600 mt-1">Administra el inventario de productos</p>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => router.push('/admin/dashboard')}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                            >
                                Volver al Dashboard
                            </button>
                            <button 
                                onClick={() => openModal()}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
                            >
                                <Plus size={20} className="mr-2" />
                                Nuevo Producto
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Barra de búsqueda y filtros */}
                <div className="mb-6 bg-white rounded-lg shadow p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar productos por nombre, código de barras o categoría..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    
                    {/* Filtros rápidos por categoría */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-sm text-gray-600 font-medium mr-2">Categorías:</span>
                        {categorias.map((categoria) => (
                            <button
                                key={categoria}
                                onClick={() => setSearchTerm(categoria)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                    searchTerm === categoria 
                                        ? getCategoryColor(categoria) 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {categoriasDisplay[categoria]}
                            </button>
                        ))}
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200"
                            >
                                Limpiar filtro
                            </button>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-3 text-gray-600">Cargando productos...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Producto
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Código EAN-13
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Categoría
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Precio
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Stock
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Estado
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.barcode} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        <Package className="text-gray-400" size={20} />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {product.nombre}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            ID: {product.id_numerico}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-mono">
                                                    {product.barcode}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(product.categoria)}`}>
                                                    {categoriasDisplay[product.categoria]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${product.precio}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {product.stock} unidades
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    product.stock > 20 ? 'bg-green-100 text-green-800' : 
                                                    product.stock > 10 ? 'bg-yellow-100 text-yellow-800' : 
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {product.stock > 20 ? 'Alto stock' : product.stock > 10 ? 'Stock medio' : 'Bajo stock'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => openModal(product)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.barcode)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <Package className="mx-auto text-gray-400" size={48} />
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No se encontraron productos</h3>
                                <p className="mt-2 text-gray-500">
                                    {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay productos en el inventario'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal para agregar/editar producto */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">
                                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nombre del Producto *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.nombre}
                                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Ej: Leche en Polvo para Bebé"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Categoría *
                                        </label>
                                        <select
                                            required
                                            value={formData.categoria}
                                            onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Seleccionar categoría</option>
                                            {categorias.map((categoria) => (
                                                <option key={categoria} value={categoria}>
                                                    {categoriasDisplay[categoria]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Descripción
                                    </label>
                                    <textarea
                                        value={formData.descripcion}
                                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Descripción del producto..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                            <DollarSign size={16} className="mr-1" />
                                            Precio *
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            value={formData.precio}
                                            onChange={(e) => setFormData({...formData, precio: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="0.00"
                                            min="0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Stock *
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.stock}
                                            onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                            <Hash size={16} className="mr-1" />
                                            ID Numérico *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.id_numerico}
                                            onChange={(e) => setFormData({...formData, id_numerico: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="001"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <Barcode size={16} className="mr-1" />
                                        Código de Barras EAN-13 *
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            required
                                            value={formData.barcode}
                                            onChange={(e) => setFormData({...formData, barcode: e.target.value})}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                                            placeholder="1234567890123"
                                            maxLength="13"
                                            pattern="[0-9]{13}"
                                        />
                                        <button
                                            type="button"
                                            onClick={generateBarcode}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                        >
                                            Generar
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Debe contener exactamente 13 dígitos numéricos
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        URL de Imagen
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.imagen}
                                        onChange={(e) => setFormData({...formData, imagen: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        {editingProduct ? 'Actualizar' : 'Crear'} Producto
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestionProductos;