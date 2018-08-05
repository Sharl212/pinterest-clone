const {JWT_CONFIG} = require('./user/global_modules'),
      {JwtStrategy, passport} = require('./modules'),
      SchemaModel = require('./user/userschema')

const FindByEmail = (jwt_payload, done) => {
    const ID = jwt_payload._id

    SchemaModel.findById(ID, (error, result)=>{
      if(error) return done(error, false)
      done(null, result.email)
    })
  },

  cookieExtractor = (req) => req.cookies['authorizationToken']

JWT_OPTIONS = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_CONFIG.JWT_SALT
}

module.exports = {
  authenticate: passport.authenticate('jwt', { session: false }),
  JWT_OPTIONS,
  JwtStrategy,
  FindByEmail
}