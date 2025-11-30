// frontend/pages/guia-compra.jsx
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Search, CreditCard, Truck, Shield } from 'lucide-react';

export default function GuiaCompra() {
  const pasos = [
    {
      icon: <Search size={24} />,
      titulo: "1. Encuentra productos",
      descripcion: "Navega por nuestras categorías o usa el buscador para encontrar lo que necesitas."
    },
    {
      icon: <ShoppingCart size={24} />,
      titulo: "2. Agrega al carrito",
      descripcion: "Haz clic en 'Agregar al carrito' en los productos que desees comprar."
    },
    {
      icon: <CreditCard size={24} />,
      titulo: "3. Revisa y paga",
      descripcion: "Ve a tu carrito, revisa los productos y selecciona tu método de pago."
    },
    {
      icon: <Truck size={24} />,
      titulo: "4. Recibe tu pedido",
      descripcion: "Tu pedido será enviado y lo recibirás en la dirección que especificaste."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Volver al inicio
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Guía de Compra</h1>
            <p className="text-gray-600 mt-1">Aprende a comprar en ECOM.CLONE en simples pasos</p>
          </div>
        </div>

        {/* Pasos de compra */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cómo comprar en 4 pasos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pasos.map((paso, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  {paso.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{paso.titulo}</h3>
                  <p className="text-gray-600 text-sm">{paso.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield size={20} className="mr-2 text-green-600" />
              Compra segura
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Tus datos están protegidos con encriptación SSL</li>
              <li>• No almacenamos información de tu tarjeta</li>
              <li>• Garantía de devolución en 30 días</li>
              <li>• Soporte al cliente 24/7</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">¿Necesitas ayuda?</h3>
            <div className="space-y-3">
              <Link href="/preguntas-frecuentes" className="block text-blue-600 hover:text-blue-700">
                • Preguntas frecuentes
              </Link>
              <Link href="/contacto" className="block text-blue-600 hover:text-blue-700">
                • Contactar con soporte
              </Link>
              <Link href="/terminos-condiciones" className="block text-blue-600 hover:text-blue-700">
                • Términos y condiciones
              </Link>
              <Link href="/politica-privacidad" className="block text-blue-600 hover:text-blue-700">
                • Política de privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}