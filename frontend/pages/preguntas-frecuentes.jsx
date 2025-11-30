// frontend/pages/preguntas-frecuentes.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

export default function PreguntasFrecuentes() {
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  const faqs = [
    {
      pregunta: "¿Cuáles son los métodos de pago aceptados?",
      respuesta: "Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal, y transferencias bancarias. Todos los pagos son procesados de forma segura."
    },
    {
      pregunta: "¿Cuánto tiempo tarda el envío?",
      respuesta: "Los envíos estándar tardan entre 24-48 horas. Para envíos express, el tiempo es de 12-24 horas. El tiempo puede variar dependiendo de tu ubicación."
    },
    {
      pregunta: "¿Ofrecen envío gratis?",
      respuesta: "Sí, ofrecemos envío gratis en todas las compras mayores a $50. Para compras menores, el costo de envío es de $5.99."
    },
    {
      pregunta: "¿Puedo cambiar o devolver un producto?",
      respuesta: "Sí, aceptamos devoluciones y cambios dentro de los 30 días posteriores a la compra. El producto debe estar en su estado original y con el empaque intacto."
    },
    {
      pregunta: "¿Cómo puedo rastrear mi pedido?",
      respuesta: "Una vez que tu pedido sea enviado, recibirás un email con el número de seguimiento y un enlace para rastrear tu paquete en tiempo real."
    },
    {
      pregunta: "¿Tienen tiendas físicas?",
      respuesta: "Sí, tenemos varias tiendas físicas. Puedes encontrar la más cercana en nuestra página de tiendas o contactarnos para obtener direcciones específicas."
    }
  ];

  const togglePregunta = (index) => {
    setPreguntaAbierta(preguntaAbierta === index ? null : index);
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Preguntas Frecuentes</h1>
            <p className="text-gray-600 mt-1">Encuentra respuestas a las preguntas más comunes</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => togglePregunta(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.pregunta}</span>
                {preguntaAbierta === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {preguntaAbierta === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.respuesta}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contacto adicional */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">¿No encontraste tu respuesta?</h3>
          <p className="text-gray-600 mb-4">Nuestro equipo de soporte está aquí para ayudarte</p>
          <Link
            href="/contacto"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contactar soporte
          </Link>
        </div>
      </div>
    </div>
  );
}