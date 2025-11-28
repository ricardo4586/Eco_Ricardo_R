// Archivo: backend/models/User.js
// Definición de la estructura de la tabla de usuarios (User Schema).
// Esto simula la definición que usarías en un ORM (como Prisma o Sequelize).

/**
 * @typedef {Object} User
 * @property {string} id - Clave primaria única (ej: UUID o 'user-admin').
 * @property {string} email - Correo electrónico único del usuario.
 * @property {string} password - Contraseña cifrada (en un entorno real).
 * @property {string} rol - Rol de acceso ('admin' o 'usuario').
 * @property {Date} fecha_creacion - Fecha y hora de creación del usuario.
 */

// NOTA: En una aplicación real, este archivo contendría la definición del esquema del ORM:
/*
// Ejemplo con Prisma ORM:
// model User {
//   id             String    @id @default(uuid())
//   email          String    @unique
//   password       String    
//   rol            String    
//   fecha_creacion DateTime  @default(now())
// }
*/

module.exports = {
    // Exportar la estructura para referencia o validación
    schema: {
        id: 'string',
        email: 'string',
        password: 'string',
        rol: 'string', // 'admin' o 'usuario'
        fecha_creacion: 'date'
    }
};