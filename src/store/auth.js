import {defineStore} from 'pinia';

export const useAuthStore = defineStore('auth',{
    state:()=> ({
        user: null,
        profile:null,
        isAuth: false,
        returnUrl:null,
        token:null
    }),
    actions:{
        login(user){
            this.user = user
            this.isAuth = true
        },
        logout(){
            this.user = null,
            this.isAuth = false
        },
        userToken(token){
            this.token = token
        },
        getProfile(profile){
            this.profile =profile
        }
    },
    getters:{
        authn: state=>state.isAuth
    },
    persist:{
        enabled:true
    }
})