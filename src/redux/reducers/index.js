import { combineReducers } from 'redux'
import products from './products'
import cart from './cart'
import orders from './orders'
import auth from './auth'

export default combineReducers({
  products,
  cart,
  orders,
  auth,
})
