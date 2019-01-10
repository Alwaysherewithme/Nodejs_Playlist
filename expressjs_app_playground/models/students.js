let mongoose = require('mongoose')

// Students Schema
let studentsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    isMale: {
        type: Boolean,
        required: true
    }
})

let StudentsModel = module.exports = mongoose.model('Students', studentsSchema)