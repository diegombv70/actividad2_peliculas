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
  logging: false, // Para evitar logs innecesarios en producción
});

// Probar conexión
sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error de conexión:", err));

module.exports = sequelize;
