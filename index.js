const http = require('http')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/people', (req, res) => {
    res.json(people)
})

app.get('/people/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = people.find(person => person.id === id)
    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})


const port = 3001
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
    }
]