import React, { Children } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from './ProductCard'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'

import * as CartActions from '../redux/actions/cart'


const ProductsCardList = ({ navigation }) => {

  const products = useSelector(state => state.products.availableProducts)
  const auth = useSelector(state => state.auth.token)
  console.log(auth)

  const dispatch = useDispatch()

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={products}
      renderItem={({ item }) => (
        <ProductCard
          title={item.title}
          price={item.price}
          imageUrl={item.imageUrl}
          onSelect={() => {
            navigation.navigate('Details', {
              productId: item.id,
            })
          }}
        >
          <TouchableOpacity onPress={() => dispatch(CartActions.addToCart(item))}>
            <MaterialIcons style={styles.btnContainer} name='add-shopping-cart' size={22} color={Colors.secondaryColor} />
          </TouchableOpacity>
        </ProductCard>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  btnContainer: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderColor: Colors.secondaryColor,
    borderWidth: 1.5,
    borderRadius: 8
  }
})

export default ProductsCardList
