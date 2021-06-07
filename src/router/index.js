import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeCategoria from '../views/HomeCategoria.vue'
import AgregarCategoria from '../views/AgregarCategoria.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router