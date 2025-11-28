// Archivo: hooks/useFetch.js
// Hook personalizado para manejar peticiones GET al API de Express.
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext'; // Importar el contexto de autenticación

const useFetch = (endpoint, { initialData = null, requiresAuth = false } = {}) => {
    const { authToken, isLoggedIn, API_BASE_URL } = useAuth();
    
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        // Si requiere autenticación y el usuario no está logueado o no hay token, salir.
        if (requiresAuth && (!isLoggedIn || !authToken)) {
            setError("Authentication required for this resource.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const url = `${API_BASE_URL}${endpoint}`;
            
            const headers = {
                'Content-Type': 'application/json',
            };

            // Añadir el token de autorización si es necesario
            if (requiresAuth && authToken) {
                headers['Authorization'] = `Bearer ${authToken}`;
            }

            const response = await fetch(url, { headers });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `API Error: ${response.status}`);
            }

            const result = await response.json();
            setData(result.data); // Asumimos que la data viene dentro de la propiedad 'data' del JSON del API
            
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
            setData(initialData);
        } finally {
            setLoading(false);
        }
    }, [endpoint, requiresAuth, authToken, isLoggedIn, API_BASE_URL, initialData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]); // La dependencia fetchData está envuelta en useCallback, es seguro.

    // Función para forzar la recarga de datos
    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch };
};

export default useFetch;