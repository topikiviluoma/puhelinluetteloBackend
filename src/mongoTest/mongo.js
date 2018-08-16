const mongoose = require('mongoose')

const url = 'mongodb://<uname>:<pw>@ds119802.mlab.com:19802/puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String,

})

console.log(process.argv[2], process.argv[3])

let newName = process.argv[2]
let newNumber = process.argv[3]

if (newName !== undefined && newNumber !== undefined) {
    const person = new Person({
        name: newName,
        number: newNumber
    })
    console.log('lisätään henkilö', person.name, 'numero', person.number, 'puhelinluetteloon')
    person.save().then(response => {
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('puhelinluettelo:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}


const saveNew = (person) => {
    person.save.then(response => {
    console.log('person saved')
    mongoose.connection.close()
    })
}

/*const person = new Person({
    name: 'Testi Testinen',
    number: '040-123123'
})*/

/*person.save().then(response => {
    console.log('person saved')
    mongoose.connection.close()
})*/

