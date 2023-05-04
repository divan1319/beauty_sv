<template>
  <!-- Mobile menu, show/hide based on menu state. -->
  <div class="md:hidden" :class="{ hidden: !isMenuOpen }" id="mobile-menu">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <RouterLink
        to="/"
        class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
        >Inicio</RouterLink
      >

      <RouterLink
        to=""
        class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
        >Modelos</RouterLink
      >
      <div v-if="isAuth">
        <RouterLink
          :to="{name:'perfil',params:{username:username}}"
          
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >Mi Perfil</RouterLink
        >
        <button
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          @click="logout"
          >Cerrar Sesion</button
        >
    </div>
      <div v-else>
        <RouterLink
          to="/login"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >Iniciar Sesion</RouterLink
        >
        <RouterLink
          to="/register"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >Registro</RouterLink
        >
      </div>
    </div>
  </div>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  props: {
    isMenuOpen: Boolean,
    isAuth: Boolean,
    username:String,
    toggleMenu:Function,
    logout:Function
  },
  
}
</script>
