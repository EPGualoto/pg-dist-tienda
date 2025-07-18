<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Gestión de Libros</h2>

    <!-- Formulario para añadir o editar libro -->
    <form @submit.prevent="guardarLibro">
      <div class="tgLibro">
        <label for="isbnLibro" class="form-label">ISBN</label>
        <input
          type="text"
          id="isbnLibro"
          v-model="libro.isbn"
          class="form-control"
          placeholder="Ingrese el ISBN del libro"
          required
        />
      </div>
      <div class="tgLibro">
        <label for="tituloLibro" class="form-label">Título</label>
        <input
          type="text"
          id="tituloLibro"
          v-model="libro.title"
          class="form-control"
          placeholder="Ingrese el título del libro"
          required
        />
      </div>
      <div class="tgLibro">
        <label for="precioLibro" class="form-label">Precio</label>
        <input
          type="text"
          id="precioLibro"
          v-model="libro.price"
          class="form-control"
          placeholder="Ingrese el precio del libro (ejemplo: 20.40)"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ editMode ? "Actualizar Libro" : "Guardar Libro" }}
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

    <!-- Tabla de libros -->
    <div class="mt-5">
      <h3 class="tgLibro">Lista de Libros</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Título</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="libro in libros" :key="libro.isbn">
            <td>{{ libro.isbn }}</td>
            <td>{{ libro.title }}</td>
            <td>{{ libro.price }}</td>
            <td>
              <button
                class="btn btn-warning btn-sm"
                @click="editarLibro(libro)"
              >
                Editar
              </button>
              <button
                class="btn btn-danger btn-sm ms-2"
                @click="borrarLibro(libro.isbn)"
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
  crearLibroFachada,
  actualizarLibroFachada,
  borrarLibroFachada
} from "../clientes/clienteBooks";

export default {
  data() {
    return {
      libro: {
        isbn: "",
        title: "",
        price: ""
      },
      libros: [],
      editMode: false
    };
  },
  created() {
    this.cargarLibros();
  },
  methods: {
    async cargarLibros() {
      try {
        this.libros = await obtenerTodosFachada();
      } catch (error) {
        console.error("Error al cargar los libros:", error);
      }
    },
    async guardarLibro() {
      if (!this.libro.isbn.trim() || !this.libro.title.trim()) {
        alert("El ISBN y el título son obligatorios.");
        return;
      }

      const parsedPrice = parseFloat(this.libro.price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        alert("El precio debe ser un número positivo y válido (ejemplo: 20.40).");
        return;
      }

      this.libro.price = parsedPrice; // Ensure the price is stored as a float

      try {
        if (this.editMode) {
          // Actualizar libro existente
          await actualizarLibroFachada(this.libro.isbn, this.libro);
          alert("Libro actualizado exitosamente.");
        } else {
          // Crear nuevo libro
          await crearLibroFachada(this.libro);
          alert("Libro creado exitosamente.");
        }
        this.cargarLibros();
        this.resetFormulario();
      } catch (error) {
        console.error("Error al guardar el libro:", error);
        alert("Error al guardar el libro.");
      }
    },
    editarLibro(libro) {
      this.libro = { ...libro };
      this.editMode = true;
    },
    async borrarLibro(isbn) {
      if (!confirm("¿Está seguro de que desea eliminar este libro?")) return;

      try {
        await borrarLibroFachada(isbn);
        alert("Libro eliminado exitosamente.");
        this.cargarLibros();
      } catch (error) {
        console.error("Error al eliminar el libro:", error);
        alert("Error al eliminar el libro.");
      }
    },
    cancelarEdicion() {
      this.resetFormulario();
    },
    resetFormulario() {
      this.libro = {
        isbn: "",
        title: "",
        price: ""
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
  border-color: rgba(135, 206, 235, 0.3);
  box-shadow: 0 8px 25px rgba(135, 206, 235, 0.15);
}


.tgLibro {
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