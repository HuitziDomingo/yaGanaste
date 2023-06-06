import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { Bank } from './src/interfaces/banks.interface'
import { getBanks } from './src/services/bankService'
import { styles } from './src/styles/bannkStyle'

export default function App() {


  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<Bank[]>([])

  const loadData = async () => {
    try {
      let data = await getBanks()
      setData(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    loadData()
  }, []);

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Nuestros Bancos.</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ bankName }) => bankName}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <Text style={styles.letters}>
                {item.bankName}. 
              </Text>
              <Text style={styles.letters}>
                {item.description}. 
              </Text>
              <Text style={styles.letters}>
                Edad: {item.age}
              </Text>
              <Image
                style={styles.image}
                source={{ uri: item.url, }}
              />
            </View>
          )}
        />
      )}
    </View>
  )
}
