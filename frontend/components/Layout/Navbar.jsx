// components/Layout/Navbar.jsx - CORREGIDO
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, isAdmin, logout, user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Búsqueda: ${searchTerm}`);
  };

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
    } else {
      router.push('/login');
    }
  };

  // Iconos SVG inline
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

  const HeartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  const CartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  const ChartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      {/* Primera franja - Barra superior */}
      <div className="bg-yellow-400 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Lado izquierdo - Categorías */}
          <div className="flex items-center space-x-4">
            <button className="bg-white text-gray-800 px-4 py-1.5 rounded-full font-bold text-sm flex items-center shadow-md hover:bg-gray-50 transition">
              <MenuIcon />
              <span className="ml-1">CATEGORÍAS</span>
            </button>
            <span className="hidden md:inline-block text-gray-800 text-sm cursor-pointer hover:underline">
              Entrega rápida
            </span>
          </div>

          {/* Lado derecho - Iconos de usuario */}
          <div className="flex items-center space-x-4">
            {/* Búsqueda móvil */}
            <button className="lg:hidden p-1">
              <SearchIcon />
            </button>

            {/* Login/Logout */}
            <button
              onClick={handleAuthAction}
              className="flex items-center text-gray-800 hover:text-indigo-600 transition text-sm font-medium"
            >
              {isLoggedIn ? <LogoutIcon /> : <UserIcon />}
              <span className="ml-1 hidden sm:inline">
                {isLoggedIn ? (isAdmin ? 'Admin' : `Hola, ${user?.name || 'Usuario'}`) : 'Inicia sesión'}
              </span>
            </button>

            {/* Favoritos */}
            <button className="hidden md:block p-1 text-gray-800 hover:text-red-600 transition">
              <HeartIcon />
            </button>

            {/* Carrito */}
            <div className="relative">
              <button className="p-1 text-gray-800 hover:text-indigo-600 transition">
                <CartIcon />
              </button>
              <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                3
              </div>
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