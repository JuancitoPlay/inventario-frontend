import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/components/store'
import Inventory from '@/components/inventory'
import Article from '@/components/article'
import Transaction from '@/components/transaction'
import Login from '@/components/login'
import JournalEntry from '@/components/journal-entry'
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
      path: '/articulos',
      name: 'Articulos',
      component: Article,
      beforeEnter: tokenGuard
    },
    {
      path: '/movimientos',
      name: 'Movimientos',
      component: Transaction,
      beforeEnter: tokenGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/entrada-diario',
      name: 'Entrada Diario',
      component: JournalEntry,
      beforeEnter: tokenGuard
    },
    {
      path: '/logout',
      name: 'Entrada Diario',
      component: JournalEntry,
      beforeEnter: function (to, from, next) {
        localStorage._t = ''
        next('/login')
      }
    }
  ]
})
