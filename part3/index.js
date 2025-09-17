require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/note');

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('dist'))

app.get('/info', (request, response) => {
    const date = new Date().toUTCString();

    Person.countDocuments({})
        .then(count => {
            const info = `
                <div>
                    <p>Phonebook has info for ${count} people</p>
                    <p>${date}</p>
                </div>
            `;
            response.send(info);
        })
        .catch(error => {
            response.statusMessage = 'Error obtaining count: ', error;
            response.status(500).end();
        });
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result);
    })
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person);
        } else {
            response.statusMessage = "Not found person";
            response.status(404).end();
        }
    })
    .catch(error => next(error))
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
});

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
        error: 'name missing' 
        })
    }else if(!body.number) {
        return response.status(400).json({ 
        error: 'phone number missing' 
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(savePerson => {
        response.json(savePerson)
    })
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } 

    next(error)
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});