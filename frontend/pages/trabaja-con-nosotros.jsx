// frontend/pages/trabaja-con-nosotros.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Briefcase, Heart, Award, Baby, ToyBrick, Gift, Star } from 'lucide-react';

export default function TrabajaConNosotros() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    puesto: '',
    experiencia: '',
    mensaje: ''
  });

  const puestos = [
    {
      titulo: "Asesor de Ventas Infantiles",
      departamento: "Ventas",
      tipo: "Tiempo completo",
      ubicacion: "Presencial"
    },
    {
      titulo: "Especialista en Productos para Bebés",
      departamento: "Producto",
      tipo: "Tiempo completo",
      ubicacion: "Híbrido"
    },
    {
      titulo: "Atención al Cliente Familiar",
      departamento: "Soporte",
      tipo: "Medio tiempo",
      ubicacion: "Remoto"
    },
    {
      titulo: "Community Manager Infantil",
      departamento: "Marketing",
      tipo: "Tiempo completo",
      ubicacion: "Remoto"
    }
  ];

  const beneficios = [
    { 
      icon: <Baby size={24} />, 
      titulo: "Descuentos en Productos", 
      descripcion: "Beneficios especiales en nuestra tienda infantil" 
    },
    { 
      icon: <Heart size={24} />, 
      titulo: "Salud y Bienestar", 
      descripcion: "Seguro médico y programas wellness familiar" 
    },
    { 
      icon: <Briefcase size={24} />, 
      titulo: "Flexibilidad", 
      descripcion: "Horarios flexibles para conciliar vida familiar" 
    },
    { 
      icon: <Award size={24} />, 
      titulo: "Capacitación Continua", 
      descripcion: "Formación en productos y desarrollo infantil" 
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por tu interés en unirte a nuestro equipo infantil! Revisaremos tu aplicación pronto.');
    setFormData({ nombre: '', email: '', puesto: '', experiencia: '', mensaje: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Volver al inicio
          </Link>
          <div className="flex items-center">
            <Baby size={24} className="mr-3 text-pink-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Trabaja con Nosotros</h1>
              <p className="text-gray-600 mt-1">Únete a nuestro equipo dedicado a la felicidad infantil</p>
            </div>
          </div>
        </div>

        {/* Introducción */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              <Baby className="text-pink-500" />
              <ToyBrick className="text-blue-500" />
              <Gift className="text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hagamos Sonreír a los Más Pequeños</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            En <strong>BabyToys</strong> nos especializamos en productos para bebés y juguetes educativos. 
            Buscamos personas apasionadas por la infancia que quieran contribuir a crear momentos 
            mágicos en el crecimiento de los niños.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vacantes disponibles */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users size={24} className="mr-2 text-blue-600" />
              Vacantes Disponibles
            </h2>
            <div className="space-y-4">
              {puestos.map((puesto, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{puesto.titulo}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{puesto.departamento}</span>
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">{puesto.tipo}</span>
                    <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">{puesto.ubicacion}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {puesto.titulo.includes('Infantil') || puesto.titulo.includes('Bebés') 
                      ? 'Experiencia en productos infantiles y atención a familias'
                      : 'Pasión por el mundo infantil y atención al cliente familiar'
                    }
                  </p>
                  <button className="text-pink-600 hover:text-pink-700 font-medium flex items-center">
                    Ver detalles y aplicar 
                    <span className="ml-1">→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Beneficios y Formulario */}
          <div className="space-y-8">
            {/* Beneficios */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Star size={24} className="mr-2 text-yellow-600" />
                Lo que Ofrecemos
              </h2>
              <div className="grid grid-cols-1 gap-4 mb-8">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                        {beneficio.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{beneficio.titulo}</h3>
                        <p className="text-gray-600 text-sm">{beneficio.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario de interés general */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Heart size={20} className="mr-2 text-red-500" />
                ¿No encuentras tu puesto ideal?
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Envíanos tu información y te contactaremos cuando tengamos oportunidades 
                para apasionados del mundo infantil como tú.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <select
                    name="puesto"
                    value={formData.puesto}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Área de interés</option>
                    <option value="ventas">Ventas y Atención al Cliente</option>
                    <option value="producto">Selección de Productos</option>
                    <option value="marketing">Marketing Infantil</option>
                    <option value="soporte">Soporte y Logística</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center"
                >
                  <Heart size={18} className="mr-2" />
                  Enviar Solicitud
                </button>
              </form>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm text-center">
                  💝 Trabajamos por la felicidad y desarrollo de los niños
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}