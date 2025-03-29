const express = require("express");
const Productora = require("../models/Productora");

const router = express.Router();

// Obtener todas las productoras (GET)
router.get("/", async (req, res) => {
  try {
    const productoras = await Productora.findAll();
    res.json(productoras);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productoras", detalle: error.message });
  }
});

// Obtener Productora por ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productora = await Productora.findByPk(id);

    if (!productora) {
      return res.status(404).json({ error: "Productora no encontrada" });
    }

    res.json(productora);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productora", detalle: error.message });
  }
});

// Crear una nueva Productora (POST) 
router.post("/", async (req, res) => {
  try {
    console.log("📥 Datos recibidos en el backend:", req.body);

    const { nombre, estado, slogan, descripcion } = req.body;
    if (!nombre || !estado) {
      return res.status(400).json({ error: "Faltan datos obligatorios: nombre y estado" });
    }

    const nuevaProductora = await Productora.create({
      nombre,
      estado,
      slogan: slogan || "", // Si no envían, asigna vacío
      descripcion: descripcion || "", // Si no envían, asigna vacío
    });

    console.log("✅ Productora guardada:", nuevaProductora.toJSON());

    res.status(201).json(nuevaProductora);
  } catch (error) {
    console.error("❌ Error al agregar Productora:", error);
    res.status(500).json({ error: "No se pudo agregar la Productora", detalle: error.message });
  }
});

// Actualizar una productora por ID (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productora = await Productora.findByPk(id);
    if (!productora) {
      return res.status(404).json({ error: "Productora no encontrada" });
    }

    const { nombre, estado, slogan, descripcion } = req.body;

    await productora.update({
      nombre: nombre || productora.nombre,
      estado: estado || productora.estado,
      slogan: slogan || productora.slogan,
      descripcion: descripcion || productora.descripcion,
    });

    res.json(productora);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la Productora", detalle: error.message });
  }
});

// Eliminar una Productora por ID (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const eliminados = await Productora.destroy({ where: { id } });

    if (eliminados === 0) {
      return res.status(404).json({ error: "Productora no encontrada" });
    }

    res.json({ mensaje: "✅ Productora eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la Productora", detalle: error.message });
  }
});

module.exports = router;
