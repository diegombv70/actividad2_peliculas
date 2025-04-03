require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necesario para Render
    },
  },
  logging: true, // Para evitar logs innecesarios en producción
});

// Probar conexión
sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error de conexión:", err));

module.exports = sequelize;
