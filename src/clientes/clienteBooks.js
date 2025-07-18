import axios from 'axios';

// URL base del backend que expone los libros
const API_URL = "http://localhost:9090/books"; // URL sin Traefik

// GET: 
const obtenerTodos = async () => {
  const data = await axios.get(API_URL).then((response) => response.data);
  return data;
};

// GET: 
const buscarLibroPorIsbn = async (isbn) => {
  const data = await axios.get(`${API_URL}/${isbn}`).then((response) => response.data);
  return data;
};

// POST: 
const crearLibro = async (libro) => {
  const data = await axios.post(API_URL, libro).then((response) => response.data);
  return data;
};

// PUT: 
const actualizarLibro = async (isbn, libro) => {
  const data = await axios.put(`${API_URL}/${isbn}`, libro).then((response) => response.data);
  return data;
};

// DELETE: Eliminar un libro
const borrarLibro = async (isbn) => {
  const data = await axios.delete(`${API_URL}/${isbn}`).then((response) => response.data);
  return data;
};

// Métodos fachada
export const obtenerTodosFachada = async () => {
  return await obtenerTodos();
};

export const buscarLibroPorIsbnFachada = async (isbn) => {
  return await buscarLibroPorIsbn(isbn);
};

export const crearLibroFachada = async (libro) => {
  return await crearLibro(libro);
};

export const actualizarLibroFachada = async (isbn, libro) => {
  return await actualizarLibro(isbn, libro);
};

export const borrarLibroFachada = async (isbn) => {
  return await borrarLibro(isbn);
};