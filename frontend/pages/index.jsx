// frontend/pages/index.jsx - SIN FOOTER (ya está en _app.jsx)
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../components/Product/ProductCard';
import PromoCarousel from '../components/shared/PromoCarousel';
// ❌ REMOVED: import Footer from '../components/Layout/Footer';

const HomePage = ({ products, error }) => {
  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [categoriasError, setCategoriasError] = useState(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      console.log('🔍 Iniciando carga de categorías...');
      
      const res = await fetch('/api/categorias');
      
      console.log('📡 Respuesta de API:', res.status);
      
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('📦 Datos recibidos:', data);
      
      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ ${data.data.length} categorías cargadas`);
        setCategorias(data.data);
      } else {
        throw new Error('Estructura de datos inválida de la API');
      }
      
    } catch (err) {
      console.error('❌ Error cargando categorías:', err);
      setCategoriasError(err.message);
      
      const categoriasDefault = [
        { id: 'supermercado', nombre: 'Supermercado', icono: '🛒' },
        { id: 'electrodomesticos', nombre: 'Electrodomésticos', icono: '🏠' },
        { id: 'jugueteria', nombre: 'Juguetería', icono: '🧸' },
        { id: 'tecnologia', nombre: 'Tecnología', icono: '💻' },
        { id: 'bebidas', nombre: 'Bebidas', icono: '🥤' },
      ];
      setCategorias(categoriasDefault);
    } finally {
      setLoadingCategorias(false);
    }
  };

  const contarProductosPorCategoria = (categoriaId) => {
    if (!products || !Array.isArray(products)) return 0;
    return products.filter(product => product.categoria === categoriaId).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PromoCarousel />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Catálogo de Productos
          </h1>
          <p className="text-xl text-gray-600">
            Descubre nuestra selección de productos al mejor precio
          </p>
        </div>

        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Nuestras Categorías</h2>
            <Link 
              href="/categorias" 
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors"
            >
              Ver todas →
            </Link>
          </div>
          
          {categoriasError && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                <strong>Nota:</strong> {categoriasError}. Mostrando categorías por defecto.
              </p>
            </div>
          )}
          
          {loadingCategorias ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                  <div className="bg-gray-300 rounded-lg w-16 h-16 mx-auto mb-4"></div>
                  <div className="bg-gray-300 rounded h-4 w-3/4 mx-auto mb-2"></div>
                  <div className="bg-gray-200 rounded h-3 w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : categorias.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categorias.map((categoria) => (
                <Link
                  key={categoria.id}
                  href={`/categorias/${categoria.id}`}
                  className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-300 p-6 text-center group transform hover:-translate-y-1"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {categoria.icono || '📦'}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors mb-2">
                    {categoria.nombre}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    {contarProductosPorCategoria(categoria.id)} productos
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hay categorías disponibles
              </h3>
              <p className="text-gray-500">
                Las categorías se cargarán pronto
              </p>
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Productos Destacados</h2>
            <span className="text-gray-600 font-medium">
              {products?.length || 0} productos disponibles
            </span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <div className="text-red-500 mr-3">⚠️</div>
                <div>
                  <strong className="text-red-800">Error al cargar productos:</strong>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products && products.length > 0 ? (
              products.slice(0, 8).map((product) => (
                <ProductCard 
                  key={product.id || product.barcode}
                  product={product}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="text-6xl mb-4">😴</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  No hay productos disponibles
                </h3>
                <p className="text-gray-600 text-lg">
                  Vuelve pronto para ver nuestro catálogo
                </p>
              </div>
            )}
          </div>

          {products && products.length > 8 && (
            <div className="text-center mt-12">
              <Link
                href="/productos"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Ver todos los productos
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </section>
      </div>

      {/* ❌ REMOVED: <Footer /> */}
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = context.req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    
    console.log('🔄 Cargando productos desde:', `${baseUrl}/api/productos`);
    
    const res = await fetch(`${baseUrl}/api/productos`);
    
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    
    return {
      props: {
        products: data.data || [],
        error: null,
      },
    };
  } catch (err) {
    console.error('❌ Error en getServerSideProps:', err);
    return {
      props: {
        products: [],
        error: err.message,
      }
    };
  }
}

export default HomePage;