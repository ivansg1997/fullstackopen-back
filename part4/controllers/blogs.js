const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(result => {
        response.json(result);
    })
});

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
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

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
});

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body);

    blog.save()
        .then(saveBlog => {
            response.json(saveBlog)
        })
        .catch(error => next(error))
});

module.exports = blogsRouter