// frontend/pages/categorias/[categoria].jsx - VERSIÓN CORREGIDA
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../../components/Product/ProductCard';

export default function CategoriaPage() {
  const router = useRouter();
  const { categoria } = router.query;
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaInfo, setCategoriaInfo] = useState(null);
  const [sortBy, setSortBy] = useState('nombre');
  const [filterPrice, setFilterPrice] = useState('all');
  const [error, setError] = useState(null);
  const [usandoDatosEjemplo, setUsandoDatosEjemplo] = useState(false);

  // Configuración de API - CORREGIDA
  const API_BASE_URL = 'http://localhost:3000/api';

  useEffect(() => {
    if (categoria) {
      console.log('🔄 Cargando productos para categoría:', categoria);
      fetchProductosPorCategoria();
      fetchCategoriaInfo();
    }
  }, [categoria]);

  // Datos de ejemplo como respaldo - ACTUALIZADOS con minúsculas
  const datosEjemplo = {
    supermercado: [
      { barcode: '1234567890123', id_numerico: 'SM001', nombre: 'Arroz Integral', precio: 2.50, stock: 50, categoria: 'supermercado', descripcion: 'Arroz integral de grano largo' },
      { barcode: '1234567890124', id_numerico: 'SM002', nombre: 'Aceite de Oliva', precio: 8.99, stock: 30, categoria: 'supermercado', descripcion: 'Aceite de oliva extra virgen' },
      { barcode: '1234567890125', id_numerico: 'SM003', nombre: 'Pasta Integral', precio: 1.75, stock: 40, categoria: 'supermercado', descripcion: 'Pasta de trigo integral' },
    ],
    electrodomesticos: [
      { barcode: '1234567890126', id_numerico: 'EL001', nombre: 'Licuadora Oster', precio: 45.99, stock: 15, categoria: 'electrodomesticos', descripcion: 'Licuadora de 600W' },
      { barcode: '1234567890127', id_numerico: 'EL002', nombre: 'Microondas Samsung', precio: 120.00, stock: 8, categoria: 'electrodomesticos', descripcion: 'Microondas digital' },
    ],
    tecnologia: [
      { barcode: '1234567890128', id_numerico: 'TEC001', nombre: 'Smartphone Samsung', precio: 299.99, stock: 25, categoria: 'tecnologia', descripcion: 'Smartphone Android 128GB' },
      { barcode: '1234567890129', id_numerico: 'TEC002', nombre: 'Laptop HP', precio: 599.99, stock: 12, categoria: 'tecnologia', descripcion: 'Laptop 15.6" 8GB RAM' },
    ],
    jugueteria: [
      { barcode: '1234567890130', id_numerico: 'JUG001', nombre: 'Lego Classic', precio: 24.99, stock: 35, categoria: 'jugueteria', descripcion: 'Set de construcción Lego' },
      { barcode: '1234567890131', id_numerico: 'JUG002', nombre: 'Muñeca Barbie', precio: 19.99, stock: 20, categoria: 'jugueteria', descripcion: 'Muñeca Barbie Fashion' },
    ],
    bebidas: [
      { barcode: '7750241000587', id_numerico: '5555555555', nombre: 'Inca Kola 500ml', precio: 3.50, stock: 100, categoria: 'bebidas', descripcion: 'Refresco de sabor único' },
      { barcode: '7750241000594', id_numerico: '6666666666', nombre: 'Gaseosa Coca-Cola 500ml', precio: 3.20, stock: 80, categoria: 'bebidas', descripcion: 'Refresco de cola' },
      { barcode: '1234567890132', id_numerico: 'BEB001', nombre: 'Agua Mineral', precio: 0.75, stock: 100, categoria: 'bebidas', descripcion: 'Agua mineral natural 500ml' },
      { barcode: '1234567890133', id_numerico: 'BEB002', nombre: 'Jugo de Naranja', precio: 3.25, stock: 40, categoria: 'bebidas', descripcion: 'Jugo de naranja natural 1L' },
    ]
  };

  const fetchProductosPorCategoria = async () => {
    try {
      setLoading(true);
      setError(null);
      setUsandoDatosEjemplo(false);
      
      console.log('📡 Intentando conectar a API...');
      
      // ✅ RUTA CORREGIDA - Usa la URL completa del backend
      const response = await fetch(`${API_BASE_URL}/productos/categoria/${categoria}`);
      
      if (!response.ok) {
        console.log('⚠️ API no disponible, usando datos de ejemplo');
        throw new Error('API no disponible - usando datos de ejemplo');
      }
      
      const data = await response.json();
      console.log('✅ Datos recibidos de API:', data);
      
      if (data.success) {
        setProductos(data.data || []);
        console.log(`📦 ${data.data?.length || 0} productos cargados de la API`);
      } else {
        throw new Error('Estructura de datos inválida');
      }
    } catch (error) {
      console.log('🔄 Cambiando a datos de ejemplo...');
      setError(error.message);
      setUsandoDatosEjemplo(true);
      
      // Usar datos de ejemplo como respaldo
      const productosEjemplo = datosEjemplo[categoria] || [];
      setProductos(productosEjemplo);
      
      console.log(`📦 Cargados ${productosEjemplo.length} productos de ejemplo`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriaInfo = async () => {
    try {
      // ✅ RUTA CORREGIDA - Usa la URL completa del backend
      const response = await fetch(`${API_BASE_URL}/categorias`);
      const data = await response.json();
      if (data.success) {
        const cat = data.data.find(c => c.id === categoria);
        setCategoriaInfo(cat);
      }
    } catch (error) {
      console.error('Error fetching category info:', error);
      // Si falla, usar datos locales
      const categoriasLocales = [
        { id: 'supermercado', nombre: 'Supermercado', icono: '🛒', color: 'bg-green-500', description: 'Productos de supermercado y despensa' },
        { id: 'electrodomesticos', nombre: 'Electrodomésticos', icono: '🏠', color: 'bg-blue-500', description: 'Electrodomésticos para el hogar' },
        { id: 'jugueteria', nombre: 'Juguetería', icono: '🧸', color: 'bg-orange-500', description: 'Juguetes y entretenimiento' },
        { id: 'tecnologia', nombre: 'Tecnología', icono: '💻', color: 'bg-purple-500', description: 'Tecnología y electrónica' },
        { id: 'bebidas', nombre: 'Bebidas', icono: '🥤', color: 'bg-red-500', description: 'Bebidas y refrescos' },
      ];
      const cat = categoriasLocales.find(c => c.id === categoria);
      setCategoriaInfo(cat);
    }
  };

  // Función para ordenar productos
  const getSortedProducts = () => {
    let sorted = [...productos];
    
    switch (sortBy) {
      case 'nombre':
        sorted.sort((a, b) => a.nombre?.localeCompare(b.nombre || ''));
        break;
      case 'precio-asc':
        sorted.sort((a, b) => (a.precio || 0) - (b.precio || 0));
        break;
      case 'precio-desc':
        sorted.sort((a, b) => (b.precio || 0) - (a.precio || 0));
        break;
      case 'stock':
        sorted.sort((a, b) => (b.stock || 0) - (a.stock || 0));
        break;
      default:
        break;
    }

    if (filterPrice !== 'all') {
      const [min, max] = filterPrice.split('-').map(Number);
      if (max === 0) {
        sorted = sorted.filter(p => (p.precio || 0) > 50);
      } else {
        sorted = sorted.filter(p => (p.precio || 0) >= min && (p.precio || 0) <= max);
      }
    }

    return sorted;
  };

  // Categorías locales como respaldo
  const categoriasLocales = [
    { id: 'supermercado', nombre: 'Supermercado', icono: '🛒', color: 'bg-green-500', description: 'Productos de supermercado y despensa' },
    { id: 'electrodomesticos', nombre: 'Electrodomésticos', icono: '🏠', color: 'bg-blue-500', description: 'Electrodomésticos para el hogar' },
    { id: 'jugueteria', nombre: 'Juguetería', icono: '🧸', color: 'bg-orange-500', description: 'Juguetes y entretenimiento' },
    { id: 'tecnologia', nombre: 'Tecnología', icono: '💻', color: 'bg-purple-500', description: 'Tecnología y electrónica' },
    { id: 'bebidas', nombre: 'Bebidas', icono: '🥤', color: 'bg-red-500', description: 'Bebidas y refrescos' },
  ];

  const categoriaActual = categoriaInfo || categoriasLocales.find(cat => cat.id === categoria);
  const productosFiltrados = getSortedProducts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de categoría */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className={`p-4 rounded-2xl ${categoriaActual?.color || 'bg-gray-500'} text-white text-4xl shadow-lg`}>
                {categoriaActual?.icono || '📦'}
              </div>
              <div>
                <nav className="flex space-x-2 text-sm text-gray-500 mb-2">
                  <Link href="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
                  <span>/</span>
                  <Link href="/categorias" className="hover:text-blue-600 transition-colors">Categorías</Link>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">{categoriaActual?.nombre}</span>
                </nav>
                <h1 className="text-4xl font-bold text-gray-900">
                  {categoriaActual?.nombre}
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  {categoriaActual?.description || `Explora nuestra selección de productos en ${categoriaActual?.nombre}`}
                </p>
              </div>
            </div>
            <Link
              href="/categorias"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              ← Ver todas las categorías
            </Link>
          </div>
        </div>
      </div>

      {/* Filtros y ordenamiento */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los precios</option>
                <option value="0-10">$0 - $10</option>
                <option value="10-25">$10 - $25</option>
                <option value="25-50">$25 - $50</option>
                <option value="50-0">Más de $50</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="nombre">Nombre (A-Z)</option>
                <option value="precio-asc">Precio (Menor a Mayor)</option>
                <option value="precio-desc">Precio (Mayor a Menor)</option>
                <option value="stock">Stock (Mayor primero)</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              Mostrando {productosFiltrados.length} de {productos.length} productos
              {usandoDatosEjemplo && ' (datos de ejemplo)'}
            </div>
          </div>
        </div>
      </div>

      {/* Mensajes de estado */}
      <div className="max-w-7xl mx-auto px-4">
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-yellow-600 text-lg mr-3">⚠️</div>
              <div>
                <p className="text-yellow-800 font-medium">{error}</p>
                <p className="text-yellow-700 text-sm mt-1">
                  La aplicación está funcionando con datos de ejemplo.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid de productos */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {productosFiltrados.map((producto) => (
              <ProductCard key={producto.barcode} product={producto} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {filterPrice !== 'all' || sortBy !== 'nombre' 
                ? 'Prueba ajustando los filtros para ver más productos.'
                : `No hay productos disponibles en la categoría ${categoriaActual?.nombre}.`
              }
            </p>
            <div className="flex justify-center space-x-4">
              {(filterPrice !== 'all' || sortBy !== 'nombre') && (
                <button
                  onClick={() => {
                    setFilterPrice('all');
                    setSortBy('nombre');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
              <Link
                href="/categorias"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Explorar otras categorías
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Información de la categoría */}
      {productosFiltrados.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Acerca de {categoriaActual?.nombre}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">📦 Productos disponibles</h4>
                <p>Encuentra {productos.length} productos diferentes en esta categoría.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">💰 Rango de precios</h4>
                <p>
                  Desde ${Math.min(...productos.map(p => p.precio || 0)).toFixed(2)} hasta ${Math.max(...productos.map(p => p.precio || 0)).toFixed(2)}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">⚡ Disponibilidad</h4>
                <p>
                  {productos.filter(p => (p.stock || 0) > 0).length} productos en stock
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}