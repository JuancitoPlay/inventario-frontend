import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/components/store'
import Inventory from '@/components/inventory'
import Article from '@/components/article'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/stores',
      name: 'Stores',
      component: Store
    },
    {
      path: '/inventarios',
      name: 'Inventarios',
      component: Inventory
    },
    {
      path: '/articulos',
      name: 'Articulos',
      component: Article
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
