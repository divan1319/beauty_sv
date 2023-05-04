<template>
  <form @submit.prevent="handleUpdateUser" class="space-y-4 md:w-2/4 md:mx-auto">
    <!-- Avatar 
      -->
    <!-- Campos de entrada -->

    <div class="grid grid-cols-1 gap-4">
      <div class="col-span-1 sm:col-span-1">
        <label class="block text-white font-bold mb-2" for="nombre"> Nombre </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          id="nombre"
          type="text"
          v-model="nombre"
          placeholder="John"
        />
      </div>
      <div class="col-span-1 md:col-span-1">
        <label class="block text-white font-bold mb-2" for="username"> Username </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          id="username"
          type="text"
          v-model="username"
          placeholder="@usuario"
        />
      </div>
      <div class="col-span-1">
        <label class="block text-white font-bold mb-2" for="correo"> Correo </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          id="correo"
          type="email"
          v-model="correo"
          placeholder="correo@correo.com"
        />
      </div>
    </div>
    <!-- Botón de guardar cambios -->
    <div class="flex justify-center">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Guardar cambios
      </button>
    </div>
  </form>
</template>

<script>
import clienteAxios from '../../../config/axios'
import { useAuthStore } from '../../../store/auth'
export default {
  data() {
    return {
      id: useAuthStore().profile.user.id,
      nombre: useAuthStore().profile.user.name,
      correo: useAuthStore().profile.user.email,
      username: useAuthStore().profile.user.username,
      token: useAuthStore().token
    }
  },
  methods: {
    async handleUpdateUser() {
      const datos = {
        id: this.id,
        name: this.nombre,
        email: this.correo,
        username: this.username
      }
      await clienteAxios
        .put('/api/perfil/user', datos, { headers: { Authorization: `Bearer ${this.token}` } })
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error)
        })
    }
  }
}
</script>
