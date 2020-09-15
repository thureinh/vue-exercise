import Vue from 'vue'
// router
import VueRouter from 'vue-router'
import store from './store.js'

Vue.use(VueRouter)

import Testing from '@/views/Testing.vue'
import Exercise from '@/views/Exercise.vue'
import Home from '@/views/HelloWorld.vue'
import Detail from '@/views/Detail.vue'
import Cart from '@/views/Cart.vue'
import Order from '@/views/Order.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    { 
      name: 'testing',
      path: '/testing', 
      component: Testing 
    },
    { 
      name: 'exercise',
      path: '/exercise', 
      component: Exercise 
    },
    { 
      name: 'item-detail',
      path: '/item/:id', 
      component: Detail 
    },
    {
      name: 'cart',
      path: '/cart',
      component: Cart
    },
    {
      name: 'order',
      path: '/orders',
      component: Order,
      meta:{
        requiresAuth: true
      }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    }
  ],
  mode: 'history' // abstract
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  }else{
    next()
  }
})
export default router