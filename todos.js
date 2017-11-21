const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  todos: [
    {
      id: 'b1yyu6gb',
      text: 'Some todo here 1',
    },
    {
      id: 'b1yyu3gb',
      text: 'Some todo here 2',
    },
    {
      id: 'b1yyu6fb',
      text: 'Some todo here 3',
    }
  ]
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const add = (token, todo) => {
  if (!todo.id) {
    todo.id = Math.random().toString(36).substr(-8)
  }

  get(token).todos.push(todo)

  return todo
}

const remove = (token, id) => {
  const data = get(token)
  const todo = data.todos.find(c => c.id === id)

  if (todo) {
    data.todos = data.todos.filter(c => c !== todo)
  }

  return { todo }
}

module.exports = {
  get,
  add,
  remove
}
