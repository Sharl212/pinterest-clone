module.exports =
  global.modules = {
    md: {
      mongoose: require('mongoose'),
      express: require('express'),
      jwt: require('jsonwebtoken'),
      _: require('lodash'),
      bcrypt: require('bcrypt')
    },
    JWT_CONFIG: {
      JWT_SECRET: 'access',
      JWT_SALT: 'secret'
    }
}
