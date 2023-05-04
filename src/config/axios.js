import axios from 'axios';

const clienteAxios = axios.create({
    baseURL:'http://192.168.0.4:8000', 
    headers:{
        'Accept': 'application/json',
        'X-Requested-With':'XMLHttpRequest'
    },
    withCredentials:true
})

export default clienteAxios;