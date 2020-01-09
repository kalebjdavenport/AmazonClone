import Order from "../../../models/order"

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => async (dispatch, getState) => {
  const uid = getState().auth.uid
  try {
    const res = await fetch(`https://congo-2a174.firebaseio.com/orders/${uid}.json`)
    const resJson = await res.json()

    const loadedOrders = []

    for (const key in resJson) {
      loadedOrders.push(new Order(key, resJson[key].cartItems, resJson[key].totalCost, new Date(resJson[key].date)))
    }
    dispatch({ type: SET_ORDERS, orders: loadedOrders })
  }
  catch (error) {

  }
}

export const addOrder = (cartItems, totalCost) => async (dispatch, getState) => {
  const date = new Date()
  const auth = getState().auth
  const { uid, token } = auth

  const res = await fetch(`https://congo-2a174.firebaseio.com/orders/${uid}.json?auth=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cartItems,
      totalCost,
      date: date.toISOString(),
    })
  })

  const resJson = await res.json()

  dispatch({
    type: ADD_ORDER,
    orderData: {
      id: resJson.name,
      items: cartItems,
      cost: totalCost,
      date: date,
    }
  })
}
