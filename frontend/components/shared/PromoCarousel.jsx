// components/shared/PromoCarousel.jsx - CÓDIGO COMPLETO ACTUALIZADO
"use client";

import React, { useState, useEffect } from 'react';

// Iconos SVG inline mejorados
const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-800">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-800">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const PromoCarousel = () => {
    const banners = [
        { 
            title: "OFERTAS FLASH 🔥", 
            subtitle: "Compra hoy y recibe tu pedido en 24h.", 
            bgColor: "bg-gradient-to-r from-gray-900 to-gray-700",
            textColor: "text-white",
            buttonColor: "bg-yellow-400 hover:bg-yellow-300 text-gray-900"
        },
        { 
            title: "BLACK FRIDAY", 
            subtitle: "¡Hasta 70% de descuento en electrónica!", 
            bgColor: "bg-gradient-to-r from-red-800 to-red-600",
            textColor: "text-white",
            buttonColor: "bg-white hover:bg-gray-100 text-red-800"
        },
        { 
            title: "TECNOLOGÍA 🚀", 
            subtitle: "Los mejores precios en laptops y smartphones", 
            bgColor: "bg-gradient-to-r from-blue-800 to-blue-600",
            textColor: "text-white",
            buttonColor: "bg-cyan-400 hover:bg-cyan-300 text-gray-900"
        },
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    // Auto-avance cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentBanner = banners[currentIndex];

    return (
        <div className={`promo-carousel ${currentBanner.bgColor} py-16 md:py-24 overflow-hidden shadow-2xl transition-all duration-500`}>
            {/* Efecto de partículas de fondo */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-16 h-16 bg-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-white rounded-full"></div>
            </div>
            
            <div className="container-custom flex justify-center items-center relative z-10">
                <div className={`promo-carousel-content ${currentBanner.textColor} max-w-4xl`}>
                    <h2 className="promo-carousel-title">
                        {currentBanner.title}
                    </h2>
                    <p className="promo-carousel-subtitle">
                        {currentBanner.subtitle}
                    </p>
                    <button className={`promo-carousel-button ${currentBanner.buttonColor}`}>
                        Ver Catálogo Ahora ▶
                    </button>
                </div>
            </div>

            {/* Botones de navegación */}
            <button 
                onClick={prevSlide}
                className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-20 focus-ring"
                aria-label="Anterior"
            >
                <ChevronLeft />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-20 focus-ring"
                aria-label="Siguiente"
            >
                <ChevronRight />
            </button>

            {/* Indicadores mejorados */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-300 focus-ring ${
                            index === currentIndex 
                                ? 'bg-white scale-125' 
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
//hola//
export default PromoCarousel;