const SchemaModel = require('./user/userschema')
module.exports = {
  GithubStrategyCallback: function (accessToken, refreshToken, profile, cb) {
      console.log(profile)
    SchemaModel.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user)
    })
  }
}
