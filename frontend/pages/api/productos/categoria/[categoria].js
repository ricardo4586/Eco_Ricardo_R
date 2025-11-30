// frontend/pages/api/productos/categoria/[categoria].js
export default function handler(req, res) {
  const { categoria } = req.query;

  console.log('📥 Solicitud para categoría:', categoria);

  // Datos de ejemplo organizados por categoría
  const productosEjemplo = {
    supermercado: [
      { 
        barcode: 'SM001', 
        nombre: 'Arroz Integral', 
        precio: 2.50, 
        stock: 50, 
        categoria: 'supermercado', 
        descripcion: 'Arroz integral de grano largo, perfecto para una alimentación saludable'
      },
      { 
        barcode: 'SM002', 
        nombre: 'Aceite de Oliva Extra Virgen', 
        precio: 8.99, 
        stock: 30, 
        categoria: 'supermercado', 
        descripcion: 'Aceite de oliva extra virgen de primera prensada'
      },
      { 
        barcode: 'SM003', 
        nombre: 'Pasta Integral', 
        precio: 1.75, 
        stock: 40, 
        categoria: 'supermercado', 
        descripcion: 'Pasta de trigo integral, rica en fibra'
      }
    ],
    electrodomesticos: [
      { 
        barcode: 'EL001', 
        nombre: 'Licuadora Oster', 
        precio: 45.99, 
        stock: 15, 
        categoria: 'electrodomesticos', 
        descripcion: 'Licuadora de 600W con 2 velocidades y jarra de vidrio'
      },
      { 
        barcode: 'EL002', 
        nombre: 'Microondas Samsung', 
        precio: 120.00, 
        stock: 8, 
        categoria: 'electrodomesticos', 
        descripcion: 'Microondas digital 1.2 pies cúbicos con grill'
      }
    ],
    tecnologia: [
      { 
        barcode: 'TEC001', 
        nombre: 'Smartphone Samsung Galaxy', 
        precio: 299.99, 
        stock: 25, 
        categoria: 'tecnologia', 
        descripcion: 'Smartphone Android 128GB, cámara triple 48MP'
      },
      { 
        barcode: 'TEC002', 
        nombre: 'Laptop HP Pavilion', 
        precio: 599.99, 
        stock: 12, 
        categoria: 'tecnologia', 
        descripcion: 'Laptop 15.6" 8GB RAM, 256GB SSD, Intel i5'
      }
    ],
    jugueteria: [
      { 
        barcode: 'JUG001', 
        nombre: 'Set Lego Classic', 
        precio: 24.99, 
        stock: 35, 
        categoria: 'jugueteria', 
        descripcion: 'Set de construcción Lego con 221 piezas'
      },
      { 
        barcode: 'JUG002', 
        nombre: 'Muñeca Barbie Fashion', 
        precio: 19.99, 
        stock: 20, 
        categoria: 'jugueteria', 
        descripcion: 'Muñeca Barbie con 3 cambios de vestuario'
      }
    ],
    bebidas: [
      { 
        barcode: 'BEB001', 
        nombre: 'Agua Mineral Natural', 
        precio: 0.75, 
        stock: 100, 
        categoria: 'bebidas', 
        descripcion: 'Agua mineral natural 500ml, sin gas'
      },
      { 
        barcode: 'BEB002', 
        nombre: 'Jugo de Naranja Natural', 
        precio: 3.25, 
        stock: 40, 
        categoria: 'bebidas', 
        descripcion: 'Jugo de naranja 100% natural 1L'
      }
    ]
  };

  const productos = productosEjemplo[categoria] || [];

  console.log(`✅ Devolviendo ${productos.length} productos para ${categoria}`);

  res.status(200).json({
    success: true,
    data: productos,
    count: productos.length,
    categoria: categoria
  });
}