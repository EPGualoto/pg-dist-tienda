<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">🛒 Carrito de Compras</h2>

    <div v-if="carrito.length === 0" class="alert alert-info text-center">
      El carrito está vacío.
    </div>

    <div v-else class="row">
      <div class="col-md-4" v-for="libro in carritoAgrupado" :key="libro.isbn">
        <div class="card mb-4 shadow">
          <div class="card-body">
            <h5 class="card-title">{{ libro.title }}</h5>
            <p class="card-text"><strong>Precio:</strong> ${{ libro.price }}</p>
            <p class="card-text"><strong>Cantidad:</strong> {{ libro.quantity }}</p>
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item"
                v-for="(autor, i) in libro.authors"
                :key="i"
              >
                {{ autor }}
              </li>
            </ul>
            <button
              class="btn btn-danger btn-sm mt-3"
              @click="eliminarPorISBN(libro.isbn)"
            >
              Eliminar del carrito
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="carrito.length > 0" class="mt-4">
      <h5>Seleccionar Cliente:</h5>
      <select v-model="selectedCustomer" class="form-select">
        <option
          v-for="customer in customers"
          :key="customer.id"
          :value="customer.id"
        >
          {{ customer.name }}
        </option>
      </select>
    </div>

    <div
      v-if="carrito.length > 0 && selectedCustomer"
      class="mt-5 p-4 border bg-white"
    >
      <h4 class="text-center mb-4">🧾 Detalles de la Orden</h4>

      <div class="row mb-3">
        <div class="col-md-6">
          <p><strong>Cliente:</strong> {{ clienteSeleccionado.name }}</p>
          <p><strong>Email:</strong> {{ clienteSeleccionado.email }}</p>
        </div>
        <div class="col-md-6 text-md-end">
          <p><strong>Fecha de Orden:</strong> {{ fechaActual }}</p>
          <p><strong>Estado:</strong> PREPARANDO</p>
        </div>
      </div>

      <table class="table table-bordered table-hover">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Autores</th>
            <th>Cant.</th>
            <th>Precio Unit.</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in carritoAgrupado" :key="item.isbn">
            <td>{{ index + 1 }}</td>
            <td>{{ item.title }}</td>
            <td>
              <ul class="mb-0 ps-3">
                <li v-for="autor in item.authors" :key="autor">{{ autor }}</li>
              </ul>
            </td>
            <td>{{ item.quantity }}</td>
            <td>${{ item.price.toFixed(2) }}</td>
            <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="text-end mt-3">
        <p><strong>Subtotal:</strong> ${{ total.toFixed(2) }}</p>
        <h5><strong>Total:</strong> ${{ total.toFixed(2) }}</h5>
      </div>
    </div>

    <div
      v-if="carrito.length > 0 && selectedCustomer"
      class="text-center mt-4"
    >
      <button class="btn btn-primary btn-lg" @click="procesarCompra">
        Procesar Compra
      </button>
    </div>
  </div>
</template>

<script>
import ClienteCustomers from "../clientes/ClienteCustomers";

export default {
  data() {
    return {
      carrito: [],
      customers: [],
      selectedCustomer: null
    };
  },
  computed: {
    total() {
      return this.carrito.reduce((sum, libro) => sum + libro.price, 0);
    },
    clienteSeleccionado() {
      return (
        this.customers.find((c) => c.id === this.selectedCustomer) || {}
      );
    },
    fechaActual() {
      const hoy = new Date();
      return hoy.toLocaleDateString("es-EC", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    },
    carritoAgrupado() {
      const agrupado = [];
      this.carrito.forEach((libro) => {
        const existente = agrupado.find((item) => item.isbn === libro.isbn);
        if (existente) {
          existente.quantity += 1;
        } else {
          agrupado.push({ ...libro, quantity: 1 });
        }
      });
      return agrupado;
    }
  },
  created() {
    const data = localStorage.getItem("carrito");
    this.carrito = data ? JSON.parse(data) : [];
    this.fetchCustomers();
  },
  methods: {
    eliminarPorISBN(isbn) {
      this.carrito = this.carrito.filter((item) => item.isbn !== isbn);
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    },
    async fetchCustomers() {
      try {
        this.customers = await ClienteCustomers.obtenerTodos();
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    },
    procesarCompra() {
      if (!this.selectedCustomer) {
        alert("Por favor, seleccione un cliente.");
        return;
      }

      const order = {
        customer: {
          id: this.selectedCustomer,
          name: this.clienteSeleccionado.name,
          email: this.clienteSeleccionado.email
        },
        total: this.total,
        status: "ENTREGADO",
        placedOn: new Date().toISOString(),
        deliveredOn: new Date().toISOString(),
        lineItems: this.carritoAgrupado.map((libro) => ({
          isbn: libro.isbn,
          quantity: libro.quantity
        }))
      };

      fetch("http://localhost:7070/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      })
        .then((response) => {
          if (response.ok) {
            alert("Compra procesada exitosamente.");
            this.carrito = [];
            localStorage.removeItem("carrito");
            this.selectedCustomer = null;
          } else {
            alert("Error al procesar la compra.");
          }
        })
        .catch((error) => {
          console.error("Error al procesar la compra:", error);
        });
    }
  }
};
</script>

<style scoped>
.container {
  background: linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 100%);
  min-height: 100vh;
  padding: 40px 20px;
}

h2 {
  color: #000000;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.col-md-4 {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.mt-5 {
  background: rgb(242, 228, 242,0.95);
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
</style>
