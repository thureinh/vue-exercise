import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
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
  }
}