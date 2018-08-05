const {md, JWT_CONFIG} = require('./global_modules'),
  access = JWT_CONFIG.JWT_SECRET, // private key
  salt = JWT_CONFIG.JWT_SALT

const UserSchema = new md.mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 12,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 12,
    required: true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject()

  return _.pick(userObject, ['_id', 'username', 'email','password'])
}

UserSchema.methods.generateAuthToken = function () {
  let token = md.jwt.sign({ _id: this._id.toHexString(), access}, salt).toString()

  this.tokens.push({ access, token})
  return this.save().then(() => token)
}

UserSchema.statics.findByToken = function (token) {
  let decoded

  try {
    decoded = md.jwt.verify(token, salt); // verify that the token exist.
  } catch (e) {
    return Promise.reject()
  }

  return this.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': access
  })
}

UserSchema.statics.findByCredentials = function (username, password) {}

UserSchema.pre('save', function (next) {
  let user = this

  md.bcrypt.hash(user.password, 10, function (err, hash) {  // hashes the plain text password 
    if (err) return console.log(err)

    user.password = hash // replace the plain text password with its hash
    next() // continue the saving proccess
  })
})

let SchemaModel = md.mongoose.model('Users', UserSchema)

module.exports = SchemaModel
