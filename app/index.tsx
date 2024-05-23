import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { config } from './app.config'
import { CardType } from './app.example'
import { useState } from 'react'

import { cards as sampleData } from './app.example'
import Card from '@/components/Card/Card'
import { Link } from 'expo-router'
import { useTodos } from '@/contexts/TodoContext'

function Home() {
  const todos = useTodos()

  return (
    <SafeAreaView>
      <View>
        <Text className="text-white text-3xl text-center px-2">{config.appName}</Text>
      </View>
      <View>
        <Text className="text-white text-lg px-2">List todos:</Text>

        <FlatList
          data={todos.current}
          renderItem={({ item }) => <Text className="text-white">{item.$id}</Text>}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          className="px-2 w-[100%]"
        />
      </View>
    </SafeAreaView>
  )
}

export default Home
