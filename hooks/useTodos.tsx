import { TodoType } from '@/app/app.example'
import { collectionId, databaseId, databases } from '@/lib/appwrite'
import { createContext, useContext, useEffect, useState } from 'react'
import { ID, Models, Query } from 'react-native-appwrite'

export interface TodoContextType {
  current: Models.Document[]
  addTodo: (todo: TodoType) => Promise<void | Error>
  removeTodo: (todo: { id: string }) => Promise<void | Error>
  updateTodo: (todo: { _id: string }, updatedTodo: Models.Document) => Promise<void | Error>
  getTodo: (id: string) => Promise<Models.Document | Error>
}

const TodosContext = createContext<TodoContextType>({} as TodoContextType)

export const useTodos = () => useContext(TodosContext)

function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Models.Document[]>([])

  async function addTodo({ title, description, createdAt, isDone }: TodoType): Promise<void | Error> {
    try {
      await databases.createDocument(databaseId, collectionId, ID.unique(), {
        title: title,
        description: description,
        createdAt: createdAt,
        isDone: isDone
      })

      await init()
    } catch (error) {
      return new Error(error as string)
    }
  }

  async function removeTodo({ id }: { id: string }) {
    try {
      await databases.deleteDocument(databaseId, collectionId, id)
      await init()
    } catch (error) {
      return new Error(error as string)
    }
  }

  async function updateTodo({ _id }: { _id: string }, { title, description, isDone }: Models.Document) {
    try {
      await databases.updateDocument(databaseId, collectionId, _id, {
        title: title,
        description: description,
        isDone: isDone
      })
      await init()
    } catch (error) {
      return new Error(error as string)
    }
  }

  async function init() {
    const response = await databases.listDocuments(databaseId, collectionId, [Query.orderDesc('$createdAt'), Query.limit(30)])
    setTodos(response.documents)
  }

  async function getTodo(_id: string) {
    try {
      const response = await databases.getDocument(databaseId, collectionId, _id)
      return response
    } catch (error) {
      return new Error(error as string)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return <TodosContext.Provider value={{ current: todos, addTodo, removeTodo, updateTodo, getTodo }}>{children}</TodosContext.Provider>
}

export default TodosProvider
