const Blog = require('../models/blog');

const initialBlogs = [
    {
        title: "Alo policia",
        author: "Iván Sánchez",
        url: "http://localhost:3001/",
        likes: 15
    },
    {
        title: "Alo policia 5",
        author: "Iván Sánchez 2",
        url: "http://localhost:3002/",
        likes: 3
    },
]

const nonExistingId = async () => {
  const blog = new Blog({
        title: "willremovethissoon",
        author: "Iván Sánchez 3",
        url: "http://localhost:3003/",
        likes: 9
    })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}