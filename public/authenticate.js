const {JWT_CONFIG} = require('./user/global_modules'),
      {JwtStrategy, passport} = require('./modules'),
      SchemaModel = require('./user/userschema')

const FindByEmail = (jwt_payload, done) => {
    console.log(jwt_payload)

    SchemaModel.findById
    try {
      db.query(sql_query, (err, res) => {
        const results = res.recordset

        if (err || results.length < 1) return done(err, false)
        return done(null, results[0].ID)
      })
    } catch (err) {return done(err, false) }
  },

  cookieExtractor = (req) => req.cookies['jWtToken']

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