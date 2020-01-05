import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'

const ProductItem = ({ title, imageUrl, price, onViewDetails }) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onViewDetails}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.image}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    borderColor: 'black',
    borderBottomWidth: .5,
    marginHorizontal: .5,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(46, 49, 49, .65)'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'Anodina-Extra',
    fontSize: 16,
    paddingBottom: 7,
    color: 'white',
  },
  price: {
    fontFamily: 'Anodina-Bold',
    fontSize: 12,
    color: 'white',
  }
})

export default ProductItem
