import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

import * as ProductActions from '../redux/actions/products'

import ProductsHorizontalList from '../components/ProductsHorizontalList'
import ProductsCardList from '../components/ProductsCardList'
import Colors from '../../constants/Colors';

export default function HomeScreen({ navigation }) {

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    setIsLoading(true)
    dispatch(ProductActions.fetchProducts()).then(() => setIsLoading(false))
  }, [dispatch])

  if (isLoading) {
    return <View style={styles.center}>
      <ActivityIndicator size='large' color={Colors.primaryColor} />
    </View>
  }

  return (

    <View style={styles.container}>

      <View style={{ paddingHorizontal: .5, height: 200 }}>
        <ProductsHorizontalList navigation={navigation} />
      </View>

      {/* <ProductsCardList navigation={navigation} /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }

});
