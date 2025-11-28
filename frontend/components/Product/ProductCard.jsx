// components/Product/ProductCard.jsx
"use client";

import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ name, price, barcode }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">
            <img 
                src="https://placehold.co/600x400/6B7280/ffffff?text=Producto" 
                alt={name} 
                className="w-full h-48 object-cover"
            />
            <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 truncate mb-1">{name}</h3>
                <p className="text-2xl font-bold text-indigo-700 mb-3">${price ? price.toFixed(2) : 'N/A'}</p>
                <p className="text-sm text-gray-500">Código: {barcode}</p>
                <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center">
                    <ShoppingCart size={18} className="mr-2" /> 
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;