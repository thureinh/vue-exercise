import axios from 'axios'
import oauth from 'axios-oauth-client'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
})

export default{
  // index (Exercise)
  getItems(){
    return apiClient.get('/items')
  },

  // detail (Detail)
  getItem(id){
    return apiClient.get('/items/'+id)
  },
  orderItems(items){
    return apiClient.post('/orders', items)
  },
  getOrders(){
    return apiClient.get('/orders')
  },
  getUser(){
    const token = localStorage.getItem('token')
    return axios.get('http://127.0.0.1:8000/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  getClientCredentials(user)
  {
    let data = {
          url: 'http://127.0.0.1:8000/oauth/token/',
          grant_type: 'password',
          client_id: 2,
          client_secret: 'gPA7ldWuFMCexW3H7vg0dGFs0nRPYH5aXWQ4dv5P',
          username: user.name,
          password: user.password,
    }
    return oauth.client(axios.create(), data)
  },
  registerUser(user){
    return apiClient.post('/register', user)
  }
}