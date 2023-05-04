<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <RouterLink
                to="/"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >Inicio</RouterLink
              >
              <RouterLink
                to=""
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >Modelos</RouterLink
              >
              <RouterLink
                v-if="isAuth"
                :to="{name:'perfil',params:{username:user.username}}"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >Mi Perfil</RouterLink
              >
            </div>
          </div>
        </div>
        <div v-if="isAuth" class="hidden md:flex items-center">
          <button
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-70"
            @click="logout"
          >
            Cerrar Sesion
          </button>
        </div>
        <div v-else class="hidden md:flex items-center">
          <RouterLink
            to="/login"
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >Iniciar sesión</RouterLink
          >
          <RouterLink
            to="/register"
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >Regístrate</RouterLink
          >
        </div>
        <div class="-mr-2 flex md:hidden">
          <button
            @click="isMenuOpen = !isMenuOpen"
            type="button"
            class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            :aria-expanded="isMenuOpen ? 'true' : 'false'"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Heroicon name: menu -->
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Heroicon name: x -->
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="md:hidden" :class="{ hidden: !isMenuOpen }" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink
          to="/"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >Inicio</RouterLink
        >

        <RouterLink
          to="#"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >Modelos</RouterLink
        >

        <div v-if="isAuth">
          <RouterLink
          :to="{name:'perfil',params:{username:user.username}}"
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
  </nav>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import clienteAxios from '../../config/axios'

export default {
  data() {
    return {
      isMenuOpen: false
    }
  },
  computed: {
    user() {
      return useAuthStore().user
    },
    isAuth() {
      return useAuthStore().isAuth
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    async logout() {
      const token = localStorage.getItem('AUTH_TOKEN')
      await clienteAxios
        .post('/api/logout', null,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        .then((res) => {
          const authStore = useAuthStore()
          authStore.logout()
          localStorage.removeItem('AUTH_TOKEN')
          this.$router.push({name:'login'})
        })
        .catch((e) => {
          console.log('error al cerrar sesion', e)
        })
    }
  }
}
</script>
