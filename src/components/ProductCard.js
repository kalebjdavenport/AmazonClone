import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'

const ProductCard = ({ title, price, imageUrl, onViewDetails, onAddToCart }) => {
  return (
    <TouchableOpacity activeOpacity={.75} style={styles.card} onPress={onViewDetails}>
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>

        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>

        <View style={styles.row}>
          <View style={styles.info}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity onPress={onAddToCart}>
            <MaterialIcons style={styles.cartContainer} name='add-shopping-cart' size={22} color={Colors.secondaryColor} />
          </TouchableOpacity>

        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 14,
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
    height: 230,
    position: 'relative'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: 'hidden',
    height: '75%',

  },
  image: {
    flex: 1,
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    resizeMode: "cover",
    alignSelf: "flex-end"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 5,
    padding: 12,
  },

  title: {
    fontFamily: 'Anodina-Extra',
    fontSize: 16,
    paddingBottom: 2,
    color: Colors.secondaryColor,
  },
  price: {
    fontFamily: 'Anodina-Bold',
    fontSize: 14,
    color: Colors.primaryColor,
  },
  cartContainer: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderColor: Colors.secondaryColor,
    borderWidth: 1.5,
    borderRadius: 8
  }
})

export default ProductCard
