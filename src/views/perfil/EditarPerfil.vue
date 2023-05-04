<template>
  <div class="bg-gray-900 shadow-lg p-6 ">
    <!-- Título -->
    <h2 class="text-xl font-bold mb-4 text-white">Actualizar Datos</h2>
    <!-- Formulario de perfil -->
    <!-- Subnav del switcher -->
    <nav class="w-full mx-auto max-w-md mb-4">
      <div class="flex">
        <button
          class="flex-1 text-gray-100 py-2 px-4 border-b-2 font-semibold focus:outline-none"
          :class="{ 'border-cyan-400 bg-slate-500 rounded-t-lg': selectedOption === 'option1' }"
          @click="selectedOption = 'option1'"
        >
          Informacion Basica
        </button>
        <button
          class="flex-1 text-gray-100 py-2 px-4 border-b-2 font-semibold focus:outline-none"
          :class="{ 'border-cyan-400 bg-slate-500 rounded-t-lg': selectedOption === 'option2' }"
          @click="selectedOption = 'option2'"
        >
          Informacion Adicional
        </button>
        <button
          class="flex-1 text-gray-100 py-2 px-4 border-b-2 font-semibold focus:outline-none"
          :class="{ 'border-cyan-400 bg-slate-500 rounded-t-lg': selectedOption === 'option3' }"
          @click="selectedOption = 'option3'"
        >
          Seguridad
        </button>
      </div>
    </nav>
    <div>
      <!-- Contenido del switcher -->
        <div v-show="selectedOption === 'option1'">
          <BasicInfo />
        </div>
        <div v-show="selectedOption === 'option2'">
          <AdvanInfo />
        </div>
        <div v-show="selectedOption === 'option3'">
          <AdvanSec />
        </div>
    </div>
  </div>
</template>

<script>
import AdvanInfo from './components/AdvanInfo.vue';
import BasicInfo from './components/BasicInfo.vue';
import AdvanSec from './components/AdvanSec.vue';

export default {
    data() {
        return {
            selectedOption: "option1"
        };
    },
    components: { BasicInfo,AdvanInfo,AdvanSec}
}
</script>
