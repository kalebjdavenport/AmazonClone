import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './CartItem'

import * as cartActions from '../../redux/actions/cart'
import * as orderActions from '../../redux/actions/orders'

const Cart = ({ navigation }) => {

  const totalCost = useSelector(state => state.cart.totalCost)
  const cartItems = useSelector(state => {
    const cartItemsArr = []
    for (const key in state.cart.items) {
      cartItemsArr.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      })
    }
    return cartItemsArr.sort((a, b) => a.productId > b.productId ? 1 : -1)
  })

  const dispatch = useDispatch()

  // Handler Functions
  const onRemove = (id) => { dispatch(cartActions.deleteFromCart(id)) }

  return (
    <View style={styles.screen}>
      <View style={styles.cartOverview}>
        <Text style={styles.subtotal}>Total: <Text>${totalCost.toFixed(2)}</Text></Text>
        <TouchableOpacity
          disabled={cartItems.length === 0}
          style={styles.checkoutBtn}
          onPress={() => dispatch(orderActions.addOrder(cartItems, totalCost))}
        >
          <Text>Continue to Checkout →</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Items in your cart:</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartItem title={item.productTitle} quantity={item.quantity} price={item.productPrice} onRemove={() => onRemove(item.productId)} />}
        keyExtractor={item => item.productId}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  cartOverview: {
    padding: 12,
    borderBottomColor: 'rgba(0, 0, 0, .25)',
    borderBottomWidth: 0.5,
  },
  subtotal: {
    fontSize: 22,
    fontFamily: 'Anodina-Regular'
  },
  checkoutBtn: {
    padding: 7,
    marginVertical: 12,
    borderColor: 'black',
    borderWidth: .5,
    borderRadius: 7,
  },
  heading: {
    margin: 12,
    fontFamily: 'Anodina-Extra',
    fontSize: 18
  }
})

export default Cart
