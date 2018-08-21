const peopleRouter = require('express').Router()
const Person = require('../models/person')

const formatPerson = (person) => {
	return {
		name: person.name,
		number: person.number,
		id: person._id
	}
}


peopleRouter.get('/info', (req, res) => {
	const info = `<p>puhelinluettelossa on henkilön tiedot </p> 
    ${new Date().toJSON()}`

	res.send(info)
})

peopleRouter.get('/', (req, res) => {
	Person
		.find({})
		.then(people => {
			res.json(people.map(formatPerson))
		}).catch(error => {
			console.log(error)
		})
})

peopleRouter.get('/:id', (req, res) => {
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

peopleRouter.post('/', (req, res) => {
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
		number: body.number
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

peopleRouter.delete('/:id', (req, res) => {
	const id = req.params.id
	Person.findById(id).remove()
		.catch(error => {
			console.log(error)
		})
	res.status(204).end()
})


peopleRouter.put('/:id', (req, res) => {
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


module.exports = peopleRouter