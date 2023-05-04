<template>
  <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
    <div
      class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
    >
      <div class="flex flex-col overflow-y-auto md:flex-row">
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
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div class="w-full">
            <form>
            <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Iniciar Sesion</h1>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Username</label>
            <input
              type="text"
              v-model="username"
              name="username"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Username"
            />
            <label class="block mt-4 text-sm font-medium text-gray-700 dark:text-gray-200"
              >Contraseña</label
            >
            <input
              type="password"
              v-model="password"
              name="password"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Password"
            />
            <MensajesError :errores="errores"></MensajesError>
            <button
            @click.prevent="handleLogin"
            :disabled="loading"
              class="w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
             {{ loading ? 'Iniciando Sesion...':'Iniciar Sesion' }} 
            </button>
          </form>
            <hr class="my-8" />
            <p class="mt-4">
              <a
                class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                href="#"
              >
                Olvidaste La Contraseña
              </a>
            </p>
            <p class="mt-1">
              <RouterLink
                class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                to="/register"
              >
                Crear una cuenta
              </RouterLink>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <RouterView />
</template>
<script>
import {RouterLink,RouterView} from 'vue-router'
import MensajesError from '@/shared/components/MensajesError.vue';
import clienteAxios from '../config/axios';
import {useAuthStore} from '../store/auth'

export default {
  components:{
    MensajesError        
    },
  data() {
    return {
      username: '',
      password: '',
      errores: {},
      loading:false
    }
  },
  methods:{
    async handleLogin(){
      this.loading=true
      const datos = {
        username: this.username,
        password: this.password,
      }
      await clienteAxios
        .post('/api/login', datos)
        .then((response) => {
          //guardado datos usuario autenticado en el store
          const authStore = useAuthStore()
          authStore.login(response.data.user)
          authStore.userToken(response.data.token)
          //guardando token de la sesion
          localStorage.setItem('AUTH_TOKEN', response.data.token);
          ///si no hay errores no se guardan
          this.errores = {}
          ///redireccionando al usuario
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error.response)
          this.loading = false
          if (error.response) {
            this.errores =  error.response.data.errors
          }
        })
    }
  }
}
</script>