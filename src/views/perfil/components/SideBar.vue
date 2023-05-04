<template>
  <div v-if="profile !== null">
    <!-- Contenido del sidebar -->
    <div class="px-4 py-3 bg-gray-900">
      <div v-if="profile.imagen == null">
        <!-- Aquí va la foto de perfil -->
        <img class="mx-auto w-32 h-32 rounded-full" src="/images/woman.png" alt="">
      </div>
      <div v-else>
        <img class="mx-auto w-32 h-32 rounded-full" :src="urlImage+profile.imagen" :alt="'Image Profile '+user.name">
      </div>
      <div class="mt-4 ">
        <h2 class="text-white text-lg font-medium text-center">{{ profile.user.name }}</h2>
        <p class="text-gray-400 text-sm text-center">{{ profile.ocupation.nonbre }}</p>
      </div>
    </div>
    <div  class=" mt-auto  px-4 py-3 bg-gray-900">
      <RouterLink
        :to="{name:'editar',params:{username:user.username}}"
        class="flex  mx-auto items-center justify-center w-full md:w-32 h-10 text-white bg-red-500 rounded-lg hover:bg-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
          />
        </svg>
        <span class="mr-2">Editar</span>
      </RouterLink>
    </div>
  </div>
    <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from '../../../store/auth';
//import { useAuthStore } from '../../store/auth';


export default {
data(){
return{
  urlImage:'http://192.168.0.4:8000/storage/images/'
}
},
computed:{
    user(){
        return useAuthStore().user
    },
    profile(){
      return useAuthStore().profile
    }
}
}
</script>
