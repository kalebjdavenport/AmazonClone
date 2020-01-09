import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'

import { useDispatch } from 'react-redux'
import * as AuthActions from '../../redux/actions/auth'

const StartupScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    const tryLogin = async () => {
      let userData = await AsyncStorage.getItem('userData')
      if (!userData) {
        navigation.navigate('Auth')
        return
      }
      userData = JSON.parse(userData)
      const { token, uid, expiration } = userData

      if (new Date(expiration) <= new Date() || !token || !uid) {
        navigation.navigate('Auth')
        return
      }

      navigation.navigate('Main')
      dispatch(AuthActions.authenticate(uid, token))
    }
    tryLogin()
  }, [])

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primaryColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default StartupScreen
