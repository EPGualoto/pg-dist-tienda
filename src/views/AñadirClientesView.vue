<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Gestión de Clientes</h2>


    <form @submit.prevent="guardarCliente">
      <div class="mb-3">
        <label for="nombreCliente" class="form-label">Nombre</label>
        <input
          type="text"
          id="nombreCliente"
          v-model="cliente.name"
          class="form-control"
          placeholder="Ingrese el nombre del cliente"
          required
        />
      </div>
      <div class="mb-3">
        <label for="emailCliente" class="form-label">Email</label>
        <input
          type="email"
          id="emailCliente"
          v-model="cliente.email"
          class="form-control"
          placeholder="Ingrese el correo electrónico"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ editMode ? "Actualizar Cliente" : "Guardar Cliente" }}
      </button>
      <button
        type="button"
        class="btn btn-secondary ms-2"
        v-if="editMode"
        @click="cancelarEdicion"
      >
        Cancelar
      </button>
    </form>

    
    <div class="mt-5">
      <h3 class="mb-3">Lista de Clientes</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Versión</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id">
            <td>{{ cliente.id }}</td>
            <td>{{ cliente.name }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.version }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editarCliente(cliente)">Editar</button>
              <button class="btn btn-danger btn-sm ms-2" @click="borrarCliente(cliente.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ClienteCustomers from "@/clientes/ClienteCustomers";

export default {
  data() {
    return {
      cliente: {
        name: "",
        email: "",
        version: 1
      },
      clientes: [],
      editMode: false,
      clienteEditandoId: null
    };
  },
  created() {
    this.cargarClientes();
  },
  methods: {
    async cargarClientes() {
      try {
        this.clientes = await ClienteCustomers.obtenerTodos();
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    },
    async guardarCliente() {
      if (!this.cliente.name.trim() || !this.cliente.email.trim()) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      if (this.cliente.version < 0) {
        alert("La versión debe ser un número positivo.");
        return;
      }

      try {
        if (this.editMode) {
          await ClienteCustomers.actualizar(this.clienteEditandoId, this.cliente);
          alert("Cliente actualizado exitosamente.");
        } else {
          await ClienteCustomers.crear(this.cliente);
          alert("Cliente creado exitosamente.");
        }
        this.resetFormulario();
        this.cargarClientes();
      } catch (error) {
        console.error("Error al guardar el cliente:", error);
        alert("Hubo un problema al guardar el cliente.");
      }
    },
    editarCliente(cliente) {
      this.cliente = { ...cliente };
      this.clienteEditandoId = cliente.id;
      this.editMode = true;
    },
    async borrarCliente(id) {
      if (!confirm("¿Está seguro de que desea eliminar este cliente?")) return;
      try {
        await ClienteCustomers.eliminar(id);
        alert("Cliente eliminado exitosamente.");
        this.cargarClientes();
      } catch (error) {
        alert("No se pudo eliminar el cliente. Verifique si tiene órdenes asociadas.");
        console.error("Error al eliminar cliente:", error);
      }
    },
    cancelarEdicion() {
      this.resetFormulario();
    },
    resetFormulario() {
      this.cliente = { name: "", email: "", version: 1 };
      this.editMode = false;
      this.clienteEditandoId = null;
    }
  }
};
</script>

<style scoped>
.container {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  padding: 40px 20px;
}

h2 {
  color: #2c3e50;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

h3 {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 25px;
  font-size: 1.3rem;
}


form {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 40px;
  border: 2px solid transparent;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(135, 206, 235, 0.1);
}

form:hover {
  border-color: rgba(135, 206, 235, 0.3);
  box-shadow: 0 8px 25px rgba(135, 206, 235, 0.15);
}

.form-label {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 1rem;
}

.form-control {
  border: 2px solid rgba(135, 206, 235, 0.2);
  border-radius: 10px;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  font-size: 1rem;
}

.form-control:focus {
  border-color: #87CEEB;
  box-shadow: 0 0 0 0.2rem rgba(135, 206, 235, 0.25);
  background: rgba(255, 255, 255, 1);
  outline: none;
}

.form-control:hover {
  border-color: rgba(135, 206, 235, 0.4);
}


.table-bordered {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid rgba(135, 206, 235, 0.2);
  box-shadow: 0 4px 15px rgba(135, 206, 235, 0.1);
}

.table thead th {
  background: linear-gradient(145deg, #87CEEB 0%, #5F9EA0 100%);
  color: white;
  border: none;
  padding: 15px;
  font-weight: 600;
  text-align: center;
  font-size: 1rem;
}

.table tbody td {
  padding: 15px;
  border-color: rgba(135, 206, 235, 0.2);
  color: #495057;
  text-align: center;
  transition: background-color 0.2s ease;
}

.table tbody tr:hover {
  background: rgba(135, 206, 235, 0.05);
  transform: translateY(-1px);
}

.table tbody tr:nth-child(even) {
  background: rgba(135, 206, 235, 0.02);
}

.table tbody tr:nth-child(even):hover {
  background: rgba(135, 206, 235, 0.08);
}

.mt-5 {
  background: rgba(121, 187, 180, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  border: 2px solid transparent;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(135, 206, 235, 0.1);
}

.mt-5:hover {
  border-color: rgba(135, 206, 235, 0.3);
  box-shadow: 0 8px 25px rgba(135, 206, 235, 0.15);
}

.form-control::placeholder {
  color: rgba(44, 62, 80, 0.5);
  font-style: italic;
}

@media (max-width: 768px) {
  .container {
    padding: 20px 15px;
  }

  form, .mt-5 {
    padding: 20px;
  }

  .table {
    font-size: 0.9rem;
  }

  .table thead th,
  .table tbody td {
    padding: 10px 8px;
  }
}
</style>
