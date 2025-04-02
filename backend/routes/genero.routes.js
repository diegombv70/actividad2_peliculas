const express = require("express");
const router = express.Router();
const Genero = require("../models/Genero");

// Obtener todos los géneros
router.get("/", async (req, res) => {
    try {
        const generos = await Genero.findAll();
        console.log("Generos encontrados:", generos);
        res.json(generos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener géneros", detalle: error.message });
    }
});

// obtener genero x id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByPk(id);

        if (!genero) {
            return res.status(404).json({ error: "Género no encontrado" });
        }

        res.json(genero);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener género", detalle: error.message });
    }
});

// Crear un nuevo género
router.post("/", async (req, res) => {
    try {
        const { nombre, estado, descripcion } = req.body;
        if (!nombre || !estado) {
            return res.status(400).json({ error: "Nombre y estado son obligatorios" });
        }
        const nuevoGenero = await Genero.create({ nombre, estado, descripcion });
        res.status(201).json(nuevoGenero);
    } catch (error) {
        res.status(500).json({ error: "Error al crear género", detalle: error.message });
    }
});

// Actualizar un género por ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, estado, descripcion } = req.body;
        const genero = await Genero.findByPk(id);

        if (!genero) {
            return res.status(404).json({ error: "Género no encontrado" });
        }

        await genero.update({ nombre, estado, descripcion });
        res.json(genero);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar género", detalle: error.message });
    }
});

// Eliminar un género por ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByPk(id);

        if (!genero) {
            return res.status(404).json({ error: "Género no encontrado" });
        }

        await genero.destroy();
        res.json({ mensaje: "Género eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar género", detalle: error.message });
    }
});

module.exports = router;
