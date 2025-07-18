import axios from 'axios';

// URL base del backend que expone los clientes
//.... revisar si esta con la firma de CONSUL / TRAEFIK
const API_URL = "http://localhost:7070/orders/customers";

//http://localhost/app-customers/orders


// Clase para manejar las llamadas relacionadas con los clientes
class ClienteCustomers {
  // Obtener todos los clientes
  async obtenerTodos() {
    const data = await axios.get(API_URL).then((response) => response.data);
    return data;
  }

  // Buscar cliente por ID
  async buscarClientePorId(id) {
    const data = await axios.get(`${API_URL}/${id}`).then((response) => response.data);
    return data;
  }

  // Crear un nuevo cliente
  async crear(cliente) {
    const data = await axios.post(API_URL, cliente).then((response) => response.data);
    return data;
  }

  // Eliminar cliente
  async eliminar(customerId) {
    const data = await axios.delete(`${API_URL}/${customerId}`).then((res) => res.data);
    return data;
  }

  // Actualizar cliente
  async actualizar(customerId, cliente) {
    const data = await axios.put(`${API_URL}/${customerId}`, cliente).then((res) => res.data);
    return data;
  }

}

export default new ClienteCustomers();