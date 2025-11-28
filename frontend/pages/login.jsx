// pages/login.jsx - CON MEJOR MANEJO DE ERRORES
"use client";

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Redirigir si ya está logueado
  React.useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // ✅ VERIFICAR QUE login EXISTA Y SEA UNA FUNCIÓN
      if (typeof login !== 'function') {
        throw new Error('Función de login no disponible');
      }

      const result = await login(email, password);
      
      // ✅ VERIFICAR QUE result NO SEA undefined
      if (!result) {
        throw new Error('No se recibió respuesta del servidor');
      }

      setLoading(false);
      
      // ✅ USAR OPERADOR DE COALESCENCIA POR SI result ES null/undefined
      setMessage(result?.message || 'Proceso completado');
      
      if (!result.success) {
        // Limpiar mensaje después de 3 segundos si falla
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.message || 'Error durante el inicio de sesión');
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Accede a tu cuenta de ECOM.CLONE
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-primary"
                  placeholder="admin@ecommerce.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-primary"
                  placeholder="password123"
                />
              </div>
            </div>

            {/* Mensaje de estado */}
            {message && (
              <div className={`p-3 rounded-md text-center ${
                message.includes('éxito') || message.includes('exitoso') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>

          {/* Credenciales de prueba */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Credenciales de prueba:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Admin:</strong> admin@ecommerce.com / password123</p>
              <p><strong>Usuario:</strong> staff@ecommerce.com / password456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;