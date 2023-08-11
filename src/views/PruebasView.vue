<template>
    <div class="flex flex-col w-full ">
        <button @click="handlePruebas" class="w-32 bg-blue-800 p-2 rounded-lg hover:bg-blue-500 mx-auto mb-10">Probar</button>
        <button @click="handleRol" class="w-32 bg-blue-800 p-2 rounded-lg hover:bg-blue-500 text-lg text-white font-bold mx-auto">Agregar Rol</button>
        <button @click="handleTech" class="w-32 bg-blue-800 p-2 rounded-lg hover:bg-blue-500 text-lg text-white font-bold mx-auto">Agregar Techs</button>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'
const datos = reactive({
    name:'Salon de Belleza',
    repo:'https://github.com/divan1319/backend-api33',
    privacy:'publico',
    status:'desarrollo',
    limit_requets:6,
    user_id:1,
    created_at:'2023/08/10'
})

const datosRol = reactive({
    project_id:2,
    user_id:3,
    role_id:1
})
const datosTech = reactive({
    project_id:1,
    technology_id:[1,2]
})
const handlePruebas = async ()=>{
    await clienteAxios.post('/api/projects/create-project',datos,{
        headers:{
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2OTE3NzQzNTUsImV4cCI6MTY5MTg2MDc1NSwibmJmIjoxNjkxNzc0MzU1LCJqdGkiOiJjcEV2Y2lXcm9PVmFZbzB2Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.MKia0KLpQAt_DK6oT6OcB3HgzVDDJayL866RiMBjrKk'
    }}).then(res => {
        
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}
const handleRol = async () => {
    await clienteAxios.post('/api/projects/add-rol',datosRol,{
        headers:{
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2OTE3NzQzNTUsImV4cCI6MTY5MTg2MDc1NSwibmJmIjoxNjkxNzc0MzU1LCJqdGkiOiJjcEV2Y2lXcm9PVmFZbzB2Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.MKia0KLpQAt_DK6oT6OcB3HgzVDDJayL866RiMBjrKk'
    }}).then(res => {
        Swal.fire({
            icon:'success',
            text:'Rol agregado correctamente',
            showCancelButton:false,
            confirmButtonText:'Aceptar',
        })
        console.log(res)
    }).catch(err => {
        Swal.fire({
            icon:'error',
            text:'Hubo un error al asignar el rol',
            showCancelButton:false,
            confirmButtonText:'Aceptar'
        })
        console.log(err)
    })
}
const handleTech = async () => {
    await clienteAxios.post('/api/projects/add-rol2',datosTech,{
        headers:{
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2OTE3NzQzNTUsImV4cCI6MTY5MTg2MDc1NSwibmJmIjoxNjkxNzc0MzU1LCJqdGkiOiJjcEV2Y2lXcm9PVmFZbzB2Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.MKia0KLpQAt_DK6oT6OcB3HgzVDDJayL866RiMBjrKk'
    }}).then(res => {
        Swal.fire({
            icon:'success',
            text:'Techs agregados correctamente',
            showCancelButton:false,
            confirmButtonText:'Aceptar',
        })
        console.log(res)
    }).catch(err => {
        Swal.fire({
            icon:'error',
            text:'Hubo un error al asignar las techs',
            showCancelButton:false,
            confirmButtonText:'Aceptar'
        })
        console.log(err)
    })
}
</script>
