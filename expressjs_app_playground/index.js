const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')   // core module in Node.js
var expressValidator = require('express-validator')
var mongojs = require('mongojs')
const mongoose = require('mongoose')
let StudentsModel = require('./models/students')


/**
 * Initial App
 */
const app = express()
const port = 3000

var ObjectId = mongojs.ObjectId

// Monojs: Simple usage for a local db
// var db = mongojs('wm', ['students'])

mongoose.connect('mongodb://localhost/wm')
let db_mongoose = mongoose.connection

// Mongoose: Check connection
db_mongoose.once('open', () => {
    console.log('Connected to MonogDB with Mongoose...')
})

// Mongoose: Check error
db_mongoose.on('error', (err) => {
    console.log(err)
})

/**
 * 1. Middlewares are basically functions that have access to req, res objects and also access to the next piece of middleware that's going to fire after it.
 * 2. Most modules have own middleware that needs to be set up.
 * 3. The order of middleware is important(in this example, it will be invalid if it was created and used aftering route handler -- app.get('/'))
 * 4. The middleware runs every time the application is reloaded.
 */


/**
 * Load View Engine
 */
app.set('views', path.join(__dirname, 'views'))   // Created views folder
// app.set('view engine', 'ejs')
app.set('view engine', 'pug')

// Creating custom middleware
var logger = function(req, res, next) {
    console.log('Logging...')
    next()
}

// Using middleware
// app.use(logger);

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Set Static Path(creating public folder)
app.use(express.static(path.join(__dirname, 'public')))

// Global Vars
app.use(function(req, res, next) {
    res.locals.myErrors = null
    next()
})

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        root = namespace.shift()
        formParam = root

        while(namespace.length) {
            formParam = '[' + namespace.shift() + ']'
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}))

var tom = {
    id: 1,
    name: "Tom",
    age: 24,
    isMale: true
}

var students = [
    tom,
    {
        id: 2,
        name: 'Jack',
        age: 20,
        isMale: true
    },
    {
        id: 3,
        name: 'Nicole',
        age: 22,
        isMale: false
    }
]

/**
 * Home Route
 */
app.get('/', (req, res) => {
    res.send('Hello World!')
    // res.json(tom);
    // res.json(students);
})

app.get('/index', (req, res) => {
    res.send('Hello World!')
    // res.json(tom);
    // res.json(students);
})

app.get('/pug', (req, res) => {
    StudentsModel.find({}, (err, students) => {
        if(err) {
            console.log(err)
        } else {
            res.render('pug/index', {
                pugMsg: 'PUG',
                pugStudents: students
            })
        }
    })
})


app.post('/pug_students/add', (req, res) => {
    let student = new StudentsModel()
    student.id = req.body.id
    student.name = req.body.name
    student.age = req.body.age
    student.isMale = req.body.isMale

    student.save((err) => {
        if(err) {
            console.log(err)
            return;
        } else {
            res.redirect('/pug')
        }
    })
})



/*
app.get('/db_students', function(req, res) {
    // res.render('index')
    db.students.find(function(err, docs) {
        // console.log(docs)
        res.render('ejs/index', {
            greeting: 'Hi',
            // users: 
            users: docs
        })
    })
})

app.post('/users/add', function(req, res) {
    // console.log(req.body.name)
    req.checkBody('id', 'ID is required!').notEmpty()
    req.checkBody('name', 'Name is required!').notEmpty()
    req.checkBody('age', 'Age is required!').notEmpty()
    req.checkBody('isMale', 'Gender is required!').notEmpty()

    var validationErrors = req.validationErrors()

    if(validationErrors) {
        console.log('---------ERRORS---------')
        db.students.find(function(err, docs) {
            // console.log(docs)
            res.render('index', {
                greeting: 'Hi',
                users: docs,
                myErrors: validationErrors   // Be sure to add myErrors(key) as a global variable
            })
        })
    } else {
        var newStudent = {
            id: req.body.id,
            name: req.body.name,
            age: req.body.age,
            isMale: req.body.isMale
        }
        // console.log(newStudent)
        db.students.insert(newStudent, function(err, result) {
            if(err) {
                console.log(err)
            }
            res.redirect('/db_students')
        })
    }
})

app.delete('/users/delete/:id', function(req, res) {
    console.log(req.params.id)
    db.students.remove({
        _id: ObjectId(req.params.id)
    }, function (err, result) {
        if(err) {
            console.log(err)
        }
        res.redirect('/db_students')
    })
})
*/

/**
 * Start Server
 */
app.listen(port, () => console.log(`Express app listening on port ${port}...`))

// console.log("Hello Wenming!")