import React, { useState, useEffect } from 'react';
import { Book, Search, Trash2, Plus, Library } from 'lucide-react';

// Define la interfaz para el tipo Libro
interface Libro {
  id: number;
  titulo: string;
  autor: string;
}

const BibliotecaDigital = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [libroSeleccionado, setLibroSeleccionado] = useState<Libro | null>(null);

  // Cargar datos iniciales (simulando la carga desde JSON)
  useEffect(() => {
    const datosIniciales: Libro[] = [
      { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez" },
      { id: 2, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes" },
      { id: 3, titulo: "1984", autor: "George Orwell" },
      { id: 4, titulo: "El principito", autor: "Antoine de Saint-Exupéry" },
      { id: 5, titulo: "Rayuela", autor: "Julio Cortázar" },
      { id: 6, titulo: "La sombra del viento", autor: "Carlos Ruiz Zafón" },
      { id: 7, titulo: "Crónica de una muerte anunciada", autor: "Gabriel García Márquez" },
      { id: 8, titulo: "El amor en los tiempos del cólera", autor: "Gabriel García Márquez" }
    ];
    setLibros(datosIniciales);
  }, []);

  const agregarLibro = () => {
    if (titulo.trim() && autor.trim()) {
      const nuevoLibro: Libro = {
        id: Date.now(),
        titulo: titulo.trim(),
        autor: autor.trim()
      };
      setLibros([...libros, nuevoLibro]);
      setTitulo('');
      setAutor('');
    }
  };

  const eliminarLibro = () => {
    if (libroSeleccionado) {
      setLibros(libros.filter(libro => libro.id !== libroSeleccionado.id));
      setLibroSeleccionado(null);
    }
  };

  const librosFiltrados = libros.filter(libro =>
    libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    libro.autor.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-8">
      {/* Patrón de fondo tipo biblioteca */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          #8b4513 0px,
          #8b4513 2px,
          transparent 2px,
          transparent 40px
        ),
        repeating-linear-gradient(
          90deg,
          #8b4513 0px,
          #8b4513 2px,
          transparent 2px,
          transparent 100px
        )`
      }}></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Library className="w-12 h-12 text-amber-800" />
            <h1 className="text-5xl font-bold text-amber-900">Biblioteca Digital</h1>
          </div>
          <p className="text-amber-700 text-lg">Sistema de Gestión de Libros</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de Control */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 border-amber-200">
              <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6" />
                Agregar Libro
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-amber-800 font-semibold mb-2">Título</label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Ingrese el título..."
                  />
                </div>
                
                <div>
                  <label className="block text-amber-800 font-semibold mb-2">Autor</label>
                  <input
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Ingrese el autor..."
                  />
                </div>
                
                <button
                  onClick={agregarLibro}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Agregar Libro
                </button>
              </div>

              {/* Búsqueda */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Buscar
                </h3>
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-amber-300 focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="Buscar por título o autor..."
                />
              </div>

              {/* Eliminar */}
              <div className="mt-8">
                <button
                  onClick={eliminarLibro}
                  disabled={!libroSeleccionado}
                  className={`w-full py-3 rounded-lg font-semibold transition-all shadow-lg flex items-center justify-center gap-2 ${
                    libroSeleccionado
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                  Eliminar Seleccionado
                </button>
              </div>

              {/* Estadísticas */}
              <div className="mt-8 p-4 bg-amber-100 rounded-lg border-2 border-amber-300">
                <p className="text-amber-900 font-semibold text-center">
                  Total de libros: <span className="text-2xl">{libros.length}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Lista de Libros */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 border-amber-200">
              <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <Book className="w-6 h-6" />
                Catálogo de Libros
                <span className="text-sm font-normal text-amber-700 ml-auto">
                  ({librosFiltrados.length} resultados)
                </span>
              </h2>
              
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {librosFiltrados.length === 0 ? (
                  <div className="text-center py-12">
                    <Book className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                    <p className="text-amber-600 text-lg">No se encontraron libros</p>
                  </div>
                ) : (
                  librosFiltrados.map((libro) => (
                    <div
                      key={libro.id}
                      onClick={() => setLibroSeleccionado(libro)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        libroSeleccionado?.id === libro.id
                          ? 'bg-amber-100 border-amber-500 shadow-lg scale-[1.02]'
                          : 'bg-white border-amber-200 hover:bg-amber-50 hover:border-amber-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Book className={`w-6 h-6 mt-1 flex-shrink-0 ${
                          libroSeleccionado?.id === libro.id ? 'text-amber-600' : 'text-amber-400'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-amber-900 text-lg mb-1 truncate">
                            {libro.titulo}
                          </h3>
                          <p className="text-amber-700 truncate">
                            <span className="font-semibold">Autor:</span> {libro.autor}
                          </p>
                        </div>
                        {libroSeleccionado?.id === libro.id && (
                          <div className="flex-shrink-0 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Seleccionado
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibliotecaDigital;