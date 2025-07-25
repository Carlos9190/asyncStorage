import { Button, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export default function App() {

  const [name, setName] = useState('')
  const [nameStorage, setNameStorage] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const name = await AsyncStorage.getItem('name') ?? ''
        setNameStorage(name)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('name', name)
      setNameStorage(name)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('name')
      setNameStorage('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      {nameStorage && (
        <Text>Hello: {nameStorage}</Text>
      )}

      <TextInput
        placeholder='Type your name'
        style={styles.input}
        onChangeText={text => setName(text)}
      />

      <Button
        title='Save name'
        color='#333'
        onPress={() => saveData()}
      />

      {nameStorage && (
        <TouchableHighlight
          onPress={() => deleteData()}
          style={styles.deleteBtn}
        >
          <Text style={styles.deleteBtnText}>Delete name &times;</Text>
        </TouchableHighlight>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40
  },
  deleteBtn: {
    backgroundColor: 'red',
    marginTop: 10,
    padding: 10
  },
  deleteBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300
  }
})