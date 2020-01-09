import React, { useEffect } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import * as OrdersActions from '../../redux/actions/orders'

import OrderItem from './OrderItem'

const Orders = () => {

  const orders = useSelector(state => state.orders.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(OrdersActions.fetchOrders())
  }, [])

  return (
    <View style={styles.container}>
      {orders.length === 0 ? <Text style={styles.heading}>No Orders</Text> : (
        <View style={styles.container}>
          <Text style={styles.heading}>Orders</Text>
          <FlatList
            data={orders}
            renderItem={({ item }) => <OrderItem items={item.items} totalPrice={item.cost} purchaseDate={item.readableDate} />}
          />
        </View>
      )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: 23,
    marginTop: 15,
    fontFamily: 'Anodina-Bold'
  }
})

export default Orders
