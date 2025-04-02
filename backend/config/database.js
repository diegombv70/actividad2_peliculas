// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "C:/Users/diego.bedoya/Documents/Iudigital/IngenieriaWeb2/Actividad2/appeliculas.db",
//   logging: true, // Desactiva logs en consola
// });

// module.exports = sequelize;


// sequelize.sync({ alter: true }) // O { force: true } si quieres recrear la BD
//     .then(() => console.log("📦 Base de datos sincronizada"))
//     .catch(err => console.error("❌ Error al sincronizar la base de datos:", err));


require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Necesario en Render
    }
});

pool.connect()
    .then(() => console.log('✅ Conectado a PostgreSQL'))
    .catch(err => console.error('❌ Error de conexión:', err));

module.exports = pool;
