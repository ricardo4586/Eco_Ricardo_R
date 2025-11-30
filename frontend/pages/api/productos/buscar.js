// frontend/pages/api/productos/buscar.js
export default function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false,
      error: 'Término de búsqueda requerido'
    });
  }

  try {
    // Datos de ejemplo - en un caso real, esto vendría de una base de datos
    const todosLosProductos = [
      { barcode: 'SM001', nombre: 'Arroz Integral', precio: 2.50, stock: 50, categoria: 'supermercado', descripcion: 'Arroz integral de grano largo' },
      { barcode: 'SM002', nombre: 'Aceite de Oliva', precio: 8.99, stock: 30, categoria: 'supermercado', descripcion: 'Aceite de oliva extra virgen' },
      { barcode: 'SM003', nombre: 'Pasta Integral', precio: 1.75, stock: 40, categoria: 'supermercado', descripcion: 'Pasta de trigo integral' },
      { barcode: 'EL001', nombre: 'Licuadora Oster', precio: 45.99, stock: 15, categoria: 'electrodomesticos', descripcion: 'Licuadora de 600W' },
      { barcode: 'EL002', nombre: 'Microondas Samsung', precio: 120.00, stock: 8, categoria: 'electrodomesticos', descripcion: 'Microondas digital' },
      { barcode: 'TEC001', nombre: 'Smartphone Samsung', precio: 299.99, stock: 25, categoria: 'tecnologia', descripcion: 'Smartphone Android 128GB' },
      { barcode: 'TEC002', nombre: 'Laptop HP', precio: 599.99, stock: 12, categoria: 'tecnologia', descripcion: 'Laptop 15.6" 8GB RAM' },
      { barcode: 'JUG001', nombre: 'Lego Classic', precio: 24.99, stock: 35, categoria: 'jugueteria', descripcion: 'Set de construcción Lego' },
      { barcode: 'JUG002', nombre: 'Muñeca Barbie', precio: 19.99, stock: 20, categoria: 'jugueteria', descripcion: 'Muñeca Barbie Fashion' },
      { barcode: 'BEB001', nombre: 'Agua Mineral', precio: 0.75, stock: 100, categoria: 'bebidas', descripcion: 'Agua mineral natural 500ml' },
      { barcode: 'BEB002', nombre: 'Jugo de Naranja', precio: 3.25, stock: 40, categoria: 'bebidas', descripcion: 'Jugo de naranja natural 1L' }
    ];

    const termino = q.toLowerCase().trim();
    
    // Buscar productos que coincidan con el término
    const resultados = todosLosProductos.filter(producto => 
      producto.nombre.toLowerCase().includes(termino) ||
      producto.descripcion.toLowerCase().includes(termino) ||
      producto.categoria.toLowerCase().includes(termino)
    );

    console.log(`🔍 Búsqueda: "${q}" - Resultados: ${resultados.length}`);

    res.status(200).json({
      success: true,
      data: resultados,
      count: resultados.length,
      termino: q
    });

  } catch (error) {
    console.error('❌ Error en búsqueda:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
}