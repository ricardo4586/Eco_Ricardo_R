// components/Product/ProductCard.jsx
"use client";

import React, { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart, toggleFavorite, isInCart, isFavorite } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [isFavoriting, setIsFavoriting] = useState(false);

    // Recibimos el objeto product completo en lugar de propiedades individuales
    const { nombre, precio, barcode, categoria, descripcion, stock } = product || {};

    // Función para agregar al carrito
    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        setIsAdding(true);
        addToCart(product);
        
        // Simular un pequeño delay para mejor UX
        setTimeout(() => {
            setIsAdding(false);
        }, 500);
    };

    // Función para toggle favorito
    const handleToggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        setIsFavoriting(true);
        toggleFavorite(product);
        
        setTimeout(() => {
            setIsFavoriting(false);
        }, 300);
    };

    // Función segura para formatear el precio
    const formatPrice = (priceValue) => {
        if (priceValue === null || priceValue === undefined || priceValue === '') {
            return 'N/A';
        }
        
        try {
            // Convertir a número si es string
            const numericPrice = typeof priceValue === 'number' 
                ? priceValue 
                : parseFloat(priceValue);
            
            // Verificar si es un número válido
            if (isNaN(numericPrice)) {
                return 'N/A';
            }
            
            // Formatear a 2 decimales
            return numericPrice.toFixed(2);
        } catch (error) {
            console.error('Error formateando precio:', error);
            return 'N/A';
        }
    };

    // Función para obtener el ícono de categoría
    const getCategoryIcon = (category) => {
        const icons = {
            'supermercado': '🛒',
            'electrodomesticos': '🏠',
            'jugueteria': '🧸',
            'tecnologia': '💻',
            'bebidas': '🥤'
        };
        return icons[category] || '📦';
    };

    // Función para obtener el color de categoría
    const getCategoryColor = (category) => {
        const colors = {
            'supermercado': 'bg-green-100 text-green-800 border-green-200',
            'electrodomesticos': 'bg-blue-100 text-blue-800 border-blue-200',
            'jugueteria': 'bg-orange-100 text-orange-800 border-orange-200',
            'tecnologia': 'bg-purple-100 text-purple-800 border-purple-200',
            'bebidas': 'bg-red-100 text-red-800 border-red-200'
        };
        return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    // Función para obtener el estado del stock
    const getStockStatus = (stock) => {
        if (stock === undefined || stock === null) return null;
        if (stock === 0) return { text: 'Agotado', color: 'text-red-600', bg: 'bg-red-50' };
        if (stock < 5) return { text: `Solo ${stock} disponibles`, color: 'text-orange-600', bg: 'bg-orange-50' };
        if (stock < 10) return { text: `Poco stock`, color: 'text-yellow-600', bg: 'bg-yellow-50' };
        return { text: `En stock`, color: 'text-green-600', bg: 'bg-green-50' };
    };

    const formattedPrice = formatPrice(precio);
    const stockStatus = getStockStatus(stock);
    const productIsInCart = isInCart(barcode);
    const productIsFavorite = isFavorite(barcode);

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group relative">
            
            {/* Botón de favoritos */}
            <button
                onClick={handleToggleFavorite}
                disabled={isFavoriting}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md transition-all duration-200 ${
                    productIsFavorite 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-white text-gray-400 hover:bg-gray-50 hover:text-red-500'
                } ${isFavoriting ? 'scale-110' : ''}`}
            >
                <Heart 
                    size={18} 
                    fill={productIsFavorite ? "currentColor" : "none"}
                    className={isFavoriting ? 'animate-pulse' : ''}
                />
            </button>

            {/* Imagen del producto */}
            <div className="relative overflow-hidden">
                <img 
                    src="https://placehold.co/600x400/6B7280/ffffff?text=Producto" 
                    alt={nombre} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge de categoría */}
                <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(categoria)}`}>
                        <span className="mr-1">{getCategoryIcon(categoria)}</span>
                        {categoria || 'Sin categoría'}
                    </span>
                </div>
            </div>

            {/* Contenido del producto */}
            <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 truncate mb-2 group-hover:text-indigo-600 transition-colors">
                    {nombre || 'Producto sin nombre'}
                </h3>
                
                {descripcion && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {descripcion}
                    </p>
                )}
                
                <p className="text-2xl font-bold text-indigo-700 mb-3">${formattedPrice}</p>
                
                {/* Información adicional */}
                <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-500">Código: {barcode}</p>
                    
                    {stockStatus && (
                        <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                            {stockStatus.text}
                        </div>
                    )}
                </div>
                
                {/* Botón de agregar al carrito */}
                <button 
                    onClick={handleAddToCart}
                    disabled={isAdding || (stock !== undefined && stock === 0)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                        isAdding || productIsInCart
                            ? 'bg-green-600 text-white cursor-not-allowed' 
                            : (stock === 0 
                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                                : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md')
                    }`}
                >
                    {isAdding ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Agregando...
                        </>
                    ) : productIsInCart ? (
                        <>
                            <ShoppingCart size={18} className="mr-2" />
                            ✅ En carrito
                        </>
                    ) : stock === 0 ? (
                        '❌ Agotado'
                    ) : (
                        <>
                            <ShoppingCart size={18} className="mr-2" />
                            Agregar al Carrito
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;