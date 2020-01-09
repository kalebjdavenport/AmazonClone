import React, { useState } from 'react'
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Text, Button } from 'react-native'
import { useDispatch } from 'react-redux'

import { LinearGradient } from 'expo-linear-gradient'

import Input from '../../components/Input'
import Colors from '../../../constants/Colors'

import * as AuthActions from '../../redux/actions/auth'

const Auth = ({ navigation }) => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signupMode, setSignupMode] = useState(false)

  const signupHandler = async () => {
    await dispatch(AuthActions.signup(email, password))
  }
  const loginHandler = async () => {
    await dispatch(AuthActions.login(email, password))
    navigation.navigate('Main')
  }

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
      <LinearGradient colors={['#efefef', '#ffedff']}>
        <ScrollView style={styles.view}>

          <Text style={styles.title}>Welcome to Conge, please login.</Text>
          <Input value={email} heading='Email' onChangeText={setEmail} />
          <Input secureTextEntry value={password} heading='Password' onChangeText={setPassword} />
          <View style={styles.row}>
            <Button
              title={signupMode ? 'Switch to login' : 'Switch to signup'}
              color={Colors.secondaryColor}
              onPress={() => {
                setSignupMode(prevState => !prevState)
              }}
            />
            <Button title={signupMode ? 'Signup' : 'Login'} color={Colors.primaryColor} onPress={signupMode ? signupHandler : loginHandler} />
          </View>

        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView >
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    height: '100%',
    padding: 20,
  },
  title: {
    fontFamily: 'Anodina-Light',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingRight: 10,
  }
})

export default Auth
