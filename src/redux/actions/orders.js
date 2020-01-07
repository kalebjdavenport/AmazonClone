export const ADD_ORDER = 'ADD_ORDER'

export const addOrder = (cartItem, totalCost) => ({
  type: ADD_ORDER,
  orderData: {
    items: cartItem,
    cost: totalCost,
  }
})
