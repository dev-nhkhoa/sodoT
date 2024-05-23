import { TodoType } from '@/app/app.example'
import { collectionId, databaseId, databases } from '@/lib/appwrite'
import { createContext, useContext, useEffect, useState } from 'react'
import { ID, Models, Query } from 'react-native-appwrite'

export interface TodoContextType {
  current: Models.Document[]
  addTodo: (todo: TodoType) => Promise<Models.Document | Error>
  removeTodo: (todo: { id: string }) => Promise<{} | Error>
  updateTodo: (todo: { _id: string }, updatedTodo: TodoType) => Promise<Models.Document | Error>
  // Define the properties and methods of the TodoContext
}

const TodosContext = createContext<TodoContextType>({} as TodoContextType)

export const useTodos = () => useContext(TodosContext)

function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Models.Document[]>([])

  async function addTodo({ title, description, createdAt, isDone }: TodoType): Promise<Models.Document | Error> {
    try {
      const response = await databases.createDocument(databaseId, collectionId, ID.unique(), {
        title: title,
        description: description,
        createdAt: createdAt,
        isDone: isDone
      })

      return response
    } catch (error) {
      return new Error(error as string)
    }
  }

  async function removeTodo({ id }: { id: string }) {
    try {
      const response = await databases.deleteDocument(databaseId, collectionId, id)

      return response
    } catch (error) {
      return new Error(error as string)
    }
  }

  async function updateTodo({ _id }: { _id: string }, { title, createdAt, description, isDone }: TodoType) {
    try {
      const response = await databases.updateDocument(databaseId, collectionId, _id, {
        title: title,
        description: description,
        isDone: isDone,
        createdAt: createdAt
      })

      return response
    } catch (error) {
      return new Error(error as string)
    }
  }

  async function init() {
    const response = await databases.listDocuments(databaseId, collectionId, [Query.orderDesc('$createdAt'), Query.limit(10)])
    setTodos(response.documents)
  }

  useEffect(() => {
    init()
  }, [])

  return <TodosContext.Provider value={{ current: todos, addTodo, removeTodo, updateTodo }}>{children}</TodosContext.Provider>
}

export default TodosProvider
