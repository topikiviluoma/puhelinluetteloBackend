const express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

const Person = require('./models/person')

const formatPerson = (person) => {
	return {
		name: person.name,
		number: person.number,
		id: person._id
	}
}

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
	const info = `<p>puhelinluettelossa on ${people.length} henkilön tiedot </p> 
    ${new Date().toJSON()}`

	res.send(info)
})

app.get('/api/people', (req, res) => {
	Person
		.find({})
		.then(people => {
			res.json(people.map(formatPerson))
		}).catch(error => {
			console.log(error)
		})
})

app.get('/api/people/:id', (req, res) => {
	const id = Number(req.params.id)
	const person =
		Person
			.findById(req.params.id)
			.then(p => {
				res.json(formatPerson(p))
			}).catch(error => {
				console.log(error)
			})
})

app.post('/api/people', (req, res) => {
	const body = req.body
	if (body.name === undefined) {
		return res.status(400).json({ error: 'name is missing' })
	}

	if (body.number === undefined) {
		return res.status(400).json({ error: 'number is missing' })
	}

	if (people.find(person => person.name === body.name) !== undefined) {
		return res.status(400).json({ error: 'name must be unique' })
	}

	const person = new Person({
		name: body.name,
		number: body.number,
		id: generateId()
	})
	console.log(person)
	person
		.save()
		.then(savedPerson => {
			res.json(formatPerson(savedPerson))
		}).catch(error => {
			console.log(error)
		})
})

app.delete('/api/people/:id', (req, res) => {
	const id = req.params.id
	Person.findById(id).remove()
		.catch(error => {
			console.log(error)
		})
	res.status(204).end()
})


app.put('/api/people/:id', (req, res) => {
	const person = {
		name: req.body.name,
		number: req.body.number
	}
	const id = req.params.id
	Person.findByIdAndUpdate(id, person, { new: true })
		.then(updatedPerson => {
			res.json(formatPerson(updatedPerson))
		})
		.catch(error => {
			console.log(error)
			res.status(400).send({ error: 'malformed id' })
		})

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