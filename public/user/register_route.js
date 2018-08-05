const SchemaModel = require('./userschema')

const register_route = (req, res) => { // register with username, password
  // console.log(req.body)
  const username = req.body.username,
    email = req.body.email,
    password = req.body.password,
    newAccount = new SchemaModel({
      username,
      email,
      password
    })

  newAccount.save().then(async (data) => {
    console.log(data)
    return await newAccount.generateAuthToken()
  }).then((token) => {
    res.cookie('authorizationToken', token).status(200).send()
    console.log('account created successfully')
  }).catch((err) => res.status(400).send(err))
}

module.exports = register_route
