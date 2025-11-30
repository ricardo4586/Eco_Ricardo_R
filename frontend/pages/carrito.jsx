// frontend/pages/carrito.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard, ShoppingBag } from 'lucide-react';

export default function CarritoPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal, cartCount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simular proceso de checkout
    setTimeout(() => {
      alert('¡Compra realizada con éxito!');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  const total = getCartTotal();

  if (cart.length === 0) {
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
                <h1 className="text-3xl font-bold text-gray-900">Mi Carrito</h1>
                <p className="text-gray-600 mt-1">Revisa y gestiona tus productos</p>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Agrega algunos productos increíbles a tu carrito y vuelve aquí para finalizar tu compra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ShoppingBag size={18} className="mr-2" />
                Explorar productos
              </Link>
              <Link
                href="/favoritos"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ShoppingCart size={18} className="mr-2" />
                Ver favoritos
              </Link>
            </div>
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
              <h1 className="text-3xl font-bold text-gray-900">Mi Carrito</h1>
              <p className="text-gray-600 mt-1">
                {cartCount} producto{cartCount !== 1 ? 's' : ''} en tu carrito
              </p>
            </div>
          </div>
          
          <button
            onClick={clearCart}
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} className="mr-2" />
            Vaciar carrito
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.barcode} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Imagen */}
                  <img 
                    src="https://placehold.co/600x400/6B7280/ffffff?text=Producto" 
                    alt={item.nombre}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  {/* Información del producto */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {item.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                      {item.descripcion || 'Sin descripción'}
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      ${item.precio?.toFixed(2)}
                    </p>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(item.barcode, item.quantity - 1)}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span className="w-12 text-center font-semibold text-gray-900">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => handleQuantityChange(item.barcode, item.quantity + 1)}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Subtotal y eliminar */}
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-gray-900">
                      ${(item.precio * item.quantity).toFixed(2)}
                    </span>
                    
                    <button
                      onClick={() => removeFromCart(item.barcode)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen del pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Productos ({cartCount})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Impuestos</span>
                  <span>${(total * 0.16).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${(total * 1.16).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isCheckingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard size={18} className="mr-2" />
                    Proceder al pago
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <Link
                  href="/favoritos"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Ver mis favoritos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}