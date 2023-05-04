<template>
  <div class="flex flex-col md:flex-row justify-center py-10 bg-slate-200">
    <div class="md:w-1/3 sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-extrabold text-gray-900 md:mt-36">Datos Adicionales</h2>
      <p class="mt-5 text-center text-sm text-gray-600">
        Para comenzar a publicar, primero debes de completar algunos campos importantes para tu
        perfil y poder llegar a mas patrocinadores
      </p>
    </div>
    <div class="mt-8 md:mt-0 md:max-w-2xl w-auto sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleSubmitDatos">
          <div class="flex flex-col gap-6">
            <div>
              <label for="imagen" class="block text-sm font-medium text-gray-700">Foto</label>

                <input
                  type="file"
                  accept=".jpg,.png"
                  class="shadow-sm block w-full h-10 sm:text-sm bg-gray-100 rounded-md"
                  ref="inputFile"
                  @change="onFileSelected"
                />
            </div>
            <div>
              <label for="dui" class="block text-sm font-medium text-gray-700"> DUI </label>
              <div class="mt-1">
                <input
                  type="text"
                  name="dui"
                  id="dui"
                  v-model="dui"
                  placeholder="Ejem. 12345678-9"
                  class="shadow-sm block w-full h-10 sm:text-sm bg-gray-100 rounded-md"
                />
              </div>
            </div>
            <div>
              <label for="telefono" class="block text-sm font-medium text-gray-700">
                Número de Contacto
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  name="telefono"
                  id="telefono"
                  v-model="telefono"
                  placeholder="Ejem. 7543-1100"
                  class="shadow-sm block w-full h-10 sm:text-sm bg-gray-100 rounded-md"
                />
              </div>
            </div>
            <div>
              <label for="descripcion" class="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <div class="mt-1">
                <textarea
                  name="descripcion"
                  id="descripcion"
                  v-model="descripcion"
                  class="shadow-sm resize-none w-full h-36 sm:text-sm bg-gray-100 rounded-md"
                  placeholder="Describete, dile al mundo quien eres!"
                ></textarea>
              </div>
            </div>
            <div>
              <label for="depa" class="block text-sm font-medium text-gray-700">Departamento</label>
              <select
                id="depa"
                name="departamento"
                class="shadow-sm block w-full h-10 sm:text-sm border-gray-300 text-center rounded-md"
                v-model="departamento"
              >
                <option v-for="dep in departamentos" :value="dep.id">{{ dep.nombre }}</option>
              </select>
            </div>
            <div>
              <label for="municipio" class="block text-sm font-medium text-gray-700"
                >Municipio</label
              >
              <select
                id="municipio"
                name="municipio"
                class="shadow-sm block w-full h-10 sm:text-sm border-gray-300 text-center rounded-md"
                v-model="municipio"
              >
                <option v-for="mun in municipios" :key="mun.id" :value="mun.id">
                  {{ mun.nombre }}
                </option>
              </select>
            </div>
            <div>
              <label for="ocupacion" class="block text-sm font-medium text-gray-700"
                >Ocupacion</label
              >
              <select
                id="ocupacion"
                name="ocupacion"
                v-model="ocupacion"
                class="shadow-sm block w-full h-10 sm:text-sm border-gray-300 text-center rounded-md"
              >
                <option v-for="occup in ocupaciones" :key="occup.id" :value="occup.id">
                  {{ occup.nonbre }}
                </option>
              </select>
            </div>
            <div class="pt-5">
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import clienteAxios from '../../../config/axios'
import { useAuthStore } from '../../../store/auth'

export default {
  data() {
    return {
      fileName: null,
      dui: '',
      telefono: '',
      municipio: null,
      ocupacion: null,
      descripcion: '',
      departamentos: [],
      departamento: null,
      municipios: [],
      ocupaciones: [],
      token: useAuthStore().token
    }
  },
  mounted() {
    this.getDepartamentos()
  },
  methods: {
    onFileSelected(event) {
      this.fileName = event.target.files[0]
    },
    async getDepartamentos() {
      await clienteAxios
        .get(`/api/departamentos/`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then((res) => {
          this.departamentos = res.data.departamentos
          this.ocupaciones = res.data.ocupaciones
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getMunicipio() {
      await clienteAxios
        .get(`/api/departamentos/${this.departamento}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then((res) => {
          this.municipios = res.data.municipios
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async handleSubmitDatos() {
      let datos = new FormData()
      datos.append('user_id', useAuthStore().user.id)
      datos.append('dui', this.dui)
      datos.append('telefono', this.telefono)
      datos.append('municipio_id', this.municipio)
      datos.append('ocupation_id', this.ocupacion)
      datos.append('descripcion', this.descripcion)
      datos.append('imagen', this.fileName)
      clienteAxios
        .post('/api/perfil', datos, { headers: { Authorization: `Bearer ${this.token}` } })
        .then(res =>{
          console.log(res.data)
          this.$router.push({name:'home'})
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  watch: {
    departamento(newMunicipio, oldMunicipio) {
      if (newMunicipio !== null) {
        this.getMunicipio()
      }
    }
  }
}
</script>
