<template>
  <div v-if="estado == 1">
    <DatosAdicionales />
  </div>
  <div v-else>
    <SideBar />
  </div>
</template>

<script>
//import clienteAxios from '../../config/axios'
//import DatosAdicionales from '../../shared/perfil/DatosAdicionales.vue'

import clienteAxios from '../../config/axios'
import { useAuthStore } from '../../store/auth'
import DatosAdicionales from './components/DatosAdicionales.vue'
import SideBar from './components/SideBar.vue'

export default {
  data() {
    return {
      estado: null,
      usernameStore: useAuthStore().user.username,
      id: useAuthStore().user.id
    }
  },
  props: {
    username: String
  },
  components: {
    DatosAdicionales,
    SideBar
  },
  methods: {
    async GetEstadoDatoUser() {
      const token = localStorage.getItem('AUTH_TOKEN')

      if (this.username == this.usernameStore) {
        await clienteAxios
          .get(`/api/perfil/${this.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((res) => {
            console.log(res.data)
            const useAuth = useAuthStore()
            if(res.data.profile !== null){
              useAuth.getProfile(res.data.profile[0])
            }
            //this.estado= res.data
            this.estado = res.data.estado[0].estado_dato
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        this.$router.push({ name: 'home' })
      }
    }
  },
  computed: {
    user() {
      return useAuthStore().user
    },
    isAuth() {
      return useAuthStore().isAuth
    },

  },
  beforeMount() {
    this.GetEstadoDatoUser()
  }
}
</script>
