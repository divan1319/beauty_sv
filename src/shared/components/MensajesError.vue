<template>
  <div v-for="(mensaje,campo) in errores" :key="campo">
    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mt-2" role="alert">
      <div class="flex">
        <div class="flex-shrink-0"></div>
        <div class="ml-3">
          <p class="font-bold">Error:</p>
          <p>{{ mensaje[0] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errores: {
      type: Object,
      required: true
    }
  }
}
</script>
