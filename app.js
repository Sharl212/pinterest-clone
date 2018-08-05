const express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  env = process.env,
  app = express(),
  {passport, JwtStrategy} = require('./public/modules'),
  {JWT_OPTIONS, FindByEmail, authenticate} = require('./public/authenticate')

global.App = {
  app,
  port: '3000',
  root: path.join(__dirname, 'public'),
  env,
  appPath: function (path) {
    return this.root + '/' + path
  },
  require: function (path) {
    return require(this.appPath(path))
  },
  start: function () {
    if (!this.started) {
      this.started = true
      this.app.listen(this.port)
      console.log(`App is running on port ${this.port}..`)
    }
  }
}

global.database = { // connect to database
  mongoose: require('mongoose'),
  database_credentials: {
    username: 'admin',
    password: 'admin123'
  },
  database_callback: function (err, db) {
    if (err) console.log(err)
    console.log('Connected to MongoDB..')
  },
  start: function () {
    // database is hosted on MLab
    this.mongoose.connect(`mongodb://${this.database_credentials.username}:${this.database_credentials.password}@ds020168.mlab.com:20168/pinterest-clone`, this.database_callback)
  }
}

const register_route = App.require('/user/register_route'),
  login_route = App.require('/user/login_route')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
passport.use(new JwtStrategy(JWT_OPTIONS, async (jwt_payload, done) => FindByEmail(jwt_payload, done)));

// auth routes
app.post('/register', register_route)
app.post('/login', login_route)

app.get('/auth', authenticate, (req,res)=>{
  res.status(200).send('authorized')
})

App.start() // starts the server
database.start() // connect to the MongoDB database

module.exports = app
