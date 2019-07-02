require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const favicon = require('serve-favicon')
const logger = require('morgan')
const path = require('path')
const cors = require('cors')
const session = require('express-session')

const MongoStore = require('connect-mongo')(session)
const mongoose = require('./config/mongoose.config')

const passport = require('passport')

require('./config/passport.config')

// Stripe ---------------------------------------------------------------------
// const { Swig } = require('swig');
// const swig = new Swig();
// app.engine('html', swig.renderFile);
// app.set('view engine', 'html');
// Stripe ---------------------------------------------------------------------



const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


const app = express();


// configuracion middleware CORS
// const whitelist = [`${process.env.URLLOCAL}:${process.env.PORT}`]
const whitelist = ['http://localhost:5000']
const corsOptions = {
  origin: (origin, cb) => {
    const originIsWhitelisted = whitelist.includes(origin);
    cb(null, originIsWhitelisted)
  },
  credentials: true
}
app.use(cors(corsOptions))


// configuracion middleware SESSION
app.use(session({
  secret: "Vamoairno",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());




// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



// const index = require('./routes/index');
// app.use('/', index);

const authRoutes = require('./routes/auth.routes');
app.use('/api', authRoutes);

const ownerRoutes = require('./routes/owner.routes');
app.use('/api', ownerRoutes);

// Middleware subida de archivos Cloudinary
const fileRoutes = require('./routes/file-upload.routes')
app.use('/api', fileRoutes);

// Payment
const payRoutes = require('./routes/payment.routes')
app.use('/api', payRoutes)

// Printer 
const printer = require('./routes/printer.routes')
app.use('/api', printer)


app.use((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


module.exports = app;
