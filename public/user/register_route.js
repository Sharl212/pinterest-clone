const SchemaModel = require('./userschema')

const register_route = async (req, res) => { // register with username, password
  console.log(req.body)
  const newAccount = new SchemaModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

await newAccount.save().then((data) => {
  return newAccount.generateAuthToken()
  }).then((token) => {
    res.cookie('authorizationToken', token).status(200).send()
    console.log('account created successfully')
  }).catch((err) => res.status(400).send(err))
}

module.exports = register_route
