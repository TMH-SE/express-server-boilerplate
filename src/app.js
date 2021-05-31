require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan') 
const mongoose = require('mongoose')

const config = require('./config')

const appRouter = require('./routes/app.route')
const usersRouter = require('./routes/users.route')

const app = express()

app.use(cors())
app.use(helmet())

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'assets')))

const getMongoUri = (mongoConfig) => {
  const {host, port, username, password, dbName } = mongoConfig
  if (username) {
    return `mongodb://${username}:${password}@${host}:${port}/${dbName}`
  }
  return `mongodb://${host}:${port}/${dbName}`
}

const MONGO_URI = process.env.MONGO_URI || getMongoUri(config.mongo)
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('connected', function(arg) {
  console.log("✅ \x1B[32mConnect mongodb successfully!\x1B[0m✅")
});

/**
 * Define all routers
 */
app.use('/', appRouter)
app.use('/users', usersRouter)

module.exports = app
