import { HashRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import DirectoresList from "./pages/Directores/DirectoresList";
import AddDirector from "./pages/Directores/AddDirector";
import UpdateDirector from "./pages/Directores/UpdateDirector";
import PeliculasList from "./pages/Peliculas/PeliculasList";
import AddPelicula from "./pages/Peliculas/AddPelicula";
import GenerosList from "./pages/Generos/GenerosList";
import AddGenero from "./pages/Generos/AddGenero";
import UpdateGenero from "./pages/Generos/UpdateGenero";
import TiposList from "./pages/Tipos/TiposList";
import AddTipo from "./pages/Tipos/AddTipo";
import UpdateTipo from "./pages/Tipos/UpdateTipo";
import ProductorasList from "./pages/Productoras/ProductorasList";
import AddProductora from "./pages/Productoras/AddProductora";
import UpdateProductora from "./pages/Productoras/UpdateProductora";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/directores" element={<DirectoresList />} />
          <Route path="/directores/agregar" element={<AddDirector />} />
          <Route path="/directores/editar/:id" element={<UpdateDirector />} />
          <Route path="/peliculas" element={<PeliculasList />} />
          <Route path="/peliculas/add" element={<AddPelicula />} />
          <Route path="/generos" element={<GenerosList />} />
          <Route path="/generos/agregar" element={<AddGenero />} />
          <Route path="/generos/editar/:id" element={<UpdateGenero />} />
          <Route path="/tipos" element={<TiposList />} />
          <Route path="/tipos/agregar" element={<AddTipo />} />
          <Route path="/tipos/editar/:id" element={<UpdateTipo />} />
          <Route path="/productoras" element={<ProductorasList />} />
          <Route path="/productoras/agregar" element={<AddProductora />} />
          <Route path="/productoras/editar/:id" element={<UpdateProductora />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
