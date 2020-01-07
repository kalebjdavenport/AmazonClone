import { ADD_TO_CART, DELETE_FROM_CART } from "../actions/cart"
import { ADD_ORDER } from '../actions/orders'
import CartItem from '../../../models/cart-item'
import Cart from "../../widgets/cart/Cart"
import { DELETE_PRODUCT } from "../actions/products"

const initialState = {
  items: {},
  totalCost: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product
      const prodPrice = addedProduct.price
      const prodTitle = addedProduct.title

      let newOrUpdatedCartItem

      if (!state.items[addedProduct.id]) {
        newOrUpdatedCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
      } else {
        newOrUpdatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        )
      }
      return {
        items: { ...state.items, [addedProduct.id]: newOrUpdatedCartItem },
        totalCost: state.totalCost + prodPrice
      }
    case DELETE_FROM_CART:
      const selectedCartItem = state.items[action.id]
      const currQty = selectedCartItem.quantity
      if (currQty > 1) {
        const updatedItem = new CartItem(currQty - 1, selectedCartItem.productPrice, selectedCartItem.productTitle, selectedCartItem.sum - selectedCartItem.prodPrice)
        return {
          items: { ...state.items, [action.id]: updatedItem },
          totalCost: state.totalCost - selectedCartItem.productPrice,
        }
      } else {
        const updatedItems = { ...state.items }
        delete updatedItems[action.id]
        return {
          items: updatedItems,
          totalCost: state.totalCost - selectedCartItem.productPrice
        }
      }
    case ADD_ORDER:
      return initialState
    case DELETE_PRODUCT:
      if (!state.items[action.id]) {
        return state
      }
      const updatedItems = { ...state.items }
      delete updatedItems[action.id]
      const itemTotal = state.items[action.id].sum
      return {
        ...state,
        items: updatedItems,
        totalCost: state.totalCost - itemTotal
      }
    default:
      return state
  }
}
