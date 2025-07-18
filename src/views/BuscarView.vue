<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Resultado de búsqueda: "{{ termino }}"</h2>

    <div class="row">
      <div
        class="col-md-4"
        v-for="libro in librosFiltrados"
        :key="libro.isbn"
      >
        <div class="card mb-4 shadow">
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">{{ libro.title }}</h5>
              <p class="card-text">
                <strong>Autores:</strong>
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item"
                    v-for="(autor, index) in libro.authors"
                    :key="index"
                  >
                    {{ autor }}
                  </li>
                </ul>
              </p>
              <p class="card-text mt-2">
                <strong>Precio:</strong> ${{ libro.price }}
              </p>
            </div>
            <div class="card-buttons">
              <router-link
                :to="`/libros/${libro.isbn}`"
                class="btn btn-primary btn-sm"
              >
                Ver detalles
              </router-link>
              <button class="btn btn-success btn-sm" @click="agregarAlCarrito(libro)">
                Añadir al carrito 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="librosFiltrados.length === 0" class="alert alert-info mt-4 text-center">
      No se encontraron resultados para "{{ termino }}"
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerTodosFachada } from '@/clientes/clienteBooks'

const route = useRoute()
const termino = ref(route.query.q || '')
const librosFiltrados = ref([])

const buscarLibros = async () => {
  const todos = await obtenerTodosFachada()
  librosFiltrados.value = todos.filter(libro =>
    libro.title.toLowerCase().includes(termino.value.toLowerCase()) ||
    libro.isbn.includes(termino.value)

  )
}

onMounted(buscarLibros)

watch(() => route.query.q, (nuevo) => {
  termino.value = nuevo || ''
  buscarLibros()
})

const agregarAlCarrito = (libro) => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || []
  carrito.push(libro)
  localStorage.setItem('carrito', JSON.stringify(carrito))
  alert('Libro añadido al carrito ✅')
}
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

.card {
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
}

.card:hover {
  transform: scale(1.05);
  border-color: #87CEEB;
  box-shadow: 0 12px 35px rgba(135, 206, 235, 0.25);
}

.card-body {
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 20px;
  background: linear-gradient(145deg, #ffffff 0%, #f8fdf8 100%);
  border-radius: 13px;
}

.card:hover .card-body {
  background: linear-gradient(145deg, rgba(135, 206, 235, 0.03) 0%, rgba(135, 206, 235, 0.08) 100%);
}

.card-content {
  flex-grow: 1;
}

.card-title {
  color: #000000;
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.card-text {
  color: #000000;
  margin-bottom: 10px;
  line-height: 1.5;
}

.card-text strong {
  color: #000000;
  font-weight: 600;
}

.list-group-item {
  background: rgba(144, 238, 144, 0.05);
  border: 1px solid rgba(144, 238, 144, 0.2);
  color: #000000;
  transition: background-color 0.2s ease;
  border-radius: 6px;
  margin-bottom: 3px;
  padding: 8px 12px;
  font-size: 0.9rem;
}

.list-group-item:hover {
  background: rgba(144, 238, 144, 0.15);
}

.card-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.btn {
  width: 180px;
  text-align: center;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(145deg, #007bff, #0056b3);
  border: none;
}

.btn-success {
  background: linear-gradient(145deg, #28a745, #1e7e34);
  border: none;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.col-md-4 {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.alert-danger {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  color: #721c24;
  border-radius: 10px;
}


@media (max-width: 768px) {
  .container {
    padding: 20px 15px;
  }

  .card {
    width: 100%;
    max-width: 350px;
  }
}
</style>

