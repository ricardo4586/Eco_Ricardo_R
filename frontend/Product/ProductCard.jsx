// components/Product/ProductCard.jsx - MEJOR DISEÑO
"use client";

import React, { useState } from 'react';

// Icono SVG inline para carrito
const ShoppingCartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ProductCard = ({ name, price, barcode }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Imagen del producto */}
            <div className="relative overflow-hidden">
                <img 
                    src={`https://picsum.photos/400/300?random=${barcode}`}
                    alt={name} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = "https://placehold.co/400x300/6B7280/ffffff?text=Producto";
                    }}
                />
                {/* Badge de oferta */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    OFERTA
                </div>
            </div>
            
            {/* Contenido de la tarjeta */}
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {name}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                    <p className="text-2xl font-bold text-indigo-700">${price ? price.toFixed(2) : '0.00'}</p>
                    <div className="flex items-center text-amber-500">
                        <span className="text-sm font-medium">⭐ 4.5</span>
                    </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-4 font-mono">Código: {barcode}</p>
                
                <button className={`
                    w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2
                    ${isHovered 
                        ? 'bg-indigo-600 text-white transform -translate-y-1 shadow-lg' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }
                `}>
                    <ShoppingCartIcon />
                    {isHovered ? 'Agregar al Carrito' : 'Comprar Ahora'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;