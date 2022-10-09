const app = require('express')()
const cors = require('cors')
const { categories } = require('./data/categories')
const { projects } = require('./data/projects')

const PORT = 3030

const corsOptions = {
  origin: 'http://localhost:8080',
}

app.use(cors(corsOptions))

app.listen(PORT, () => {
  console.log(`API is listening on port ${ PORT }`)
})

app.use('/categories', (req, res) => {
  res.status(200).send(categories)
})

app.use('/projects', (req, res) => {
  res.status(200).send(projects)
})

app.use('/', (req, res) => {
  res.status(200).send({ message: 'ok!' })
})
