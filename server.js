// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
// const session = require('express-session')
const projectCtrl = require('./controllers/projectCtrl')
const userCtrl = require('./controllers/userCtrl')
const taskCtrl = require('./controllers/taskCtrl')
const bodyParser = require('body-parser')
const cors = require('cors')


// // test data
// const seedProject = require('./dummyData/dummyResProject.json')
// const seedTask = require('./dummyData/dummyResTask.json')
// const seedUser = require('./dummyData/dummyResUser.json')
// const Project = require('./models/Project')
// const Task = require('./models/Task')
// const User = require('./models/User')

// -----------------------------------------------------
// Application Object
// -----------------------------------------------------
const app = express()
const { PORT = 3013 } = process.env
const MongoStore = require('connect-mongo')

// -----------------------------------------------------
// Middleware
// -----------------------------------------------------
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cors())
app.use(express.json())
// app.use(
//   session({
//     secret: process.env.SECRET,
//     store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
//     saveUninitialized: true,
//     resave: false
//     // username: req.session.username,
//   })
// )

// app.use(session({ secret: 'izzy-2024', resave: false, saveUninitialized: true }));

// -----------------------------------------------------
// Routes INDUCESS
// -----------------------------------------------------
app.use('/projects/tasks', taskCtrl)
app.use('/projects', projectCtrl)
app.use('/user', userCtrl)

// test seed routes
// app.get('/projects/seed', async (req, res) => {
//   try {
//     const dummyData = seedProject
//     await Project.deleteMany({})
//     const projects = await Project.create(dummyData)
//     res.json(projects)
//   } catch (error) {
//     console.log(error.message)
//     res.send('there was an error yo')
//   }
// })

// app.get('/users/seed', async (req, res) => {
//   try {
//     const dummyData = seedUser
//     await User.deleteMany({})
//     const users = await User.create(dummyData)
//     res.json(users)
//   } catch (error) {
//     console.log(error.message)
//     res.send('there was an error yo')
//   }
// })

// app.get('/projects/tasks/seed', async (req, res) => {
//   try {
//     const dummyData = seedTask
//     await Task.deleteMany({})
//     const tasks = await Task.create(dummyData)
//     res.json(tasks)
//   } catch (error) {
//     console.log(error.message)
//     res.send('there was an error yo')
//   }
// })

// app.get('/projects', async (req, res) => {
//   try {
//     res.json(await Project.find({}))
//   } catch (err) {
//     res.status(400).json(err)
//   }
// })

// app.get('/projects/:id', async (req, res) => {
//   try {
//     res.json(await Task.find({ projectId: req.params.id }))
//   } catch (err) {
//     res.status(400).json(err)
//   }
// })

// -----------------------------------------------------
// GET requests
// -----------------------------------------------------
app.get(
  '/',
  (req, res) => {
    // const username = req.session.username
    // if (req.session.loggedIn) {
    // res.redirect('/projects')
    // } else {
    res.send('not logged in, but ok')
    // res.render('landing.ejs', { username })
  }
  // }
)

// -----------------------------------------------------
// Listener
// -----------------------------------------------------
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`)
})