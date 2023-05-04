<template>
  <form @submit.prevent="handleUpdatePass" class="space-y-4 md:w-2/4 md:mx-auto">
    <div class="grid grid-cols-1 gap-4">
      <div class="col-span-1 sm:col-span-1">
        <label class="block text-white font-bold mb-2" for="actual_password">
          Password Actual
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          id="actual_password"
          v-model="actual_pass"
          type="password"
          placeholder="********"
        />
      </div>
      <div class="col-span-1 md:col-span-1">
        <label class="block text-white font-bold mb-2" for="new_password"> Password Nueva </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          id="new_password"
          v-model="new_pass"
          type="password"
          placeholder="********"
        />
      </div>
      <div class="col-span-1">
        <label class="block text-white font-bold mb-2" for="password_confirmation"
          >Confirmar Password</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          id="password_confirmation"
          v-model="confirm_pass"
          type="password"
          placeholder="********"
        />
      </div>
    </div>
    <!-- Botón de guardar cambios -->
    <div class="flex justify-center">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Cambiar Password
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
      actual_pass: '',
      new_pass: '',
      confirm_pass: '',
      token: useAuthStore().token,
      id: useAuthStore().profile.user.id,
    }
  },
  methods: {
    async handleUpdatePass() {
      const datos = {
        id: this.id,
        actual_pass: this.actual_pass,
        password:this.new_pass,
        password_confirmation:this.confirm_pass,
      }
      await clienteAxios
        .put('/api/perfil/security', datos, { headers: { Authorization: `Bearer ${this.token}` } })
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
