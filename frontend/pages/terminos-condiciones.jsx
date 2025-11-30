// frontend/pages/terminos-condiciones.jsx
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TerminosCondiciones() {
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
            <FileText size={24} className="mr-3 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Términos y Condiciones</h1>
              <p className="text-gray-600 mt-1">Última actualización: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceptación de los Términos</h2>
              <p className="text-gray-600 mb-4">
                Al acceder y utilizar el sitio web ECOM.CLONE, usted acepta estar sujeto a estos términos y condiciones de uso, 
                todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Uso de la Licencia</h2>
              <p className="text-gray-600 mb-4">
                Se concede permiso para descargar temporalmente una copia de los materiales en el sitio web ECOM.CLONE 
                solo para visualización transitoria personal y no comercial.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Compras y Pagos</h2>
              <p className="text-gray-600 mb-4">
                Todas las compras realizadas a través de nuestro sitio web están sujetas a confirmación de stock y 
                verificación de método de pago. Nos reservamos el derecho de cancelar cualquier pedido por cualquier motivo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Envíos y Entregas</h2>
              <p className="text-gray-600 mb-4">
                Los tiempos de envío son estimados y pueden variar. No nos hacemos responsables por retrasos causados 
                por compañías de transporte o factores fuera de nuestro control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Devoluciones y Reembolsos</h2>
              <p className="text-gray-600 mb-4">
                Aceptamos devoluciones dentro de los 30 días posteriores a la compra. Los productos deben estar en 
                su estado original y con el empaque intacto. Los costos de envío de devolución corren por cuenta del cliente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitación de Responsabilidad</h2>
              <p className="text-gray-600 mb-4">
                ECOM.CLONE no será responsable de ningún daño que surja del uso o la imposibilidad de uso de los 
                materiales en nuestro sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modificaciones</h2>
              <p className="text-gray-600">
                ECOM.CLONE puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. 
                Al usar este sitio web, usted acepta estar sujeto a la versión actual de estos términos de servicio.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}