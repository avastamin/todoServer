const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  todos: [
    {
      id: "1",
      employee_name: "Tiger Nixon",
      employee_salary: "320800",
      employee_age: "61",
      profile_image: "",
    },
    {
      id: "2",
      employee_name: "Garrett Winters",
      employee_salary: "170750",
      employee_age: "63",
      profile_image: "",
    },
    {
      id: "3",
      employee_name: "Ashton Cox",
      employee_salary: "86000",
      employee_age: "66",
      profile_image: "",
    },
    {
      id: "4",
      employee_name: "Cedric Kelly",
      employee_salary: "433060",
      employee_age: "22",
      profile_image: "",
    },
    {
      id: "5",
      employee_name: "Airi Satou",
      employee_salary: "162700",
      employee_age: "33",
      profile_image: "",
    },
    {
      id: "6",
      employee_name: "Brielle Williamson",
      employee_salary: "372000",
      employee_age: "61",
      profile_image: "",
    },
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
