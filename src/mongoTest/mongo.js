const mongoose = require('mongoose')

const url = 'mongodb://<uname>:<pw>@ds119802.mlab.com:19802/puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String,

})

const person = new Person({
    name: 'Testi Testinen',
    number: '040-123123'
})

person.save().then(response => {
    console.log('person saved')
    mongoose.connection.close()
})