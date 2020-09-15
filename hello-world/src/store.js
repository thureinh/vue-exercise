import Vue from 'vue'
import Vuex from 'vuex'
import ItemService from '@/services/item_service.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		cart: [],
		token: localStorage.getItem('token') || '',
		authStatus: '',
		user: {}
	},
	mutations: {
		addToCart(state, payload){
			let item = state.cart.find(item => item.item_id === payload.item_id)
			if(item)
				item.qty += Number(payload.qty)
			else
				state.cart.push(payload)
		},
		filterByID(state, payload){
			state.cart = [...state.cart.filter((item) =>{ return item.item_id !== payload})]
		},
		saveCart(state){
			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
		getData(state){
			if(localStorage.getItem('cart')){
				state.cart = JSON.parse(localStorage.getItem('cart'))
			}else{
				state.cart = []
			}
		},
	    authSuccess(state,token){
	      state.authStatus = 'success'
	      localStorage.setItem('token',token)
	      state.token = token
	    },
	    authFail(state){
	      state.authStatus = 'fail'
	    },
	    storeUserData(state,user){
	    	state.user = user
	    },
	    logout(state){
	      localStorage.removeItem('token')
	      state.token = null
	    },
	},
	actions: {
		addToCart({commit}, payload){
			commit('addToCart', payload)
			commit('saveCart')
		},
		getData({commit})
		{
			commit('getData')
		},
		deleteFromCart({commit}, payload)
		{
			commit('filterByID', payload)
			commit('saveCart')
		},
		deleteAll({commit})
		{
			localStorage.removeItem('cart')
			commit('getData')
		},
		login({commit}, user){
			return new Promise((resolve, reject) => {
				ItemService.getClientCredentials(user)()
				.then(token => {
					commit('authSuccess', token.access_token)
					resolve(token.access_token)
				})
				.catch(err => {
                  commit('authFail')
                  localStorage.removeItem('token')
                  reject(err)
              	})
			})	
		},
	    logout({commit}){
	      commit('logout')
	    },
	    getUser(state){
	      return new Promise((resolve, reject) => {
	        ItemService.getUser()
	        .then(res => {
	            state.commit('storeUserData', res.data)
	            resolve(res)
	        })
	        .catch(err => {
	            reject(err)
	        })
	      })
	    },		
	},
	getters: {
		count: state => {
			let count = 0
			if(state.cart.length > 0)
				state.cart.map(value => count += value.qty)
			return count
		},
		isLoggedIn: state => !!state.token,
    	authStatus: state => state.authStatus,
	}
})

export default store