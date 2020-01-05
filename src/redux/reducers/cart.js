import { ADD_TO_CART } from "../actions/cart"
import CartItem from '../../../models/cart-item'

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
  }
  return state
}
