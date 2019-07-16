
class Author {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Book {
    constructor(name, genre, authorId) {
        this.name = name;
        this.genre = genre;
        this.authorId = authorId;
    }
}

class Frame {
    constructor(name, rating) {
        this.name = name;
        this.rating = rating;
    }
}


module.exports = {
    Author,
    Book,
    Frame
};
