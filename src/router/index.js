import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/components/store'
import Inventory from '@/components/inventory'
import Login from '@/components/login'
import config from '@/config'
import Client from '@/client'
async function tokenGuard (to, from, next) {
  try {
    let client = new Client({ uri: config.uri })
    let validation = await client.validateToken()
    console.log(validation)
    if (!validation.token) next('/login')
    next()
  } catch (error) {
    next('/login')
  }
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/stores',
      name: 'Stores',
      component: Store,
      beforeEnter: tokenGuard
    },
    {
      path: '/inventarios',
      name: 'Inventarios',
      component: Inventory,
      beforeEnter: tokenGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
