// Archivo: components/Admin/StatBar.jsx
// Componente reutilizable para visualizar métricas de ventas en el dashboard.
"use client";

import React from 'react';

// --- COMPONENTE: Barra de Estadísticas (StatBar) ---
const StatBar = ({ item, maxSales }) => {
    // Calcula el porcentaje respecto al producto más vendido (maxSales)
    const percentage = ((item.sales / maxSales) * 100).toFixed(0);

    return (
        <div className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg shadow-sm">
            
            {/* Nombre del Producto */}
            <span className="w-1/4 font-semibold text-gray-700 truncate">{item.product}</span>
            
            {/* Barra de Progreso */}
            <div className="flex-grow bg-gray-200 rounded-full h-3">
                <div 
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-700 ease-out" 
                    style={{ width: `${percentage}%` }}
                    title={`Representa el ${percentage}% de las ventas máximas`}
                ></div>
            </div>
            
            {/* Valor de Ventas */}
            <span className="w-12 text-right font-bold text-indigo-800">{item.sales}</span>
        </div>
    );
};

export default StatBar;