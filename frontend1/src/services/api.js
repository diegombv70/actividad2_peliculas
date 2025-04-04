const API_URL = "https://actividad2-peliculas.onrender.com";

export const getDirectores = async () => {
    const response = await fetch(`${API_URL}/directores`);
    const data = await response.json();  // ✅ Definir `data` antes de usarla
    console.log("📌 Directores recibidos:", data);  // ✅ Ahora sí puedes ver los datos
    return data;
};


export const getPeliculas = async () => {
    const response = await fetch(`${API_URL}/medias`);
    return response.json();
};

export const getGeneros = async () => {
    const response = await fetch(`${API_URL}/generos`);
    return response.json();
};

export const getProductoras = async () => {
    const response = await fetch(`${API_URL}/productoras`);
    return response.json();
};

export const addPelicula = async (pelicula) => {
    const response = await fetch(`${API_URL}/medias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pelicula),
    });

    const data = await response.json();
    
    if (!response.ok) {
        console.error("❌ Error en la respuesta del servidor:", data);
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return data;
};


export const getTipos = async () => {
    const response = await fetch(`${API_URL}/tipos`);
    return response.json();
};

export const addDirector = async (director) => {
    const response = await fetch(`${API_URL}/directores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(director),
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
};

export const addGenero = async (genero) => {
    const response = await fetch(`${API_URL}/generos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genero),
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
};

export const addProductora = async (productoras) => {
    const response = await fetch(`${API_URL}/productoras`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoras),
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
};

export const addTipo = async (tipo) => {
    const response = await fetch(`${API_URL}/tipos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tipo),
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
};

export const getGeneroById = async (id) => {
    const response = await fetch(`${API_URL}/generos/${id}`);
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
};

export const getTipoById = async (id) => {
    const response = await fetch(`${API_URL}/tipos/${id}`);
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
};

export const getDirectorById = async (id) => {
    const response = await fetch(`${API_URL}/directores/${id}`);
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
};

export const getProductoraById = async (id) => {
    const response = await fetch(`${API_URL}/productoras/${id}`);
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
};

export const updateGenero = async (id, genero) => {
    const response = await fetch(`${API_URL}/generos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genero),
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
};

export const updateTipo = async (id, tipo) => {
    const response = await fetch(`${API_URL}/tipos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tipo),
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
};

export const updateProductoras = async (id, productoras) => {
    const response = await fetch(`${API_URL}/productoras/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoras),
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
};

export const updateDirectores = async (id, director) => {
    const response = await fetch(`${API_URL}/directores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(director),
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
};