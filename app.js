require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport     = require('./helpers/passport');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);



// conexion a base de datos
mongoose.connect(process.env.DB, {useNewUrlParser: true})
  .then(x => { console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => { console.error('Error connecting to mongo', err)});

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);



//express y todos los middlewares que utiliza
const app = express();
//primero se declara  app y luego los middlewares
//TODO LO QUE VAYA A PONER; PONLO ABAJO DE ESTA LINEA/////////////////////////
app.use(session({
  secret:'s3cr3t',
  resave: true,
  saveUninitialized: true
}))

// decirle a TODA nuestra app que utilize passport
app.use(passport.initialize());
app.use(passport.session());


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
//el view engine va a ser hbs (//)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');//
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Repaso';





//mandar allamar a auth.js
const auth = require('./routes/auth');
const index = require('./routes/index');
const notita = require('./routes/notita')
app.use('/', index);
app.use('/', auth);
app.use('/', notita);




module.exports = app;
