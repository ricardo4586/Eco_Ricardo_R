// frontend/pages/api/categorias.js
export default function handler(req, res) {
  try {
    const categorias = [
      { 
        id: 'supermercado', 
        nombre: 'Supermercado', 
        icono: '🛒',
        descripcion: 'Productos de supermercado'
      },
      { 
        id: 'electrodomesticos', 
        nombre: 'Electrodomésticos', 
        icono: '🏠',
        descripcion: 'Electrodomésticos para el hogar'
      },
      { 
        id: 'jugueteria', 
        nombre: 'Juguetería', 
        icono: '🧸',
        descripcion: 'Juguetes para todas las edades'
      },
      { 
        id: 'tecnologia', 
        nombre: 'Tecnología', 
        icono: '💻',
        descripcion: 'Tecnología y electrónica'
      },
      { 
        id: 'bebidas', 
        nombre: 'Bebidas', 
        icono: '🥤',
        descripcion: 'Bebidas y refrescos'
      },
    ];

    res.status(200).json({
      success: true,
      data: categorias,
      count: categorias.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al cargar categorías'
    });
  }
}