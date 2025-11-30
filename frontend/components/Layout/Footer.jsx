// frontend/components/Layout/Footer.jsx
import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Store, Truck, CreditCard, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Sección principal del footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Información de la empresa */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <h2 className="text-2xl font-black text-white">ECOM.CLONE</h2>
            </Link>
            <p className="text-gray-300 mb-4 text-sm">
              Tu tienda online de confianza. Ofrecemos los mejores productos con la mejor calidad y servicio al cliente.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-300 text-sm">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Mail size={16} className="mr-2" />
                <span>info@ecomclone.com</span>
              </div>
            </div>
          </div>

          {/* Cómo comprar */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <ShoppingBag size={20} className="mr-2" />
              Cómo comprar
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/guia-compra" className="hover:text-white transition-colors">
                  • Guía de compra paso a paso
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="hover:text-white transition-colors">
                  • Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="/terminos-condiciones" className="hover:text-white transition-colors">
                  • Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidad" className="hover:text-white transition-colors">
                  • Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Tiendas */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Store size={20} className="mr-2" />
              Tiendas
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/tiendas" className="hover:text-white transition-colors flex items-center">
                  <MapPin size={14} className="mr-2" />
                  Encuentra tu tienda más cercana
                </Link>
              </li>
              <li>
                <Link href="/horarios" className="hover:text-white transition-colors">
                  • Horarios de atención
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  • Contacta con nosotros
                </Link>
              </li>
              <li>
                <Link href="/trabaja-con-nosotros" className="hover:text-white transition-colors">
                  • Trabaja con nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Envíos y Pagos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Truck size={20} className="mr-2" />
              Envíos & Pagos
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-white text-sm mb-1 flex items-center">
                  <Truck size={14} className="mr-2" />
                  Envíos
                </h4>
                <p className="text-gray-300 text-sm">
                  Envío gratis en compras mayores a $50. Entrega en 24-48 horas.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-white text-sm mb-1 flex items-center">
                  <CreditCard size={14} className="mr-2" />
                  Pagos
                </h4>
                <p className="text-gray-300 text-sm">
                  Aceptamos tarjetas, PayPal y transferencias bancarias.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 ECOM.CLONE. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/terminos" className="text-gray-300 hover:text-white text-sm transition-colors">
                Términos
              </Link>
              <Link href="/privacidad" className="text-gray-300 hover:text-white text-sm transition-colors">
                Privacidad
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;