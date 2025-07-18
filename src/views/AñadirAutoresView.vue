<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Gestión de Autores</h2>

    <!-- Formulario para añadir o editar autor -->
    <form @submit.prevent="guardarAutor">
      <div class="targeta">
        <label for="nombreAutor" class="form-label">Nombre del Autor</label>
        <input
          type="text"
          id="nombreAutor"
          v-model="autor.name"
          class="form-control"
          placeholder="Ingrese el nombre del autor"
          required
        />
      </div>
      <div class="targeta">
        <label for="versionAutor" class="form-label">Versión</label>
        <input
          type="number"
          id="versionAutor"
          v-model="autor.version"
          class="form-control"
          placeholder="Ingrese la versión del autor"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ editMode ? "Actualizar Autor" : "Guardar Autor" }}
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
      <h3 class="targeta">Lista de Autores</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Versión</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="autor in autores" :key="autor.id">
            <td>{{ autor.id }}</td>
            <td>{{ autor.name }}</td>
            <td>{{ autor.version }}</td>
            <td>
              <button
                class="btn btn-warning btn-sm"
                @click="editarAutor(autor)"
              >
                Editar
              </button>
              <button
                class="btn btn-danger btn-sm ms-2"
                @click="borrarAutor(autor.id)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  obtenerTodosFachada,
  crearAutorFachada,
  actualizarAutorFachada,
  borrarAutorFachada
} from "../clientes/clienteAuthors";

export default {
  data() {
    return {
      autor: {
        id: null,
        name: "",
        version: 0
      },
      autores: [],
      editMode: false
    };
  },
  created() {
    this.cargarAutores();
  },
  methods: {
    async cargarAutores() {
      try {
        this.autores = await obtenerTodosFachada();
      } catch (error) {
        console.error("Error al cargar los autores:", error);
      }
    },
    async guardarAutor() {
      if (!this.autor.name.trim()) {
        alert("El nombre del autor es obligatorio.");
        return;
      }

      if (this.autor.version <= 0) {
        alert("La versión debe ser un número positivo.");
        return;
      }

      try {
        if (this.editMode) {
          // Actualizar autor existente
          await actualizarAutorFachada(this.autor.id, this.autor);
          alert("Autor actualizado exitosamente.");
        } else {
          // Crear nuevo autor
          await crearAutorFachada(this.autor);
          alert("Autor creado exitosamente.");
        }
        this.cargarAutores();
        this.resetFormulario();
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("El autor ya existe en la base de datos.");
        } else {
          console.error("Error al guardar el autor:", error);
          alert("Error al guardar el autor.");
        }
      }
    },
    editarAutor(autor) {
      this.autor = { ...autor };
      this.editMode = true;
    },
    async borrarAutor(id) {
      if (!confirm("¿Está seguro de que desea eliminar este autor?")) return;

      try {
        await borrarAutorFachada(id);
        alert("Autor eliminado exitosamente.");
        this.cargarAutores();
      } catch (error) {
        console.error("Error al eliminar el autor:", error);
        alert("Error al eliminar el autor.");
      }
    },
    cancelarEdicion() {
      this.resetFormulario();
    },
    resetFormulario() {
      this.autor = {
        id: null,
        name: "",
        version: 0
      };
      this.editMode = false;
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

/* Estilos del formulario */
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

/* Estilos de la tabla */
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

.table tbody tr {
  transition: all 0.2s ease;
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

/* Contenedor de la tabla */
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
  border-color: rgba(235, 246, 249, 0.95);
  box-shadow: 0 8px 25px rgba(135, 206, 235, 0.15);
}

/* Efectos para inputs en focus */
.targeta {
  margin-bottom: 20px;
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