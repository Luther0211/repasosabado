const passport = require('passport')
const User = require('../models/User')

//serialize & deserialize
passport.use(User.createStrategy())

//SERIALIZE USER
passport.serializeUser((user,cb) => {
  cb(null, user)
})

//DESERIALIZE USER
passport.deserializeUser((user,cb) => {
  cb(null, user)
})

//exportar
module.exports = passport