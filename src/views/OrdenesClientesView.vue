<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Clientes y Órdenes</h2>

    <div class="mb-4">
      <h5>Seleccionar Cliente:</h5>
      <select v-model="selectedCustomer" class="form-select" @change="fetchOrders">
        <option v-for="customer in customers" :key="customer.id" :value="customer.id">
          {{ customer.name }}
        </option>
      </select>
    </div>

    <div v-if="orders.length === 0" class="alert alert-info text-center">
      No hay órdenes para este cliente.
    </div>

    <div v-else>
      <h5 class="mb-3">Órdenes:</h5>
      <ul class="list-group">
        <li class="list-group-item" v-for="order in orders" :key="order.id">
          <h6>Orden ID: {{ order.id }}</h6>
          <p><strong>Total:</strong> ${{ Number(order.total).toFixed(2) }}</p>
          <ul>
            <li v-for="item in order.lineItems" :key="item.isbn">
              {{ item.title }} - ${{ item.price.toFixed(2) }} ({{ item.quantity }} unidades)
            </li>
          </ul>
          <button class="btn btn-danger btn-sm mt-3" @click="borrarOrden(order.id)">
            Borrar Orden
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClienteCustomers from "../clientes/ClienteCustomers";

export default {
  data() {
    return {
      customers: [],
      selectedCustomer: null,
      orders: []
    };
  },
  created() {
    this.fetchCustomers();
  },
  methods: {
    async fetchCustomers() {
      try {
        this.customers = await ClienteCustomers.obtenerTodos();
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    },
    async fetchOrders() {
      if (!this.selectedCustomer) return;

      try {
        const response = await fetch(`http://localhost:7070/orders/customer/${this.selectedCustomer}`);
        this.orders = await response.json();
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    },
    async borrarOrden(orderId) {
      try {
        const response = await fetch(`http://localhost:7070/orders/${orderId}`, {
          method: "DELETE"
        });

        if (response.ok) {
          alert("Orden borrada exitosamente.");
          this.fetchOrders(); // Refrescar la lsita de ordenes
        } else {
          alert("Error al borrar la orden.");
        }
      } catch (error) {
        console.error("Error al borrar la orden:", error);
      }
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

.mt-5 {
  background: rgba(218, 243, 249, 0.95);
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

@media (max-width: 768px) {
  .container {
    padding: 20px 15px;
  }

  form, .mt-5 {
    padding: 20px;
  }

}

</style>
