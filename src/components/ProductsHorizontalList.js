import React from 'react'
import {
  ScrollView,
  StyleSheet,
} from 'react-native'
import { useSelector } from 'react-redux'
import ProductItem from './ProductItem'

const ProductsHorizontalList = ({ navigation }) => {

  const products = useSelector(state => state.products.availableProducts)

  return (
    <ScrollView
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {products.map(product => (
        <ProductItem
          key={product.id}
          title={product.title}
          imageUrl={product.imageUrl}
          price={product.price}
          onViewDetails={() => {
            navigation.navigate('Details', {
              productId: product.id,
            })
          }}
        />)
      )}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})


export default ProductsHorizontalList
