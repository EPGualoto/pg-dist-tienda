import axios from 'axios';

//const API_URL = "http://localhost/app-authors/api/authors";
const API_URL = "http://localhost:8081/api/authors";

// GET: 
const obtenerTodos = async () => {
  const data = await axios.get(API_URL).then((response) => response.data);
  return data;
};

// POST: 
const crearAutor = async (autor) => {
  const data = await axios.post(API_URL, autor).then((response) => response.data);
  return data;
};

// PUT: 
const actualizarAutor = async (id, autor) => {
  const data = await axios.put(`${API_URL}/${id}`, autor).then((response) => response.data);
  return data;
};

// DELETE: 
const borrarAutor = async (id) => {
  const data = await axios.delete(`${API_URL}/${id}`).then((response) => response.data);
  return data;
};

// Métodos fachada
export const obtenerTodosFachada = async () => {
  return await obtenerTodos();
};

export const crearAutorFachada = async (autor) => {
  return await crearAutor(autor);
};

export const actualizarAutorFachada = async (id, autor) => {
  return await actualizarAutor(id, autor);
};

export const borrarAutorFachada = async (id) => {
  return await borrarAutor(id);
};
