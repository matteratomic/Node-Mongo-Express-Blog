const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const cloudinary = require('cloudinary')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const app = express()
const expressHbs = require('express-handlebars')
const apiRouter = require('./routes/api/index')
const viewRoutes = require('./routes/views/index')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('morgan')
require('dotenv').config()

const helpers = require('./views/helpers/index')
const port = parseInt(process.env.PORT, 10) || 3000
const mongoURL = process.env.MONGO_URL

//setup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// setup view engine
app.engine('html', expressHbs({
  defaultLayout: 'layout',
  extname: 'html',
  partials:'partials',
  helpers
}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

//setup mongoDB 
mongoose.Promise = global.Promise
mongoose.connect(mongoURL,{useNewUrlParser:true})
const db = mongoose.connection
db.once('open',() =>{
  console.log('CONNECTED TO DATABASE')
})
db.on('error',(err) => console.log('COULD NOT CONNECT TO DATABASE',err))

// setup middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
  secret:'process.env.COOKIE_SECRET',
  resave:true,
  saveUninitialized:false,
  store: new MongoStore({mongooseConnection:db})
}))
app.use(flash())
app.use(cors())
app.use(helmet())
app.use(logger('dev'))
app.use('/api', apiRouter)
app.use('/', viewRoutes)
app.listen(port, () => console.log(`Listening on port ${port}`))

process.on('uncaughtException',(err)=>{
  console.log(err.message)
})
