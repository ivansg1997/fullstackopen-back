const infoRouter = require('express').Router();
const Blog = require('../models/blog');

infoRouter.get('/', (request, response) => {
    const date = new Date().toUTCString();

    Blog.countDocuments({})
        .then(count => {
            const info = `
                <div>
                    <p>Blogs registry has info for ${count} blogs</p>
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

module.exports = infoRouter;