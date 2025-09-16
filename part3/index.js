const express = require('express')
const morgan = require('morgan');
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

const date = new Date;
const info = `
        <div>
            <p>Phonebook has info ${persons.length} people</p>
            <p>${date.toUTCString()}</p>
        </div>
    `

const generateId = () => {
    return Math.floor(Math.random() * 100000)
}

app.use(morgan('tiny'));
app.use(express.static('dist'))

/* app.get('/', (request, response) => {
    response.send('<h1>Alo policia!</h1>')
}) */

app.get('/info', (request, response) => {
    response.send(info)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.statusMessage = "Not found person";
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const nameExist = persons.find(person => person.name === body.name); 

    if (!body.name) {
        return response.status(400).json({ 
        error: 'name missing' 
        })
    }else if(!body.number) {
        return response.status(400).json({ 
        error: 'phone number missing' 
        })
    }else if(nameExist) {
        return response.status(409).json({ 
        error: 'user already exists' 
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})