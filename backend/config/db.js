// Archivo: backend/config/db.js
// Configuración centralizada para la conexión a PostgreSQL.

// En una aplicación real, usarías 'dotenv' para cargar estas variables
// process.env.DB_HOST, process.env.DB_USER, etc.

const config = {
    // Configuraciones clave para PostgreSQL
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'ecommerce_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'secretpassword',
    
    // Opciones del ORM (ej. Sequelize o Prisma)
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

/**
 * Función simulada para establecer la conexión a la base de datos.
 * En una aplicación real, inicializaría Sequelize o crearía el cliente de Prisma.
 */
const connectDB = () => {
    try {
        // console.log("Conectando a PostgreSQL con la siguiente configuración:", config);
        
        // NOTA: Aquí iría la lógica real de conexión a DB (ej. Sequelize.authenticate())
        
        console.log(`[DB] Conexión a la base de datos '${config.database}' exitosa (simulada).`);
        return { success: true };

    } catch (error) {
        console.error("ERROR: No se pudo conectar a la base de datos:", error.message);
        return { success: false, error: error.message };
    }
};

module.exports = {
    config,
    connectDB
};