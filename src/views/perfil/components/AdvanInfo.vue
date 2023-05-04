<template>
  <div>
    <form class="space-y-4 md:w-2/4 md:mx-auto">
        <div class="flex items-center space-x-4 mx-auto">
        <div class="w-32 h-32 bg-gray-700 rounded-full overflow-hidden" v-if="imageUrl">
          <img
            class="w-full h-full object-cover"
            :src="imageUrl"
            v-once
            />
        </div>
        <input  type="file" @change="onFileChange">
      </div>
      <!-- Campos de entrada -->
      <!---<h2 class="text-sm font-bold mb-0 text-slate-300">Informacion Adicional</h2>-->
      <div class="grid grid-cols-4 gap-4">
        <div class="md:col-span-2 col-span-4">
          <label class="block text-white font-bold mb-2" for="dui"> DUI </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="dui"
            type="text"
            placeholder="John"
          />
        </div>
        <div class="md:col-span-2 col-span-4">
          <label class="block text-white font-bold mb-2" for="telefono"> Telefono </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="telefono"
            type="text"
            placeholder="@usuario"
          />
        </div>
        <div class="md:col-span-2 col-span-4">
          <label class="block text-white font-bold mb-2" for="departamento"> Departamento </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="departamento"
            type="email"
            placeholder="correo@correo.com"
          />
        </div>
        <div class="md:col-span-2 col-span-4">
          <label class="block text-white font-bold mb-2" for="municipio"> Municipio </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="municipio"
            type="email"
            placeholder="correo@correo.com"
          />
        </div>
        <div class="md:col-span-4 col-span-4">
          <label class="block text-white font-bold mb-2" for="ocupacion"> Ocupacion </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="ocupacion"
            type="email"
            placeholder="correo@correo.com"
          />
        </div>
        <div class="col-span-4">
          <label class="block text-white font-bold mb-2" for="descripcion"> Descripcion </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
            id="descripcion"
            type="email"
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
  </div>
</template>

<script>
export default {
    data() {
    return {
      imageUrl: '',
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
    },
  },
}
</script>
