type CardType = {
  created: string
  todos: TodoType[]
}

type TodoType = {
  _id: string
  title: string
  description: string
  isDone: boolean
  createdAt: string
}

const cards = [{ created: '22/5/2024', todos: [{ _id: '', title: 'hi', description: '', createdAt: '', isDone: false }] }]

export { cards }
export { CardType, TodoType }
