<template>
  <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
    <div
      class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
    >
      <div class="flex flex-col overflow-y-auto md:flex-row">
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div class="w-full">
            <form>
              <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Registro Beauty SV
              </h1>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >Nombre</label
              >
              <input
                type="text"
                name="name"
                v-model="name"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Name"
              />
              <label class="block mt-4 text-sm font-medium text-gray-700 dark:text-gray-200"
                >Username</label
              >
              <input
                type="text"
                name="username"
                v-model="username"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Username"
              />

              <label class="block mt-4 text-sm font-medium text-gray-700 dark:text-gray-200"
                >Email</label
              >
              <input
                type="email"
                name="email"
                v-model="email"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Email Address"
              />
              <label class="block mt-4 text-sm font-medium text-gray-700 dark:text-gray-200"
                >Contraseña</label
              >
              <input
                type="password"
                name="password"
                v-model="password"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Password"
              />
              <label class="block mt-4 text-sm font-medium text-gray-700 dark:text-gray-200"
                >Confirmar Contraseña</label
              >
              <input
                type="password"
                name="password_confirmation"
                v-model="password_confirmation"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Confirma tu password"
              />
              <MensajesError :errores="errores"></MensajesError>
              <button
                @click.prevent="registrarUsuario"
                class="w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                Registrarme
              </button>
              <hr class="my-8" />
            </form>
            <p class="mt-1">
              <RouterLink
                class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                to="/login"
              >
                Ya tienes una cuenta? Inicia sesion
              </RouterLink>
            </p>
          </div>
        </div>
        <div class="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            class="object-cover w-full h-full dark:hidden"
            src="https://picsum.photos/seed/picsum/600/600"
            alt="Office"
          />
          <img
            aria-hidden="true"
            class="hidden object-cover w-full h-full dark:block"
            src="https://picsum.photos/seed/picsum/600/600"
            alt="Office"
          />
        </div>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<script>
import { RouterView, RouterLink } from 'vue-router'
import MensajesError from '../shared/components/MensajesError.vue'
import clienteAxios from '../config/axios'
import { useAuthStore } from '../store/auth'

export default {
  components: {
    MensajesError
  },
  data() {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      rol:1,
      errores: {}
    }
  },
  methods: {
    async registrarUsuario() {
      const datos = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        rol:this.rol
      }

      await clienteAxios
        .post('/api/registro', datos)
        .then((response) => {
          ///guardando datos en store de pinia y token localstorage
          const authStore = useAuthStore()
          authStore.login(response.data.user)
          authStore.userToken(response.data.token)
          localStorage.setItem('AUTH_TOKEN', response.data.token)
          //console.log(response.data.user)
          this.errores = {}
          ///redireccionando al usuario
          this.$router.push('/')
        })
        .catch((error) => {
          //console.log(error)
          if (error.response) {
            this.errores = error.response.data.errors
          }
        })
    }
  }
}
</script>
