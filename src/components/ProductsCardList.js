import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from './ProductCard'

import * as CartActions from '../redux/actions/cart'


const ProductsCardList = ({ navigation }) => {

  const products = useSelector(state => state.products.availableProducts)

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
          onViewDetails={() => {
            navigation.navigate('Details', {
              productId: item.id,
            })
          }}
          onAddToCart={() => dispatch(CartActions.addToCart(item))}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  }
})

export default ProductsCardList
