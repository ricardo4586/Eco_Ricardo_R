// frontend/pages/favoritos.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';

export default function FavoritosPage() {
  const { favorites, toggleFavorite, addToCart, removeFromCart } = useCart();

  const handleAddToCartFromFavorites = (product) => {
    addToCart(product);
  };

  const handleRemoveFavorite = (product) => {
    toggleFavorite(product);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Volver al inicio
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mis Favoritos</h1>
                <p className="text-gray-600 mt-1">Productos que te han gustado</p>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No tienes favoritos</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Los productos que marques con el corazón aparecerán aquí para que no se te olviden.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <ShoppingCart size={18} className="mr-2" />
              Explorar productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Volver al inicio
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mis Favoritos</h1>
              <p className="text-gray-600 mt-1">
                {favorites.length} producto{favorites.length !== 1 ? 's' : ''} en tu lista de deseos
              </p>
            </div>
          </div>
        </div>

        {/* Grid de favoritos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div key={product.barcode} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Imagen del producto */}
              <div className="relative">
                <img 
                  src="https://placehold.co/600x400/6B7280/ffffff?text=Producto" 
                  alt={product.nombre}
                  className="w-full h-48 object-cover"
                />
                
                {/* Botón eliminar favorito */}
                <button
                  onClick={() => handleRemoveFavorite(product)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Contenido */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                  {product.nombre}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.descripcion || 'Sin descripción'}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.precio?.toFixed(2) || '0.00'}
                  </span>
                  
                  {product.stock !== undefined && (
                    <span className={`text-sm px-2 py-1 rounded ${
                      product.stock === 0 
                        ? 'bg-red-100 text-red-800' 
                        : product.stock < 5 
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock === 0 ? 'Agotado' : `${product.stock} en stock`}
                    </span>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCartFromFavorites(product)}
                    disabled={product.stock === 0}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      product.stock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    <ShoppingCart size={16} className="inline mr-2" />
                    Agregar
                  </button>
                  
                  <button
                    onClick={() => handleRemoveFavorite(product)}
                    className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Acciones globales */}
        {favorites.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  ¿Listo para comprar tus favoritos?
                </h3>
                <p className="text-gray-600 text-sm">
                  Agrega todos los productos al carrito de una vez
                </p>
              </div>
              
              <button
                onClick={() => favorites.forEach(product => {
                  if (product.stock !== 0) {
                    addToCart(product);
                  }
                })}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <ShoppingCart size={18} className="mr-2" />
                Agregar todos al carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}