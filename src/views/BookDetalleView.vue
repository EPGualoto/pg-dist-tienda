<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Detalles del Libro</h2>

    <div class="card shadow">
      <div class="card-body">
        <h4 class="card-title mb-3">{{ libro.title }}</h4>
        <p class="card-text"><strong>ISBN:</strong> {{ libro.isbn }}</p>
        <p class="card-text"><strong>Precio:</strong> ${{ libro.price }}</p>
        <div class="card-text">
          <strong>Autores:</strong>
          <ul class="list-group list-group-flush mt-2">
            <li class="list-group-item" v-for="(autor, index) in libro.authors" :key="index">
              {{ autor }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="text-center mt-4">
      <Boton textoBoton="Volver" @click="regresar" />
    </div>
  </div>
</template>

<script>
import Boton from '@/components/BotonVolver.vue'
import { buscarLibroPorIsbnFachada } from '@/clientes/clienteBooks.js'

export default {
  components: {
    Boton
  },
  data() {
    return {
      libro: {
        isbn: '',
        title: '',
        price: 0,
        authors: []
      }
    }
  },
  async created() {
    const isbn = this.$route.params.isbn
    this.libro = await buscarLibroPorIsbnFachada(isbn)
  },
  methods: {
    regresar() {
      this.$router.push('/libros')
    }
  }
}
</script>

<style scoped>
.container {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  padding: 40px 20px;
}

.card {
  max-width: 600px;
  margin: 0 auto;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
}

.card:hover {
  transform: translateY(-5px);
  border-color: #87CEEB;
  box-shadow: 0 12px 35px rgba(135, 206, 235, 0.25);
}

.card-body {
  transition: all 0.3s ease;
  padding: 30px;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 13px;
}

.card:hover .card-body {
  background: linear-gradient(145deg, rgba(135, 206, 235, 0.03) 0%, rgba(135, 206, 235, 0.08) 100%);
}

.card-title {
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 25px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.card-text {
  color: #495057;
  font-size: 1.1rem;
  margin-bottom: 15px;
  line-height: 1.6;
}

.card-text strong {
  color: #2c3e50;
  font-weight: 600;
}

.list-group-item {
  background: rgba(135, 206, 235, 0.05);
  border: 1px solid rgba(135, 206, 235, 0.2);
  color: #495057;
  transition: background-color 0.2s ease;
  border-radius: 8px;
  margin-bottom: 5px;
}

.list-group-item:hover {
  background: rgba(135, 206, 235, 0.15);
}

h2 {
  color: #2c3e50;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.text-center.mt-4 {
  margin-top: 40px !important;
}
</style>
