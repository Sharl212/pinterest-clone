const SchemaModel = require('./userschema'),


login_route = (req, res) => {
    const email = req.body.email,
        password = req.body.password

    SchemaModel.findByCredentials(email, password).then((user)=> {
        console.log(user)
        return res.status(200).send()
    }).catch((err) => {
        res.status(401).send(err)
    })
}

module.exports = login_route