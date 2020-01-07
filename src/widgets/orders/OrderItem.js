import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import CartItem from '../cart/CartItem'
import Colors from '../../../constants/Colors'


const OrderItem = ({ totalPrice, purchaseDate, items }) => {

  const [showDetails, setShowDetails] = useState(false)

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalPrice}>{totalPrice.toFixed(2)}</Text>
        {/* <Text style={styles.title}>{title}</Text> */}
        <Text style={styles.purchaseDate}>{purchaseDate}</Text>
      </View>
      <Button color={Colors.primaryColor} title={showDetails ? `Hide Details` : `Show Details`} onPress={() => {
        setShowDetails(prevState => !prevState)
      }} />
      {showDetails && (
        <View>
          {items.map(cartItem => <CartItem key={cartItem.productId} quantity={cartItem.quantity} title={cartItem.productTitle} price={cartItem.sum} />)}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  orderItem: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    position: 'relative'
  },
  summary: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: 'rgba(0, 0, 0, .4)',
    borderBottomWidth: .5,
  },
  totalPrice: {
    fontFamily: 'Anodina-Extra',
    fontSize: 18,
  },
  purchaseDate: {
    fontFamily: 'Anodina-Light',
    fontSize: 18,
  }
})

export default OrderItem
