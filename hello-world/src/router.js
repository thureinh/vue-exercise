import Vue from 'vue'
// router
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Testing from '@/views/Testing.vue'
import Exercise from '@/views/Exercise.vue'
import Home from '@/views/HelloWorld.vue'
import Detail from '@/views/Detail.vue'
import Cart from '@/views/Cart.vue'
import Order from '@/views/Order.vue'

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
      path: '/order',
      component: Order
    }
  ],
  mode: 'history' // abstract
});

export default router