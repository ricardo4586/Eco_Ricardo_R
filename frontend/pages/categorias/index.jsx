// frontend/pages/categorias/index.jsx - CORREGIDO
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productCounts, setProductCounts] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Cargando categorías para página principal...');
      
      // Usar URLs relativas
      const categoriasRes = await fetch('/api/categorias');
      
      if (!categoriasRes.ok) {
        throw new Error(`Error ${categoriasRes.status} al cargar categorías`);
      }
      
      const categoriasData = await categoriasRes.json();
      console.log('📦 Categorías recibidas:', categoriasData);
      
      if (categoriasData.success) {
        setCategorias(categoriasData.data);
        
        // Obtener conteo de productos por categoría
        const counts = {};
        for (const categoria of categoriasData.data) {
          try {
            const productosRes = await fetch(`/api/productos/categoria/${categoria.id}`);
            if (productosRes.ok) {
              const productosData = await productosRes.json();
              counts[categoria.id] = productosData.success ? productosData.data.length : 0;
            } else {
              counts[categoria.id] = 0;
            }
          } catch (err) {
            console.error(`Error cargando productos para ${categoria.nombre}:`, err);
            counts[categoria.id] = 0;
          }
        }
        setProductCounts(counts);
      } else {
        throw new Error('No se pudieron cargar las categorías');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error.message);
      
      // Categorías por defecto en caso de error
      const defaultCategorias = [
        { id: 'supermercado', nombre: 'Supermercado', icono: '🛒' },
        { id: 'electrodomesticos', nombre: 'Electrodomésticos', icono: '🏠' },
        { id: 'jugueteria', nombre: 'Juguetería', icono: '🧸' },
        { id: 'tecnologia', nombre: 'Tecnología', icono: '💻' },
        { id: 'bebidas', nombre: 'Bebidas', icono: '🥤' },
      ];
      setCategorias(defaultCategorias);
      
      // Conteos por defecto
      const defaultCounts = {
        'supermercado': 3,
        'electrodomesticos': 2,
        'jugueteria': 2,
        'tecnologia': 2,
        'bebidas': 2
      };
      setProductCounts(defaultCounts);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      'supermercado': 'from-green-500 to-green-600',
      'electrodomesticos': 'from-blue-500 to-blue-600',
      'jugueteria': 'from-orange-500 to-orange-600',
      'tecnologia': 'from-purple-500 to-purple-600',
      'bebidas': 'from-red-500 to-red-600',
    };
    return colors[categoryId] || 'from-gray-500 to-gray-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando categorías...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex space-x-2 text-sm text-gray-500 mb-2">
                <Link href="/" className="hover:text-blue-600">Inicio</Link>
                <span>/</span>
                <span className="text-gray-900">Categorías</span>
              </nav>
              <h1 className="text-4xl font-bold text-gray-900">
                Todas las Categorías
              </h1>
              <p className="text-gray-600 mt-2">
                Explora nuestra selección organizada por categorías
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-yellow-600 text-lg mr-3">⚠️</div>
              <div>
                <p className="text-yellow-800 font-medium">{error}</p>
                <p className="text-yellow-700 text-sm mt-1">
                  Mostrando categorías con datos de ejemplo.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid de categorías */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {categorias.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorias.map((categoria) => (
                <Link
                  key={categoria.id}
                  href={`/categorias/${categoria.id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className={`h-4 bg-gradient-to-r ${getCategoryColor(categoria.id)}`}></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-4xl">{categoria.icono}</div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {productCounts[categoria.id] || 0}
                          </div>
                          <div className="text-sm text-gray-500">productos</div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {categoria.nombre}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        Descubre nuestra selección de productos en {categoria.nombre.toLowerCase()}
                      </p>
                      
                      <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        <span>Explorar categoría</span>
                        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Estadísticas */}
            <div className="mt-12 bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Resumen de Categorías</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categorias.map((categoria) => (
                  <div key={categoria.id} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">{categoria.icono}</div>
                    <div className="font-semibold text-gray-900">{categoria.nombre}</div>
                    <div className="text-sm text-gray-600">{productCounts[categoria.id] || 0} productos</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No hay categorías disponibles
            </h3>
            <p className="text-gray-600 mb-6">
              Las categorías se cargarán pronto
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}