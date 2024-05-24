import { Alert, FlatList, Modal, Pressable, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { config } from './app.config'
import { useState } from 'react'
import { useTodos } from '@/hooks/useTodos'
import { Models } from 'react-native-appwrite'

function Home() {
  const [todo, setTodo] = useState<string>('')
  const { current, addTodo, updateTodo, removeTodo } = useTodos()

  const [visibleEdit, setVisibleEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<Models.Document>({} as Models.Document)

  return (
    <SafeAreaView>
      <View className="justify-start items-center w-fit h-full">
        <Text className="text-black text-3xl text-center px-2">{config.appName}</Text>
        <View className="w-full">
          <Text className="text-left text-xl font-bold">List todos:</Text>
          <View className="max-h-[76%] h-full">
            <Modal visible={visibleEdit} transparent animationType="fade">
              <View className="w-full h-full justify-center items-center">
                <View className="bg-black bg-opacity-50 w-[300px] h-[350px] rounded-lg p-2 justify-between">
                  <Text className="text-white text-center text-xl">Edit Todo</Text>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-white">Nội dung:</Text>
                    <TextInput
                      value={editTodo.title}
                      className="text-white w-full"
                      onChangeText={(text) =>
                        setEditTodo((oldTodo) => {
                          return { ...oldTodo, title: text }
                        })
                      }
                    />
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Text className="text-white">Mô tả:</Text>
                    <TextInput
                      value={editTodo.description}
                      className="text-white"
                      onChangeText={(text) =>
                        setEditTodo((oldTodo) => {
                          return { ...oldTodo, description: text }
                        })
                      }
                    />
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Text className="text-white">Đã hoàn thành?:</Text>
                    <Switch
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                      thumbColor={editTodo.isDone ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() =>
                        setEditTodo((oldTodo) => {
                          return { ...oldTodo, isDone: !oldTodo.isDone }
                        })
                      }
                      value={editTodo.isDone}
                    />
                  </View>
                  <View className="gap-1">
                    <Text className="text-right pr-2 text-white">Tạo ngày: {editTodo.createdAt}</Text>
                    <Pressable
                      className="bg-white p-1 rounded-md"
                      onPress={async () => {
                        await updateTodo({ _id: editTodo.$id }, editTodo)
                        Alert.alert('Cập nhật thành công!')
                        setVisibleEdit(false)
                        setEditTodo({} as Models.Document)
                      }}
                    >
                      <Text className="text-black text-center">Lưu</Text>
                    </Pressable>
                    <Pressable className="bg-white p-1 rounded-md" onPress={() => setVisibleEdit(false)}>
                      <Text className="text-black text-center">Đóng chỉnh sửa</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
            <FlatList
              data={current}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setVisibleEdit(true)
                    setEditTodo(item)
                  }}
                >
                  <View key={item.$id} className={`${item.isDone ? 'bg-[#8FBC8F]' : 'bg-[#345e37]'} w-[250px] rounded-xl p-2 flex flex-row justify-between`}>
                    <Text className={`${item.isDone ? 'text-[#1E1E1E] line-through italic' : 'text-[#FFFFFF]'}  whitespace-pre-line`}>{item.title}</Text>

                    <TouchableOpacity
                      onPress={async () => {
                        await removeTodo({ id: item.$id })
                        Alert.alert('Xóa thành công!')
                      }}
                    >
                      <Text className={`${item.isDone ? 'text-[#ffecda]' : 'text-[#FF4D4D]'} font-bold`}>Xóa</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ gap: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
          {/* <View className="w-full justify-center items-center gap-1 max-h-[20%]">
            {current.map((a) => (
              
            ))}
          </View> */}
        </View>
        <View className="w-[200px] flex-col gap-2 absolute bottom-0 -translate-x-1/2 pb-2">
          <View>
            <TextInput className="border-solid border-[2px] border-black" placeholder="Nhập todos..." onChangeText={(text) => setTodo(text)} />
          </View>
          <TouchableOpacity className="bg-black p-2 rounded-xl" onPress={async () => await addTodo({ title: todo, description: '', createdAt: new Date().toString(), isDone: false })}>
            <Text className="text-white text-center">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home
