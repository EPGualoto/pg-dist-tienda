<template>
  <button
    class="btn btn-secondary"
    @click="$emit('click')"
  >
    {{ textoBoton }}
  </button>
</template>

<script>
export default {
  name: 'BotonVolver',
  props: {
    textoBoton: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
button {
  min-width: 120px;
}
</style>
