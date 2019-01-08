# Source
- [ExpressJS Crash Course](https://www.youtube.com/watch?v=gnsO8-xJ8rs)

## What is Express?

- ExpressJS is a minimalistic, open source web framework for Node.js.
    - Used to build powerful web applications and APIs;
    - Most popular framework for Node.js;
    - Uses MVC concepts


## What You'll learn

- Express Installation & Setup
- Middleware
- Routing
- Template Engines -- EJS, Handlebars, Jade
- Forms & Input
- Models, ORM & Databases -- MongoDB(Mongoose, Mongojs, ...)
- Express Generator


## Installing Exptess
- Requirements: `Node.js`, `NPM`
> npm init
> npm install express body-parser --save
> node index.js

- Created test.html in /public
> visit: localhost:3000, localhost:3000/test.html

- View Engines: `EJS`, `PUG`, `Jade`

- Prepared MongoDB:
> show dbs
> use wm
> db.createCollection('students')
> show collections
> db.students.insert([{"id":1,"name":"Tom","age":24,"isMale":true},{"id":2,"name":"Jack","age":20,"isMale":true},{"id":3,"name":"Nicole","age":22,"isMale":false}])
> db.students.find()