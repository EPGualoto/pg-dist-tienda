<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4 text-primary">Crear cuenta</h2>

    <form @submit.prevent="registrarse" class="mx-auto" style="max-width: 500px">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre completo</label>
        <input
          v-model="form.nombre"
          type="text"
          class="form-control"
          id="nombre"
          placeholder="Juan Pérez"
          required
        />
      </div>

      <div class="mb-3">
        <label for="correo" class="form-label">Correo electrónico</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          id="correo"
          placeholder="correo@ejemplo.com"
          required
        />
      </div>

      <div class="mb-3">
        <label for="contrasena" class="form-label">Contraseña</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="contrasena"
          required
        />
      </div>

      <div class="mb-3">
        <label for="confirmar" class="form-label">Confirmar contraseña</label>
        <input
          v-model="form.confirmar"
          type="password"
          class="form-control"
          id="confirmar"
          required
        />
      </div>

      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <button type="submit" class="btn btn-primary w-100">Registrarse</button>

      <div class="text-center mt-3">
        <router-link to="/login">¿Ya tienes cuenta? Inicia sesión</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  nombre: '',
  email: '',
  password: '',
  confirmar: ''
})
const error = ref('')

const registrarse = () => {
  if (form.value.password !== form.value.confirmar) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  // Simular guardado en backend (o localStorage)
  const usuario = {
    nombre: form.value.nombre,
    email: form.value.email,
    password: form.value.password
  }

  // Ejemplo: guardar en localStorage (debes cambiar por llamada a API real)
  localStorage.setItem('usuario', JSON.stringify(usuario))

  // Redirigir al login
  router.push('/login')
}
</script>

<style scoped>
h2 {
  font-weight: 700;
}

form input {
  border-radius: 8px;
}
</style>
