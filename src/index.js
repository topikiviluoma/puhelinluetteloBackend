const express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    const info = `<p>puhelinluettelossa on ${people.length} henkilön tiedot </p> 
    ${new Date().toJSON()}`
    
    res.send(info)
})

app.get('/api/people', (req, res) => {
    res.json(people)
})

app.get('/api/people/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = people.find(person => person.id === id)
    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.post('/api/people', (req, res) => {
    const body = req.body
    if (body.name === undefined) {
        return res.status(400).json({error: 'name is missing'})
    }

    if (body.number === undefined) {
        return res.status(400).json({error: 'number is missing'})
    }

    if (people.find(person => person.name === body.name) !== undefined) {
        return res.status(400).json({error: 'name must be unique'})
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    console.log(person)
    people = people.concat(person)
    res.json(person)
})

app.delete('/api/people/:id', (req, res) => {
    const id = Number(req.params.id)
    people = people.filter(person => person.id != id)
    res.status(204).end()
})


const generateId = () => {
    return Math.floor((Math.random() * 999) + 1)
}

const generateNumber = () => {
}


const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port}`)

let people = [
    {
        "name": "Arto Hellas",
        "number": "123123123",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    },
    {
        "name": "Test",
        "number": "040-123456",
        "id": 5
    }
]