/*
exports.msg = msg
exports.info = info
exports.showInfo = showInfo


var msg = "Hello"
var info = "Your life is pending..."

var showInfo = () => {
    console.log(info)
}
*/

/**
 * Person.js
 */
function Person(name, gender, age) {
    this.name = name
    this.gender = gender
    this.age = age
}


// Person.prototype.sayHello = function() {}
Person.prototype = {
    sayHello: function() {
        console.log(`Hi, my name is ${this.name}, and I'm ${this.age}.`)
    }
}

// Person被视为构造函数，可以用new来实例化
module.exports = Person
// exports.Person = Person   // Wrong

/**
 * test.js
 */
var Person = require('./Person.js')
var Jack = new Person('Jack', 'male', 20)
Jack.sayHello()


/**
 * MyHttpServer.js
 */
var http = require('http')
var router = require('./router.js')

var myHttpServer = http.createServer((req, res) => {
    if(req.ulr == '/') router.showIndex(req, res)
    else if(req.url.substr(0, 9) == '/student/') router.showStudent(req, res)
    else router.show404(req, res)
})

myHttpServer.listen(80, '127.0.0.1')

/**
 * router.js
 */
exports.showIndex = showIndex
exports.showStudent = showStudent
exports.show404 = show404

var showIndex = (req, res) => {
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'})
    res.end('Index page...')
}

var showStudent = (req, res) => {
    var id = req.url.substr(9, 6)
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'})
    res.end('Student page...' + id)
}

var showIndex = (req, res) => {
    res.writeHead(404, {'Content-Type':'text/html;charset=utf8'})
    res.end('404 Not Found...')
}