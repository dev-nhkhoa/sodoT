import { CardType } from '@/app/app.example'
import { FlatList, Text, View } from 'react-native'
import TodoCard from './TodoCard/TodoCard'

type Props = {
  data: CardType
  style?: Object | undefined
}

function Card({ data: { created, todos }, style }: Props) {
  return (
    <View className={`w-[150px] h-[250px] bg-slate-200 rounded-md`}>
      <Text className="text-black font-bold text-center">{created}</Text>
      <FlatList data={todos} renderItem={({ item }) => <TodoCard todo={item} />} contentContainerStyle={{ display: 'flex', gap: 2, paddingHorizontal: 2, paddingVertical: 5 }} />
      <View>
        <Text className="px-1">Xóa</Text>
      </View>
    </View>
  )
}

export default Card
