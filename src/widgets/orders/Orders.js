import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import OrderItem from './OrderItem'

const Orders = () => {

  const orders = useSelector(state => state.orders.orders)

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
