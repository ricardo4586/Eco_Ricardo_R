import React from 'react';
import ProductCard from '../components/Product/ProductCard';
import PromoCarousel from '../components/shared/PromoCarousel';

const HomePage = ({ products, error }) => {
  return (
    <div className="page-container">
      <PromoCarousel />
      
      {/* Contenido principal */}
      <div className="container-custom py-8">
        {/* Encabezado */}
        <div className="page-header">
          <h1 className="page-title">Catálogo de Productos</h1>
          <p className="page-subtitle">
            Descubre nuestra selección de productos tecnológicos al mejor precio
          </p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="error-message mb-8">
            <strong>Error al cargar productos:</strong> {error}
          </div>
        )}

        {/* Grid de productos */}
        <div className="products-grid">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard 
                key={product.id}
                name={product.nombre}
                price={product.precio}
                barcode={product.barcode}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg">
                No hay productos disponibles en este momento
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/productos');
    
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
    return {
      props: {
        products: [],
        error: err.message,
      }
    };
  }
}

export default HomePage;