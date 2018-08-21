const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    number: String,

})

module.exports = Person
