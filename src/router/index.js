import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeCategoria from '../views/HomeCategoria.vue'
import AgregarCategoria from '../views/AgregarCategoria.vue'
import HomePersonal from '../views/HomePersonal.vue'
import AgregarPersonal from '../views/AgregarPersonal.vue'
import EditarPersonal from '../views/EditarPersonal.vue'
import HomeTicket from '../views/HomeTicket.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/agregarCategoria',
    name: 'AgregarCategoria',
    component: AgregarCategoria
  },
  {
    path: '/homeCategoria',
    name: 'HomeCategoria',
    component: HomeCategoria
  },
  {
    path: '/homePersonal',
    name: 'HomePersonal',
    component: HomePersonal
  },
  {
    path: '/agregarPersonal',
    name: 'AgregarPersonal',
    component: AgregarPersonal
  },
  {
    path: '/editarPersonal',
    name: 'EditarPersonal',
    component: EditarPersonal
  },
  {
    path: '/homeTicket',
    name: 'HomeTicket',
    component: HomeTicket
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router