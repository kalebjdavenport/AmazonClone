import React from 'react'
import { ScrollView, Image, Button, View, Text, StyleSheet, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'

import * as CartActions from '../redux/actions/cart'

const ProductDetails = ({ navigation }) => {

  const productId = navigation.getParam('productId')
  const selectedProduct = useSelector(state => state.products.availableProducts.find(({ id }) => id === productId))
  const { title, price, imageUrl, description } = selectedProduct

  const dispatch = useDispatch()

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.row, styles.productInfo]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
          </View>
          <Button color={Colors.primaryColor} title='add to cart' onPress={() => {
            dispatch(CartActions.addToCart(selectedProduct))
          }} />
        </View>

        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  productInfo: {
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'baseline'
  },
  image: {
    height: Dimensions.get('window').height / 3,
    margin: 1,
  },
  title: {
    fontFamily: 'Anodina-Extra',
    fontSize: 28,
    marginRight: 12,
    color: Colors.secondaryColor,
  },
  price: {
    fontFamily: 'Anodina-Bold',
    fontSize: 20,
    color: Colors.secondaryColor,
  },
  description: {
    fontFamily: 'Anodina-Light',
    fontSize: 16,
    padding: 5,
  }
})

export default ProductDetails
