// frontend/pages/politica-privacidad.jsx
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Volver al inicio
          </Link>
          <div className="flex items-center">
            <Shield size={24} className="mr-3 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Política de Privacidad</h1>
              <p className="text-gray-600 mt-1">Cómo protegemos y utilizamos tu información</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Información que Recopilamos</h2>
              <p className="text-gray-600 mb-4">
                Recopilamos información que nos proporcionas directamente, como cuando creas una cuenta, 
                realizas una compra o te contactas con nuestro servicio al cliente.
              </p>
              <ul className="text-gray-600 list-disc list-inside space-y-2">
                <li>Información de contacto (nombre, email, teléfono)</li>
                <li>Información de envío y facturación</li>
                <li>Información de pago (procesada de forma segura)</li>
                <li>Historial de compras y preferencias</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Uso de la Información</h2>
              <p className="text-gray-600 mb-4">Utilizamos tu información para:</p>
              <ul className="text-gray-600 list-disc list-inside space-y-2">
                <li>Procesar tus pedidos y pagos</li>
                <li>Enviar actualizaciones sobre tu pedido</li>
                <li>Mejorar nuestros productos y servicios</li>
                <li>Enviar ofertas promocionales (solo si nos das permiso)</li>
                <li>Proveer soporte al cliente</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Protección de Datos</h2>
              <p className="text-gray-600 mb-4">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal 
                contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies y Tecnologías Similares</h2>
              <p className="text-gray-600 mb-4">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación, 
                analizar el tráfico del sitio web y personalizar el contenido.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tus Derechos</h2>
              <p className="text-gray-600 mb-4">Tienes derecho a:</p>
              <ul className="text-gray-600 list-disc list-inside space-y-2">
                <li>Acceder a tu información personal</li>
                <li>Corregir información inexacta</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Solicitar la portabilidad de tus datos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contacto</h2>
              <p className="text-gray-600">
                Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en:
                <br />
                Email: privacy@ecomclone.com
                <br />
                Teléfono: +1 (555) 123-4567
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}