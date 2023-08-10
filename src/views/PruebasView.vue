<template>
    <div class="flex flex-col w-full ">
        <button @click="handlePruebas" class="w-32 bg-blue-800 p-2 rounded-lg hover:bg-blue-500 mx-auto mb-10">Probar</button>
        <button @click="handleRol" class="w-32 bg-blue-800 p-2 rounded-lg hover:bg-blue-500 text-lg text-white font-bold mx-auto">Agregar Rol</button>
    </div>
    <template id="my-template">
  <swal-title>
    Save changes to "Untitled 1" before closing?
  </swal-title>
  <swal-icon type="warning" color="red"></swal-icon>
  <swal-button type="confirm">
    Save As
  </swal-button>
  <swal-button type="cancel">
    Cancel
  </swal-button>
  <swal-button type="deny">
    Close without Saving
  </swal-button>
  <swal-param name="allowEscapeKey" value="false" />
  <swal-param
    name="customClass"
    value='{ "popup": "my-popup" }' />
  <swal-function-param
    name="didOpen"
    value="popup => console.log(popup)" />
</template>
</template>

<script setup>
import { reactive } from 'vue';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'
const datos = reactive({
    name:'Salon de Belleza',
    repo:'https://github.com/divan1319/backend-api',
    privacy:'publico',
    status:'desarrollo',
    limit_requets:6,
    user_id:1,
    created_at:'2023/08/10'
})

const datosRol = reactive({
    project_id:1,
    user_id:2,
    role_id:2
})
const handlePruebas = async ()=>{
    await clienteAxios.post('/api/projects/create-project',datos,{
        headers:{
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2OTE2NzY3MjQsImV4cCI6MTY5MTc2MzEyNCwibmJmIjoxNjkxNjc2NzI0LCJqdGkiOiJPazZobEJWV1k1bnR3bWV1Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.2m24mGI0BvFRs3SqbR7GTORMpTWNykLDsxk66-RbluA'
    }}).then(res => {
        
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}
const handleRol = async () => {
    await clienteAxios.post('/api/projects/add-rol',datosRol,{
        headers:{
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2OTE2NzY3MjQsImV4cCI6MTY5MTc2MzEyNCwibmJmIjoxNjkxNjc2NzI0LCJqdGkiOiJPazZobEJWV1k1bnR3bWV1Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.2m24mGI0BvFRs3SqbR7GTORMpTWNykLDsxk66-RbluA'
    }}).then(res => {
        Swal.fire({

            template:'#my-template'
            
        })
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}
</script>
