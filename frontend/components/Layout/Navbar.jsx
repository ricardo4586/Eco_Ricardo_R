// components/Layout/Navbar.jsx - VERSIÓN CORREGIDA
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Heart, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { isLoggedIn, isAdmin, logout, user } = useAuth();
  const { favorites, cartCount } = useCart();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  
  const dropdownRef = useRef(null);
  const categoriesButtonRef = useRef(null);

  // Cargar categorías al montar el componente
  useEffect(() => {
    console.log('🔄 useEffect - Iniciando carga de categorías');
    fetchCategorias();
  }, []);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          categoriesButtonRef.current && !categoriesButtonRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchCategorias = async () => {
    try {
      console.log('📡 Fetching categorías...');
      
      // Usar URL relativa
      const res = await fetch('/api/categorias');
      console.log('📊 Response status:', res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('📦 Datos recibidos de API:', data);
      
      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ ${data.data.length} categorías cargadas:`, data.data);
        setCategorias(data.data);
      } else {
        console.warn('⚠️ Estructura de datos inválida:', data);
        throw new Error('Estructura de datos inválida');
      }
      
    } catch (err) {
      console.error('❌ Error cargando categorías:', err);
      
      // Categorías por defecto
      const defaultCats = [
        { id: 'supermercado', nombre: 'Supermercado', icono: '🛒' },
        { id: 'electrodomesticos', nombre: 'Electrodomésticos', icono: '🏠' },
        { id: 'jugueteria', nombre: 'Juguetería', icono: '🧸' },
        { id: 'tecnologia', nombre: 'Tecnología', icono: '💻' },
        { id: 'bebidas', nombre: 'Bebidas', icono: '🥤' },
      ];
      console.log('🔄 Usando categorías por defecto:', defaultCats);
      setCategorias(defaultCats);
    } finally {
      setLoadingCategorias(false);
      console.log('🏁 Loading finalizado');
    }
  };

  // En tu Navbar.jsx - actualiza la función handleSearch
   const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
    console.log('🔍 Buscando:', searchTerm);
    // Navegar a la página de búsqueda con el término
    router.push(`/busqueda?q=${encodeURIComponent(searchTerm.trim())}`);
    // Opcional: limpiar el campo de búsqueda después de buscar
    setSearchTerm('');
  } else {
    console.log('⚠️ Campo de búsqueda vacío');
    // Puedes mostrar un mensaje al usuario si quieres
  }
};

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
    } else {
      router.push('/login');
    }
  };

  const handleCategoryClick = (categoriaId) => {
    console.log('🎯 Click en categoría:', categoriaId);
    setIsCategoriesOpen(false);
    router.push(`/categorias/${categoriaId}`);
  };

  const handleFavoritesClick = () => {
    router.push('/favoritos');
  };

  const handleCartClick = () => {
    router.push('/carrito');
  };

  // Iconos SVG
  const MenuIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const LogoutIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );

  const ChartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  console.log('🎨 Renderizando Navbar - categorias:', categorias.length, 'loading:', loadingCategorias);

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      {/* Primera franja - Barra superior AMARILLA */}
      <div className="bg-yellow-400 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Lado izquierdo - SOLO BOTÓN CATEGORÍAS */}
          <div className="flex items-center">
            
            {/* BOTÓN CATEGORÍAS */}
            <div className="relative">
              <button 
                ref={categoriesButtonRef}
                className="bg-white text-gray-800 px-4 py-2 rounded-full font-bold text-sm flex items-center shadow-md hover:bg-gray-50 transition-all duration-200 hover:shadow-lg border border-yellow-300"
                onClick={() => {
                  console.log('🖱️ Click en CATEGORÍAS, estado actual:', isCategoriesOpen);
                  setIsCategoriesOpen(!isCategoriesOpen);
                }}
                aria-expanded={isCategoriesOpen}
                aria-haspopup="true"
              >
                <MenuIcon />
                <span className="ml-2">CATEGORÍAS</span>
                <div className={`ml-2 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`}>
                  <ChevronDownIcon />
                </div>
              </button>

              {/* PANEL DESPLEGABLE - CON CATEGORÍAS */}
              {isCategoriesOpen && (
                <div 
                  ref={dropdownRef}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                >
                  
                  {/* ENCABEZADO SIMPLE */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 text-base">CATEGORÍAS</h3>
                  </div>

                  {/* LISTA DE CATEGORÍAS */}
                  <div className="py-2">
                    {loadingCategorias ? (
                      <div className="px-4 py-3 text-gray-500 text-sm">Cargando categorías...</div>
                    ) : categorias.length > 0 ? (
                      categorias.map((categoria) => (
                        <button
                          key={categoria.id}
                          onClick={() => handleCategoryClick(categoria.id)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-150 border-b border-gray-100 last:border-b-0 text-gray-700 hover:text-blue-600 text-sm font-medium"
                        >
                          {categoria.nombre}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-sm">No hay categorías disponibles</div>
                    )}
                  </div>

                </div>
              )}
            </div>

          </div>

          {/* Lado derecho - Iconos de usuario */}
          <div className="flex items-center space-x-4">
            {/* Búsqueda móvil */}
            <button className="lg:hidden p-1 text-gray-800 hover:text-indigo-600 transition">
              <SearchIcon />
            </button>

            {/* Login/Logout */}
            <button
              onClick={handleAuthAction}
              className="flex items-center text-gray-800 hover:text-indigo-600 transition text-sm font-semibold"
            >
              {isLoggedIn ? <LogoutIcon /> : <UserIcon />}
              <span className="ml-1 hidden sm:inline">
                {isLoggedIn ? (isAdmin ? 'Admin' : `Hola, ${user?.name || 'Usuario'}`) : 'Inicia sesión'}
              </span>
            </button>

            {/* Favoritos */}
            <button 
              onClick={handleFavoritesClick}
              className="hidden md:block p-1 text-gray-800 hover:text-red-600 transition relative"
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {favorites.length}
                </div>
              )}
            </button>

            {/* Carrito */}
            <div className="relative">
              <button 
                onClick={handleCartClick}
                className="p-1 text-gray-800 hover:text-indigo-600 transition"
              >
                <ShoppingCart size={20} />
              </button>
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Segunda franja - Logo y búsqueda */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-black text-indigo-700 hover:text-indigo-800 transition">
              ECOM.CLONE
            </h1>
          </Link>

          {/* Barra de búsqueda - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex w-full border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-indigo-500 transition">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="¿Qué buscas hoy? Ej: Laptop, Smartphone..."
                  className="flex-grow px-4 py-2 text-base focus:outline-none placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 hover:bg-indigo-700 transition flex items-center justify-center"
                >
                  <SearchIcon />
                </button>
              </div>
            </form>
          </div>

          {/* Panel Admin */}
          {isAdmin && (
            <Link 
              href="/admin/dashboard"
              className="hidden md:flex flex-col items-center justify-center p-2 text-red-600 hover:text-red-700 transition text-sm font-bold"
            >
              <ChartIcon />
              <span>ADMIN</span>
            </Link>
          )}
        </div>

        {/* Barra de búsqueda - Mobile */}
        <div className="lg:hidden mt-3">
          <form onSubmit={handleSearch}>
            <div className="flex w-full border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-indigo-500 transition">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos..."
                className="flex-grow px-4 py-2 text-base focus:outline-none placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 hover:bg-indigo-700 transition flex items-center justify-center"
              >
                <SearchIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;