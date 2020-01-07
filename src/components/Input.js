import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

const Input = ({ value, disabled, onChange, heading }) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{heading}</Text>
      <TextInput editable={!disabled} style={!disabled ? styles.input : styles.disabledInput} value={value} onChangeText={onChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontFamily: 'Anodina-Bold',
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    padding: 8,
    fontSize: 18,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    backgroundColor: Colors.offWhite,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.tabIconDefault
  },
  disabledInput: {
    padding: 8,
    fontSize: 18,
    borderRadius: 4,
    backgroundColor: Colors.tabIconDefault,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.tabIconDefault
  }
})

export default Input
