import { TodoType } from '@/app/app.example'
import { Text, View } from 'react-native'

type Props = {
  todo: TodoType
}

function TodoCard({ todo: { title, isDone } }: Props) {
  return (
    <View className={`p-2 ${isDone ? 'bg-gray-600' : 'bg-gray-600'} rounded-xl`}>
      <Text className={`${isDone ? 'text-green-400 line-through' : 'text-white'}`}>{title == '' ? 'Trống' : title}</Text>
    </View>
  )
}

export default TodoCard
