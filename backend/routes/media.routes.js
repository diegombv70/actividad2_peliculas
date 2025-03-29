const express = require("express");
const router = express.Router();
const Media = require("../models/Media");

// Obtener todas las películas/series
router.get("/", async (req, res) => {
    try {
        const media = await Media.findAll();
        res.json(media);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la media", detalle: error.message });
    }
});

// Crear una nueva película/serie
router.post("/", async (req, res) => {
    try {
        const { serial, titulo, sinopsis, url, imagen, anio_estreno, genero_id, director_id, productora_id, tipo_id } = req.body;
        
        if (!serial || !titulo || !url || !anio_estreno || !genero_id || !director_id || !productora_id || !tipo_id) {
            return res.status(400).json({ error: "Todos los campos obligatorios deben estar llenos." });
        }

        const nuevaMedia = await Media.create({
            serial,
            titulo,
            sinopsis,
            url,
            imagen,
            anio_estreno,
            genero_id,
            director_id,
            productora_id,
            tipo_id
        });

        res.status(201).json(nuevaMedia);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la media", detalle: error.message });
    }
});

// Obtener una película/serie por ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const media = await Media.findByPk(id);
        if (!media) return res.status(404).json({ error: "Media no encontrada" });
        res.json(media);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la media", detalle: error.message });
    }
});

// Actualizar una película/serie
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { serial, titulo, sinopsis, url, imagen, anio_estreno, genero_id, director_id, productora_id, tipo_id } = req.body;

        const media = await Media.findByPk(id);
        if (!media) return res.status(404).json({ error: "Media no encontrada" });

        await media.update({ serial, titulo, sinopsis, url, imagen, anio_estreno, genero_id, director_id, productora_id, tipo_id });

        res.json(media);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la media", detalle: error.message });
    }
});

// Eliminar una película/serie
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const media = await Media.findByPk(id);
        if (!media) return res.status(404).json({ error: "Media no encontrada" });

        await media.destroy();
        res.json({ mensaje: "Media eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la media", detalle: error.message });
    }
});

module.exports = router;
