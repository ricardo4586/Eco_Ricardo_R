// context/AuthContext.jsx - FUNCIÓN LOGIN CORREGIDA
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setAuthToken(token);
      setUser(JSON.parse(userData));
    }
    setIsCheckingAuth(false);
  }, []);

  const login = async (email, password) => {
    try {
      const API_BASE_URL = 'http://localhost:3000/api';
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, rol } = data;
        
        // Persistencia en localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify({ email, role: rol }));

        setAuthToken(token);
        setUser({ email, role: rol });
        
        // Redirigir al usuario
        if (rol === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
        
        // ✅ RETORNAR EL OBJETO ESPERADO
        return { 
          success: true, 
          message: '¡Inicio de sesión exitoso!' 
        };
      } else {
        // ✅ RETORNAR OBJETO INCLUSO EN ERROR
        return { 
          success: false, 
          message: data.message || 'Credenciales incorrectas.' 
        };
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      // ✅ RETORNAR OBJETO EN CASO DE EXCEPCIÓN
      return { 
        success: false, 
        message: 'Error de conexión con el servidor.' 
      };
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    router.push('/login');
  };

  const value = {
    authToken,
    user,
    login,
    logout,
    isLoggedIn: !!authToken,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};