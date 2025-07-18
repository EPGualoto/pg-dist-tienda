<template>
  <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
    <div class="container-fluid">
   
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="@/assets/logo.png" alt="Logo" class="me-2" height="40" />
        <span class="fw-bold text-white fs-5">Mi Librería</span>
      </router-link>

     
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

   
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-center">
          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/libros">Libros</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/ordenes-clientes">Ordenes Clientes</router-link>
          </li>
          
          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/añadir-autores">UP-Autores</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/añadir-libros">UP-Libros</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/añadir-clientes">UP-Clientes</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/carrito">🛒 Carrito</router-link>
          </li>
        </ul>

       
        <form class="d-flex ms-3" role="search" @submit.prevent="buscar">
          <input
            class="form-control me-2"
            type="search"
            v-model="terminoBusqueda"
            placeholder="Buscar libros..."
            aria-label="Search"
          />
          <button class="btn btn-outline-light" type="submit">Buscar</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const terminoBusqueda = ref('')

const buscar = () => {
  if (terminoBusqueda.value.trim()) {
    router.push({ path: '/buscar', query: { q: terminoBusqueda.value.trim() } })
    terminoBusqueda.value = ''
  }
}
</script>

<style scoped>

.custom-navbar {
  background-color: #003366; 
}


.nav-link {
  font-weight: 500;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}


.nav-hover:hover {
  background-color: #0055a5; 
  color: white;
  text-decoration: none;
}

form input.form-control {
  background-color: #ffffff;
  color: #000;
  border-radius: 0.375rem;
}
</style>


        