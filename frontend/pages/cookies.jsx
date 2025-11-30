// frontend/pages/cookies.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Cookie, Shield, AlertCircle, CheckCircle, Settings, MessageCircle } from 'lucide-react';

export default function Cookies() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Cargar preferencias guardadas
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handlePreferenceChange = (type) => {
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    
    // Aquí puedes agregar la lógica para inicializar/remover servicios
    if (cookiePreferences.analytics) {
      console.log('Inicializando servicios de analytics');
    }
    
    if (cookiePreferences.marketing) {
      console.log('Inicializando servicios de marketing');
    }

    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    console.log('Todas las cookies aceptadas');
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const rejectNonEssential = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false
    };
    setCookiePreferences(onlyEssential);
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyEssential));
    console.log('Solo cookies esenciales aceptadas');
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
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
            <h1 className="text-3xl font-bold text-gray-900">Política de Cookies</h1>
            <p className="text-gray-600 mt-1">Gestiona tus preferencias de privacidad</p>
          </div>
        </div>

        {/* Alert de confirmación */}
        {showConfirmation && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <CheckCircle size={20} className="text-green-600 mr-2" />
            <span className="text-green-800 font-medium">
              Preferencias guardadas correctamente
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información sobre cookies */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Cookie size={24} className="text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">¿Qué son las cookies?</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
                cuando visitas nuestro sitio web. Nos ayudan a proporcionarte una mejor 
                experiencia de usuario y a entender cómo interactúas con nuestro contenido.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Cookies Esenciales</h4>
                    <p className="text-blue-800 text-sm">
                      Siempre activas - necesarias para el funcionamiento básico del sitio 
                      (inicio de sesión, carrito de compras, seguridad).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tipos de cookies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Settings size={24} className="text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Tipos de Cookies</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Shield size={20} className="text-gray-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Cookies Esenciales</h3>
                    <p className="text-gray-600 text-sm">
                      Necesarias para el funcionamiento básico del sitio. Incluyen funciones 
                      de seguridad, gestión de sesiones y preferencias de accesibilidad.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">Cookies de Analytics</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookiePreferences.analytics}
                          onChange={() => handlePreferenceChange('analytics')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Nos ayudan a entender cómo los visitantes interactúan con el sitio 
                      para mejorar la experiencia de usuario.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">Cookies de Marketing</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookiePreferences.marketing}
                          onChange={() => handlePreferenceChange('marketing')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Utilizadas para mostrar publicidad relevante y medir la efectividad 
                      de nuestras campañas publicitarias.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de control */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Gestionar Cookies</h3>
              
              <div className="space-y-4">
                <button
                  onClick={acceptAll}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <CheckCircle size={18} className="mr-2" />
                  Aceptar Todas
                </button>

                <button
                  onClick={savePreferences}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Settings size={18} className="mr-2" />
                  Guardar Preferencias
                </button>

                <button
                  onClick={rejectNonEssential}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center"
                >
                  <Shield size={18} className="mr-2" />
                  Rechazar No Esenciales
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Estado Actual</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Esenciales:</span>
                    <span className="text-green-600 font-medium">Activadas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Analytics:</span>
                    <span className={cookiePreferences.analytics ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                      {cookiePreferences.analytics ? 'Activadas' : 'Desactivadas'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marketing:</span>
                    <span className={cookiePreferences.marketing ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                      {cookiePreferences.marketing ? 'Activadas' : 'Desactivadas'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Más Información</h3>
              
              <div className="space-y-3 text-sm">
                <p className="text-gray-600">
                  Para más detalles sobre cómo utilizamos tus datos, consulta nuestra{' '}
                  <Link href="/politica-privacidad" className="text-blue-600 hover:text-blue-800 underline font-semibold">
                    Política de Privacidad
                  </Link>.
                </p>
                
                <p className="text-gray-600">
                  Puedes cambiar estas preferencias en cualquier momento volviendo a esta página.
                </p>

                <div className="pt-3 border-t border-gray-200">
                  <Link 
                    href="/contacto" 
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    ¿Tienes preguntas? Contáctanos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}