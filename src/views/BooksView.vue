<template>
  <!-- BANNER DE IMÁGENES / CAROUSEL -->
    <div id="carouselBanner" class="carousel slide mb-5" data-bs-ride="carousel">
      <div class="carousel-inner rounded">
        <div class="carousel-item active">
          <img src="@/assets/banner1.jpg" class="d-block w-100 carousel-img" alt="Banner 1">
          <div class="carousel-caption d-none d-md-block">
          <h3 class="text-shadow">El mejor lugar para comprar libros</h3>
          <p class="text-shadow">Explora miles de títulos con un clic</p>
      </div>
        </div>
        <div class="carousel-item">
          <img src="@/assets/banner2.jpg" class="d-block w-100 carousel-img" alt="Banner 2">
          <div class="carousel-caption d-none d-md-block">
          <h3 class="text-shadow">Tu próxima aventura literaria te espera</h3>
      </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselBanner" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselBanner" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Libros disponibles</h2>
    <div class="row">
      <div
        class="col-md-4"
        v-for="libro in libros"
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

    <div v-if="error" class="alert alert-danger mt-4 text-center">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { obtenerTodosFachada } from '@/clientes/clienteBooks'

export default {
  data() {
    return {
      libros: [],
      error: ''
    }
  },
  methods: {
  agregarAlCarrito(libro) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []
    carrito.push(libro)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    alert('Libro añadido al carrito ✅')
    }
  },
  async created() {
    try {
      this.libros = await obtenerTodosFachada()
    } catch (err) {
      this.error = 'Error al obtener los libros'
      console.error(err)
    }
  }
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

.mt-5 {
  background: rgba(193, 183, 145, 0.95);
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
.carousel-img {
  height: 800px; 
  object-fit: cover; 
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