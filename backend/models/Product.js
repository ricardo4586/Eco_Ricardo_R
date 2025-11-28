// Archivo: backend/models/Product.js
// Definición de la estructura de la tabla de productos (Product Schema).
// Esto simula la definición que usarías en un ORM (como Prisma o Sequelize).

/**
 * @typedef {Object} Product
 * @property {string} id - Clave primaria única (ej: UUID o 'P001').
 * @property {string} barcode - Código de barras, clave para el escaneo de la App Flutter.
 * @property {string} id_numerico - ID numérico de producto que acompaña al código de barras.
 * @property {string} nombre - Nombre descriptivo del producto.
 * @property {number} precio - Precio de venta del producto.
 * @property {number} stock - Cantidad de unidades disponibles en inventario.
 * @property {string} [imagen_url] - URL de la imagen del producto.
 * @property {Date} fecha_registro - Fecha y hora en que se registró el producto.
 */

// NOTA: En una aplicación real, este archivo contendría la definición del esquema del ORM:
/*
// Ejemplo con Prisma ORM:
// model Product {
//   id             String    @id @default(uuid())
//   barcode        String    @unique
//   id_numerico    String
//   nombre         String
//   precio         Float
//   stock          Int
//   imagen_url     String?
//   fecha_registro DateTime  @default(now())
// }
*/

module.exports = {
    // Exportar la estructura para referencia o validación
    schema: {
        id: 'string',
        barcode: 'string',
        id_numerico: 'string',
        nombre: 'string',
        precio: 'number',
        stock: 'number',
        imagen_url: 'string',
        fecha_registro: 'date'
    }
};