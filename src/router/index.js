import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../store/auth';
import MiPerfil from '../views/perfil/MiPerfil.vue';
import EditarPerfil from '../views/perfil/EditarPerfil.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      component:HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:  () => import('../views/RegisterView.vue')
    },
    {
      path:'/perfil/:username',
      name:'perfil',
      component: MiPerfil,
      props:true
    },
    {
      path:'/perfil/:username/settings',
      name:'editar',
      component:EditarPerfil
    },
    {
      path:'/prueba',
      name:'pruebas',
      component: ()=> import('@/views/PruebasView.vue')
    }
  ]
});

///protegiendo rutas: publicPages se mostraran todas las rutas donde no se necesitan autenticacion 
router.beforeEach(async(to)=>{
  const publicPages = ['/','/login','/register','/prueba'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  if(authRequired && !auth.isAuth){
    auth.returnUrl = to.fullPath;
    return '/login'
  }
})

export default router
