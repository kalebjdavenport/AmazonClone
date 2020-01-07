import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../../constants/Colors'

const CartItem = ({ title, quantity, price, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.title}>{title} </Text>
        <Text style={styles.quantity}>{`(${quantity})`}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.price}>${price}</Text>
        {onRemove && <TouchableOpacity onPress={onRemove} style={styles.deletBtn}>
          <Ionicons name="ios-trash" size={23} color={Colors.errorBackground} />
        </TouchableOpacity>}


      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  title: {
    color: Colors.primaryColor,
    fontSize: 18,
    fontFamily: 'Anodina-Extra',
  },
  quantity: {
    color: Colors.primaryColor,
    fontSize: 18,
    fontFamily: 'Anodina-Light',
  },
  price: {
    fontSize: 20,
    fontFamily: 'Anodina-Bold',
  },
  deletBtn: {
    marginLeft: 15,
  },
})

export default CartItem
