const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const peopleRouter = require('./controllers/people')

console.log(process.env.MONGODB_URI)

mongoose
	.connect(process.env.MONGODB_URI)
	.then( () => {
		console.log('connected to database', process.env.MONGODB_URI)
	})
	.catch( err => {
		console.log(err)
	})

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))
app.use('/api/people', peopleRouter)


const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port}`)
