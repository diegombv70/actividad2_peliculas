const express = require("express");
const router = express.Router();
const Director = require("../models/Director");

// Oobtener todos los directores (GET)
router.get("/", async (req, res) => {
  try {
    const directores = await Director.findAll();
    res.json(directores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener directores", detalle: error.message });
  }
});

// obtener directores x id
router.get("/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const directores = await Director.findByPk(id);

      if (!directores) {
          return res.status(404).json({ error: "Género no encontrado" });
      }

      res.json(directores);
  } catch (error) {
      res.status(500).json({ error: "Error al obtener género", detalle: error.message });
  }
});


// Crear un nuevo director (POST)
router.post("/", async (req, res) => {
  try {
    console.log("Datos recibidos en el backend:", req.body);

    const { nombres, estado } = req.body;
    if (!nombres || !estado) {
      return res.status(400).json({ error: "Faltan datos obligatorios: nombre y estado" });
    }

    const nuevoDirector = await Director.create({ nombres, estado });
    res.status(201).json(nuevoDirector);
  } catch (error) {
    console.error("Error al agregar director:", error);
    res.status(500).json({ error: "No se pudo agregar el director", detalle: error.message });
  }
});

// Actualizar un director por ID (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const director = await Director.findByPk(id);
    if (!director) {
      return res.status(404).json({ error: "Director no encontrado" });
    }

    if (!req.body.nombres && !req.body.estado) {
      return res.status(400).json({ error: "Debe proporcionar al menos un campo para actualizar" });
    }

    await director.update(req.body);
    res.json(director);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el director", detalle: error.message });
  }
});

// Eliminar un director por ID (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const director = await Director.findByPk(id);
    if (!director) {
      return res.status(404).json({ error: "Director no encontrado" });
    }

    await director.destroy();
    res.json({ mensaje: "Director eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el director", detalle: error.message });
  }
});

module.exports = router;
