import Vue from 'vue'
// router
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Testing from '@/views/Testing.vue'
import Exercise from '@/views/Exercise.vue'
import Home from '@/views/HelloWorld.vue'
import Detail from '@/views/Detail.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    { 
      path: '/testing', 
      component: Testing 
    },
    { 
      path: '/exercise', 
      component: Exercise 
    },
    { path: '/item/:id', 
      component: Detail 
    }
  ],
  mode: 'history' // abstract
});

export default router