//necesitamos router (que es de express)
const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport')
const uploadCloud = require('../helpers/cloudinary')

const isLogged = (req,res,next) => {
  if(req.isAuthenticated()) next()
  else res.redirect('/login')
}

//get trae algo//obtiene la direccion
//en el get por el momento solo vamos a hacer los render
router.get('/signup', (req,res) => {
  configuration = {
    title: 'Sign Up',
    btnValue: "crear cuenta",
    url: '/signup',
    password: true,
    id: ""
  }
  res.render('auth/signup', configuration)
})



router.post('/signup',(req,res,next) => {
  //el body es lo de tu hbs y el .password es el name="" que le pusiste
  User.register(req.body, req.body.password)
  .then(user => {
    res.redirect('/login')
  })
  .catch(e => console.log(e))
})

router.get('/login', (req,res) => {
  if(req.user)req.logOut()
  res.render('auth/login')
})


router.post('/login', passport.authenticate('local'), (req,res,next) => {
  req.app.locals.loggedUser = req.user;
  res.redirect('/profile')
})

router.get('/profile', isLogged, (req,res) => {
 User.findById(req.app.locals.loggedUser._id).populate('notitas')
.then(usuario => {
  console.log(usuario)
  res.render('profile', usuario) // lo que le tengo que pasar aqui, es un objeto.
  })
  .catch(error => console.log(error))
})


router.get('/edit/:id',  isLogged,(req,res) => {
  configuration = {
    title: 'Edit Profile',
    btnValue: 'Save changes',
    url: '/edit',
    username: req.app.locals.loggedUser.username,
    email: req.app.locals.loggedUser.email,
    password: false,
    id: req.user._id
  }
  res.render('auth/signup', configuration)
})

router.post("/edit/:id", (req,res,next) => {
  let {id} = req.params
  User.findByIdAndUpdate(id, req.body,{new: true})
  .then(user => {
    req.app.locals.loggedUser = user
    res.redirect('/profile')
  })
  .catch(e => next(e))
})

router.get('/edit_image', isLogged, (req,res) => {
  res.render('edit_image')
})

router.post('/edit_image', isLogged, uploadCloud.single('photoURL'), (req,res,next) => {
  User.findByIdAndUpdate(req.app.locals.loggedUser._id, {photoURL: req.file.url}, {new: true})
  .then(user => {
    req.app.locals.loggedUser = user
    console.log(user)
    res.redirect('/profile')
  })
})





module.exports = router