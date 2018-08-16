const mongoose = require('mongoose')

const url = 'mongodb://<uname>:<pw>@ds119802.mlab.com:19802/puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String,

})

module.exports = Person
