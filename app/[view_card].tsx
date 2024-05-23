import { useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TodoContextType, useTodos } from '@/contexts/TodoContext'

function ViewCard() {
  const todos = useTodos()
  const { created } = useLocalSearchParams()
  return (
    <SafeAreaView>
      <Text className="text-white justify-center items-center text-3xl">{}</Text>
    </SafeAreaView>
  )
}
export default ViewCard
