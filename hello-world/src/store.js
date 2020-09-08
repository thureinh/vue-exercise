import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		cart: []
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
		}
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
		}
	},
	getters: {
		count: state => {
			let count = 0
			if(state.cart.length > 0)
				state.cart.map(value => count += value.qty)
			return count
		}
	}
})

export default store