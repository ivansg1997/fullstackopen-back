const dummy = () => {
    return 1;
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    const authorCounts = blogs.reduce((counts, blog) => {
        counts[blog.author] = (counts[blog.author] || 0) + 1
        return counts;
    }, {})

    const mostFrequentAuthor = Object.keys(authorCounts).sort((a, b) => authorCounts[b] - authorCounts[a])[0]

    return {
        author: mostFrequentAuthor,
        blogs: authorCounts[mostFrequentAuthor]
    };
};

module.exports = {
    dummy,
    totalLikes,
    mostBlogs
}