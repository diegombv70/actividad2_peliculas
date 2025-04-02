require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Necesario en Render
        },
    },
    logging: false, // Opcional para reducir logs
});

sequelize.authenticate()
    .then(() => console.log("✅ Conectado a PostgreSQL con Sequelize"))
    .catch((err) => console.error("❌ Error de conexión con Sequelize:", err));

module.exports = sequelize;
