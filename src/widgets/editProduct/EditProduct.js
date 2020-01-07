import React, { useEffect, useCallback, useReducer, useState } from 'react'
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Alert, ActivityIndicator } from 'react-native'


import { useSelector, useDispatch } from 'react-redux'
import * as ProductsActions from '../../redux/actions/products'
import Input from '../../components/Input'

const formReducer = (state, action) => {
  if (action.type === 'FORM_UPDATE') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    }
    const updatedValidities = {
      ...state.validities,
      [action.input]: action.isValid
    }
    let formIsValid = true
    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key]
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid,
    }
  }
  return state
}

const EditProduct = ({ navigation }) => {

  const prodId = navigation.getParam('productId')
  const editedProduct = useSelector(state => state.products.userProducts.find(({ id }) => id === prodId))
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: editedProduct ? editedProduct.price.toString() : '',
      description: editedProduct ? editedProduct.description : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false
  })

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('We cannot understand your input.', ' Please see if you can change the format of your product values.'[{ text: 'Okay' }])
      return
    }
    setIsLoading(true)
    try {
      if (editedProduct) {
        dispatch(ProductsActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl))
        navigation.goBack()
      } else {
        dispatch(ProductsActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price))
        navigation.goBack()
      }
    } catch (err) {

    }

  }, [dispatch, prodId, formState])


  useEffect(() => {
    navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  const formChangeHandler = (inputType, text) => {
    let isValid = false
    if (text.trim().length > 0) {
      isValid = true
    }
    dispatchFormState({ type: 'FORM_UPDATE', value: text, isValid: isValid, input: inputType })
  }

  if (isLoading) {
    return <View><ActivityIndicator size='large' /></View>
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={200}>
      <ScrollView style={styles.screen}>
        <View style={styles.form}>
          <Input value={formState.inputValues.title} onChange={text => formChangeHandler('title', text)} heading='Title' />
          <Input value={formState.inputValues.imageUrl} onChange={text => formChangeHandler('imageUrl', text)} heading='Image URL' />
          <Input value={formState.inputValues.price} onChange={text => formChangeHandler('price', text)} heading='Price' disabled={editedProduct && true} />
          <Input value={formState.inputValues.description} onChange={text => formChangeHandler('description', text)} heading='Description' />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    flex: 1,
    margin: 20,
  },
})

export default EditProduct
