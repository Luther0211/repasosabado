//mongoose nos esta ayudando a crear el modelo
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PLM = require('passport-local-mongoose')

const userSchema = new Schema({
  username:String,
  email: String,
  photoURL: String,
  notita: [{
    type: Schema.Types.ObjectId,
    ref: 'Notita'
  }]
},{
  timestamps: {
    createdAt:'created_at',
    updatedAt:'updated_at'
  },
  //esto es opcional (el _uv de la base de datos)
  versionKey:false
})

module.exports = mongoose.model('User', userSchema.plugin(PLM, {usernameField: 'email'}))