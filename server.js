const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const todos = require('./todos')

const app = express()

app.use(express.static('public'))
app.use(cors())

app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the Todos API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /todos
    DELETE /todos/:id
    POST /todos { text }
  </pre>
  `

  res.send(help)
})

app.use((req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
    })
  }
})

app.get('/todos', (req, res) => {
  res.send(todos.get(req.token))
})

app.delete('/todos/:id', (req, res) => {
  res.send(todos.remove(req.token, req.params.id))
})

app.post('/todos', bodyParser.json(), (req, res) => {
  const { text } = req.body
console.log(req);
  if (text) {
    res.send(todos.add(req.token, req.body))
  } else {
    res.status(403).send({
      error: 'Please provide text for todo'
    })
  }
})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
