import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../views/auth/Login.vue"
import Signup from "../views/auth/Signup.vue"
import IsOlustur from "../views/isler/IsOlustur.vue"
import IsDetay from "../views/isler/IsDetay.vue"
import {authRef} from "../firebase/config"

const authGiris=(to,from,next)=>{
  let kullanici=authRef.currentUser

  if(!kullanici){
    next({name:'Login'})
  }else{
    next()
  }
}





const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter:authGiris
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/is-olustur',
    name: 'IsOlustur',
    component: IsOlustur,
    beforeEnter:authGiris
  },
  {
    path: '/isler/:id',
    name: 'IsDetay',
    component: IsDetay,
    beforeEnter:authGiris,
    props:true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
