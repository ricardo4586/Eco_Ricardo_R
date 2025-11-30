// frontend/pages/busqueda.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProductCard from '../components/Product/ProductCard';
import { ArrowLeft, Search, Filter, X } from 'lucide-react';

export default function BusquedaPage() {
  const router = useRouter();
  const { q } = router.query;
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (q) {
      buscarProductos();
    } else {
      setLoading(false);
    }
  }, [q]);

  const buscarProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Buscando productos con término:', q);
      
      const res = await fetch(`/api/productos/buscar?q=${encodeURIComponent(q)}`);
      
      if (!res.ok) {
        throw new Error('Error en la búsqueda');
      }
      
      const data = await res.json();
      console.log('📦 Resultados encontrados:', data);
      
      if (data.success) {
        setResultados(data.data || []);
      } else {
        setResultados([]);
      }
    } catch (err) {
      console.error('❌ Error en búsqueda:', err);
      setError(err.message);
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNuevaBusqueda = (nuevoTermino) => {
    router.push(`/busqueda?q=${encodeURIComponent(nuevoTermino)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4 mb-8">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft size={20} className="mr-2" />
              Volver
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Buscando...</h1>
              <p className="text-gray-600">Buscando "{q}"</p>
            </div>
          </div>
          
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Buscando productos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} className="mr-2" />
            Volver
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {resultados.length > 0 ? `Resultados para "${q}"` : `Búsqueda: "${q}"`}
            </h1>
            <p className="text-gray-600">
              {resultados.length} producto{resultados.length !== 1 ? 's' : ''} encontrado{resultados.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Resultados */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {resultados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resultados.map((producto) => (
              <ProductCard key={producto.barcode} product={producto} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No se encontraron resultados
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              No encontramos productos que coincidan con "{q}". 
              Prueba con otros términos de búsqueda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ArrowLeft size={18} className="mr-2" />
                Volver al inicio
              </button>
              <Link
                href="/categorias"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={18} className="mr-2" />
                Explorar categorías
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}