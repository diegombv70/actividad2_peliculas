// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const sequelize = require("./config/database");

// // Importar modelos
// require("./models/Genero");
// require("./models/Director");
// require("./models/Productora");
// require("./models/Tipo");
// require("./models/Media");

// // Importar rutas
// const generoRoutes = require("./routes/genero.routes");
// const directorRoutes = require("./routes/director.routes");
// const productoraRoutes = require("./routes/productora.routes");
// const tipoRoutes = require("./routes/tipo.routes");
// const mediaRoutes = require("./routes/media.routes");

// const app = express();
// const PORT = process.env.PORT || 8080;


// // Middleware
// const corsOptions = {
//     origin: '*', // Permite todas las solicitudes (¡No recomendado para producción!)
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads"))); // Servir imágenes

// // Usar las rutas
// app.use("/generos", generoRoutes);
// app.use("/directores", directorRoutes);
// app.use("/productoras", productoraRoutes);
// app.use("/tipos", tipoRoutes);
// app.use("/medias", mediaRoutes);

// // Rutas adicionales para obtener registros por ID
// app.get("/generos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const Genero = require("./models/Genero");
//         const genero = await Genero.findByPk(id);
//         if (!genero) return res.status(404).json({ error: "Género no encontrado" });
//         res.json(genero);
//     } catch (error) {
//         res.status(500).json({ error: "Error al obtener género", detalle: error.message });
//     }
// });

// app.get("/directores/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const Director = require("./models/Director");
//         const director = await Director.findByPk(id);
//         if (!director) return res.status(404).json({ error: "Director no encontrado" });
//         res.json(director);
//     } catch (error) {
//         res.status(500).json({ error: "Error al obtener Director", detalle: error.message });
//     }
// });

// app.get("/productoras/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const Productora = require("./models/Productora");
//         const productora = await Productora.findByPk(id);
//         if (!productora) return res.status(404).json({ error: "Productora no encontrada" });
//         res.json(productora);
//     } catch (error) {
//         res.status(500).json({ error: "Error al obtener Productora", detalle: error.message });
//     }
// });

// app.get("/tipos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const Tipo = require("./models/Tipo");
//         const tipo = await Tipo.findByPk(id);
//         if (!tipo) return res.status(404).json({ error: "Tipo no encontrado" });
//         res.json(tipo);
//     } catch (error) {
//         res.status(500).json({ error: "Error al obtener Tipo", detalle: error.message });
//     }
// });

// // Conectar a la base de datos y ejecutar el servidor
// sequelize
//     .sync()
//     .then(() => {
//         console.log("Base de datos sincronizada");
//         app.get("/", (req, res) => {
//             res.send("✅ Servidor funcionando en Render");
//         });
//         console.log(`PORT asignado por Render: ${process.env.PORT}`);

//         app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
//         console.log("DATABASE_URL:", process.env.DATABASE_URL);
//         console.log("PORT:", process.env.PORT);

//     })
//     .catch((error) => console.error("Error al conectar la base de datos:", error));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./config/database");

// Verificar variables de entorno
console.log("🔍 DATABASE_URL:", process.env.DATABASE_URL || "❌ NO DEFINIDA");
console.log("🔍 PORT:", process.env.PORT || "8080 (por defecto)");

// Importar modelos
require("./models/Genero");
require("./models/Director");
require("./models/Productora");
require("./models/Tipo");
require("./models/Media");

// Importar rutas
const generoRoutes = require("./routes/genero.routes");
const directorRoutes = require("./routes/director.routes");
const productoraRoutes = require("./routes/productora.routes");
const tipoRoutes = require("./routes/tipo.routes");
const mediaRoutes = require("./routes/media.routes");

const app = express();
const PORT = process.env.PORT || 8080;

// Configurar CORS
const corsOptions = {
    origin: "*", // Permitir cualquier origen
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads"))); // Servir imágenes

// Usar rutas
app.use("/generos", generoRoutes);
app.use("/directores", directorRoutes);
app.use("/productoras", productoraRoutes);
app.use("/tipos", tipoRoutes);
app.use("/medias", mediaRoutes);

// Endpoint de prueba para verificar si el backend está funcionando
app.get("/", (req, res) => {
    res.send("✅ Servidor funcionando en Render");
});

// Conectar a la base de datos y ejecutar el servidor
sequelize
    .authenticate()
    .then(() => {
        console.log("✅ Conectado a PostgreSQL");

        sequelize.sync().then(() => {
            console.log("✅ Base de datos sincronizada");
            console.log(`🚀 Servidor corriendo en puerto ${PORT}`);

            app.listen(PORT, () => console.log(`🌐 Escuchando en http://localhost:${PORT}`));
        });
    })
    .catch((error) => {
        console.error("❌ Error al conectar la base de datos:", error);
        process.exit(1); // Terminar el proceso si hay error en la conexión
    });
