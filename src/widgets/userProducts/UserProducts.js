import React from 'react'
import { FlatList, View, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import * as ProductActions from '../../redux/actions/products'

import ProductCard from '../../components/ProductCard'
import { EvilIcons } from '@expo/vector-icons'
import Colors from '../../../constants/Colors'

const UserProducts = ({ navigation }) => {

  const userProducts = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch()

  const selectItemHandler = (actionType, id) => {
    switch (actionType) {
      case 'delete':
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
          { text: 'No', style: 'default' },
          {
            text: 'Yes', style: 'destructive', onPress: () => {
              dispatch(ProductActions.deleteProduct(id))
            }
          }
        ])
        break
      case 'edit':
        navigation.navigate('Edit', {
          productId: id,
        })
        break
    }
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={userProducts}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyExtractor={item => item.id}
        style={styles.listContainer}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            onSelect={() => selectItemHandler('edit', item.id)}
          >
            <View style={styles.btnRow}>
              <TouchableOpacity onPress={() => selectItemHandler('delete', item.id)}>
                <EvilIcons style={styles.btnContainer} name='trash' size={32} color={Colors.errorBackground} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectItemHandler('edit', item.id)}>
                <EvilIcons style={styles.btnContainer} name='pencil' size={33} color={Colors.secondaryColor} />
              </TouchableOpacity>
            </View>
          </ProductCard>)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
    backgroundColor: Colors.offWhite,
    paddingBottom: 100,
  },
  btnRow: {
    flexDirection: 'row',
  },
  btnContainer: {
    marginLeft: 10,
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    overflow: 'hidden'
  }
})

export default UserProducts
