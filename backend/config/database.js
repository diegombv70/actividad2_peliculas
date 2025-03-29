const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "C:/Users/diego.bedoya/Documents/Iudigital/IngenieriaWeb2/Actividad2/appeliculas.db",
  logging: true, // Desactiva logs en consola
});

module.exports = sequelize;


sequelize.sync({ alter: true }) // O { force: true } si quieres recrear la BD
    .then(() => console.log("📦 Base de datos sincronizada"))
    .catch(err => console.error("❌ Error al sincronizar la base de datos:", err));
